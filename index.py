from flask import Flask, request, jsonify
import googlemaps
from app.pathfinding import find_pub_crawl
import os

app = Flask(__name__)

@app.route('/find_pub_crawl', methods=['POST'])
def generate_pub_crawl():
    """
    Flask endpoint to find a pub crawl route based on the provided coordinates, length, and use_current_loc flag.
    Expected JSON body: { "coordinates": [lat, lng], "length": number_of_stops, "use_current_loc": true/false }
      - coordinates: latitude and longitude of starting position (for when current location is not being used)
      - length: number of stops on crawl, positive integer
      - use_current_loc: boolean describing whether or not to use current location. if set to false, coordinates
      of starting position must be specified.
    
    Returns:
     - A JSON object in the form:
        {
            "number_of_stops": n,
            "route": [
                [
                    "start",
                    lat,
                    lng
                ],
                [
                    "destination_1",
                    lat,
                    lng
                ],
                ...
                [
                    "destination_n",
                    lat,
                    lng
                ]
            ],
            "start_location": [lat, lng]
            "use_current_loc": true/false
        }
    """
    # Initialise client based off API key in environment variables
    api_key = os.environ.get('GOOGLE_MAPS_API_KEY')
    print(api_key)

    gmaps = googlemaps.Client(key=api_key)
    
    data = request.json

    # Extract data from the request
    coordinates = (data.get('coordinates')[0], data.get('coordinates')[1])
    length = data.get('length')
    use_current_loc = data.get('use_current_loc', False)  # Default to False if not provided
    
    if not use_current_loc and not data.get('coordinates'):
        raise ValueError("coordinates must be specified if not using current location.")

    if not coordinates or not length:
        return jsonify({"error": "Coordinates and length are required"}), 400

    # Logic to find the pub crawl using the provided client and parameters
    # Replace this with actual implementation of pub crawl finding logic
    # Here we just use placeholders for demonstration purposes
    pub_crawl_result = {
        "start_location": coordinates,
        "number_of_stops": length,
        "use_current_loc": use_current_loc,
        "route": find_pub_crawl(gmaps, coordinates, length, use_current_loc)
    }
    
    return jsonify(pub_crawl_result)

if __name__ == '__main__':
    app.run(debug=True)