import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import MapView,{ Callout, Polyline } from 'react-native-maps';
import { Marker } from "react-native-maps";
import { StyleSheet, View,Text, TouchableOpacity } from 'react-native';
import {decode} from "@mapbox/polyline"; //please install this package before running!
import * as Location from 'expo-location';

import Navbar from "./components/Navbar"; // Ensure this path is correct
import { mapStyle } from './components/MapStyle';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'

//works, give the route given the start and end location
const getDirections = async (startLoc: string, destinationLoc: string) => {
    try {
        const KEY = "AIzaSyAUWNMB5SpuGaA_PdfIW4VSbWxsUWvYCiI" //put your API key here.
        //otherwise, you'll have an 'unauthorized' error.
        let resp = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
        );
        let respJson = await resp.json();
        let points = decode(respJson.routes[0].overview_polyline.points);
        // console.log(points);
        let coords = points.map((point, index) => {
            return {
                latitude: point[0],
                longitude: point[1]
            };
        });
        return coords;
    } catch (error) {
        return error;
    }
};
export default function App() {
    const [coordsList, setCoordsList] = useState([]);  // Define coordsList state
    const [markers, setMarkers] = useState([]);  // Define markers state

    const router = useRouter();

    //both are to set up the initial location
    const initialLocation = {latitude: 33.8915, longitude: 151.2767, latitudeDelta:0.01, longitudeDelta:0.01};
    const [region, setRegion] = useState(initialLocation);
    const [userRegion, setUserRegion] = useState(initialLocation);

    /** might not be useful because we can get the location from the google autocomplete */
    useEffect(() => {
        _getLocation();
    }, []);


    const _getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setRegion(prevLocation => ({
                ...prevLocation, // Keep the existing altitude and speed
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }));

            setUserRegion(prevLocation => ({
                ...prevLocation, // Keep the existing altitude and speed
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }));
        } catch (err) {
            console.warn(err);
        }
    };
    /**__________________________________________________________________ */


    const handleStartCrawl = (noStops) => {
        console.log("Starting crawl -", noStops);

        //search for the path given the starting location
        var routeCoordinates=[];
        const fetchPubCrawlRoute = async () => {
            try {
                const response = await fetch('https://crawl-nine.vercel.app/find_pub_crawl', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        coordinates: [region.latitude, region.longitude],
                        length: parseInt(noStops, 10),
                        use_current_loc: false,
                    }),
                });

                const data = await response.json();

                routeCoordinates = data.route[0].map((loc, index) => ({
                  latitude: loc[1],
                  longitude: loc[2],
                  name: `${index + 1}. ${loc[0]}`, // This will prefix the name with the index + 1
              }));

                setCoordsList(routeCoordinates);
                console.log("All Coords: ", routeCoordinates)
                setMarkers(routeCoordinates);
                console.log("Coords", coordsList);
                console.log("Markers", markers);
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        };

        fetchPubCrawlRoute();

        //get the routes between the locations
         const fetchAllDirections = async () => {
          const allCoords = [];
			  const allMarkers = [];
             for (let i = 0; i < routeCoordinates.length - 1; i++) {
                 const startLoc = routeCoordinates[i];
                 const destinationLoc = routeCoordinates[i + 1];
                 const directions = await getDirections(
                     `${startLoc.latitude},${startLoc.longitude}`,
                     `${destinationLoc.latitude},${destinationLoc.longitude}`
                 );
                 allCoords.push(directions);
				         allMarkers.push(startLoc);
               //setCoordsList(allCoords);
                // setMarkers(allMarkers);
                 console.log("Markers Festches: ", markers)
                 console.log("Coords Directions: ", directions)
             }
             console.log("All Coords: ", allCoords)

             setCoordsList(allCoords);
                setMarkers(allMarkers);

         };

         fetchAllDirections();
    };

    const [numberInput, setNumberInput] = useState("0");

    useEffect(() => console.log("Use Effect Markers", markers), [markers]);

    //show the map
    return (
        <View style={{ flex: 1 }}>
            <MapView style={StyleSheet.absoluteFill} customMapStyle={mapStyle} region={{latitude: region.latitude,longitude:region.longitude,latitudeDelta:0.01,longitudeDelta:0.01}}>

                {coordsList.map((coords, index) => {
                    // Ensure you only create a Polyline if there's a next coordinate to connect to
                    if (index < coordsList.length - 1) {
                        const segment = [coords, coordsList[index + 1]]; // Create a segment from this point to the next point
                        return (
                            <Polyline
                                key={`polyline-${index}`}
                                coordinates={segment} // Pass the segment (two points) as coordinates
                                strokeColor="#40370E"
                                strokeWidth={4}
                            />
                        );
                    }
                    return null; // No polyline for the last point
                })}

                {markers.map((marker, index) => (
                    <Marker
                        key={`marker-${index}`}
                        coordinate={marker}
                        pinColor={'#F6C25B'}


                    >
                      <Callout>
                <View>
                    <Text>{marker.name}</Text>
                </View>
            </Callout>
                    </Marker>
                ))}
                <Marker
                    key={`marker-user`}
                    coordinate={userRegion}
                    pinColor="green"
                />

            </MapView>
                <TouchableOpacity style={styles.profileIconContainer} onPress={() => router.push('/settings')}>
                    <FontAwesomeIcon icon={faGear} size={20}/>
                </TouchableOpacity>

                <Navbar onPress={handleStartCrawl}/>
            </View>
    );
}
// need to put it on firebasestorage but no idea
const styles = StyleSheet.create({
    profileIconContainer: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 12,
        borderRadius: 25,
        backgroundColor: "rgba(246,194,91,1)",
    },

    numberSelectContainer: {
        position: 'absolute',
        top: 70,
        right: 15,
        width: 40,
        height: 40,
        padding: 12,
        borderRadius: 25,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
    },
    profileIcon: {
        width: 45,
        height: 45,
        borderRadius: 25, // Makes the icon circular
        borderWidth: 2,
        borderColor: '#fff', // Optional: add a border for better visibility
    },
});
