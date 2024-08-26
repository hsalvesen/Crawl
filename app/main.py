import googlemaps
from dotenv import load_dotenv
import os 
from pathfinding import find_pub_crawl
    
def main():
    gmaps = googlemaps.Client(key=api_key)
    
    length = int(input("How many stops? "))

    crawl, cost = find_pub_crawl(gmaps, (-33.8590594976628, 151.20814845161303), length, False)
    
    for i, pub in enumerate(crawl):
        print(f"Stop {i}: {pub[0]}")
    print(f"with total walk time {cost:.02f} mins :D")

if __name__ == "__main__":
    # Initialise client based off API key in environment variables
    load_dotenv()
    api_key = os.getenv('GOOGLE_MAPS_API_KEY')
    main()   