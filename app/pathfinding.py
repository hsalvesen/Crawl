import heapq
from app.geolocation import geolocate
from app.maps import get_nearby
from app.distances import get_duration_matrix
import random

def find_pub_crawl(client, coordinates, length, use_current_loc):
    """
    Given a Google Maps client and a set of coordinates to start from, 
    find a pub crawl of a certain length.
      - client: Google Maps client initialised with key
      - coordinates: a tuple of the latitude and longitude of the starting point
      - length: the number of stops in the pub crawl
    Returns: #TODO
    """

    # find user's location (for now)
    # TODO get coordinates from front end
    if use_current_loc:
        client_geolocation = geolocate(client)
        current_coord = (client_geolocation['location']['lat'], client_geolocation['location']['lng']) #TODO delete me later
    else:
        current_coord = coordinates
    
    # find top bars nearby
    pubs = get_nearby(client, current_coord, 'pub bar')
    
    destinations = {place.get('name'): (place['geometry']['location']['lat'], place['geometry']['location']['lng']) for place in pubs[:9]}
        
    # find distances between places.
    distances = get_duration_matrix(client, {'start': current_coord} | destinations)
    
    # Run A* to compute result.
    return a_star([{'name': 'start', 'geometry': {'location': {'lat': current_coord[0], 'lng': current_coord[1]}}}] + pubs[:9], distances, length)
    

def a_star(places, dist_matrix, num_stops):
    """
    Runs the A* algorithm on the set places, using distances from dist_matrix. Searches
    for a path of length num_stops however does not specify an end destination. Note
    the assumption is made that the indices of the places list corresponds to the row 
    and column indices of dist_matrix.
        - places: a list of place dictionaries, with at least name, location and rating
        - dist_matrix: a matrix of distances between the places in the list
        - num_stops: an integer representing the number of stops intended in the crawl.
    """
    # Compute maximums to normalise weightings
    max_distance = max(max(row) for row in dist_matrix if row)
    max_rating = max((adjust_rating(place.get('rating'), place.get('user_ratings_total')) for place in places if place.get('rating') is not None), default=1)

    start = 0  # Start from the first pub (index 0)
    queue = []
    heapq.heappush(queue, (0, start, [start], 0))  # (cost, current_pub, path)

    while queue:
        total_cost, current_pub, path, tot_distance = heapq.heappop(queue)

        # Check if the path contains the required number of stops. If so, stop.
        if len(path) == num_stops + 1:
            pubs = [(places[i]['name'], places[i]['geometry']['location']['lat'], places[i]['geometry']['location']['lng']) for i in path]
            return pubs, tot_distance

        for next_pub in range(len(places)):
            if next_pub not in path:
                distance = dist_matrix[current_pub][next_pub]
                normalised_distance = distance / max_distance
                
                rating = adjust_rating(places[next_pub]['rating'], places[next_pub]['user_ratings_total'])
                normalised_rating = (1) if not rating else 1 - (rating / max_rating)  # Lower rating gives higher heuristic cost
                
                cost = 0.3 * normalised_distance + 0.6 * normalised_rating  + 0.1 * random.uniform(0, 1)# rating is heuristic
                heapq.heappush(queue, (total_cost + cost, next_pub, path + [next_pub], tot_distance + distance))

    return None, None


def adjust_rating(rating, num_reviews, review_threshold=500):
    """
    Adjusts the rating based on the number of reviews to penalize high ratings with low review counts.
    
    :param rating: Original rating of the place.
    :param num_reviews: Number of reviews the place has received.
    :param review_threshold: The threshold number of reviews considered reliable.
    :return: Adjusted rating after penalisation.
    """
    if num_reviews >= review_threshold:
        return rating  # No adjustment for reliable number of reviews

    # Calculate the penalisation factor: more penalisation for fewer reviews
    penalisation_factor = (review_threshold - num_reviews) / review_threshold
    
    adjusted_rating = rating * (1 - penalisation_factor * 0.4) 

    return adjusted_rating
