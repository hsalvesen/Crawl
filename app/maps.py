# Define the location (latitude, longitude) and the search parameters
def get_nearby(gmaps, coordinates, place_type):
    """
    Gets the nearby 'place's based on the given coordinates.
      - coordinates: a tuple of float coordinates
      - place_type: a relevant search term for what the user wishes to do.
    """
    radius = 2000  # Radius in meters # TODO: Should this always be constant or be configurable?
    
    # Perform the Places API nearby search request
    places_result = gmaps.places_nearby(location=coordinates, keyword=place_type, rank_by='distance')

    # Extract the results
    # TODO: Make me asynchronous
    return places_result.get('results', [])
    

