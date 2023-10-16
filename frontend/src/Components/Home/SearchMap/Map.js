import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Link } from "react-router-dom";
import { IoLocation } from 'react-icons/io5'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Flex, Image, Box } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ResetCenterView = (props) => {
    const { coordinates } = props;
    const map = useMap();

    useEffect(() => {
        if (coordinates) {
            map.setView(
                [coordinates.lat, coordinates.lon], // Updated to a simpler format
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    }, [coordinates]);

    return null;
}

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(true); // State variable to control popup visibility

    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker
            position={position}
            icon={L.icon({ iconUrl: "./locicon.png", iconSize: [30, 30] })}>

            {isPopupOpen && (
                <Popup onClose={() => setIsPopupOpen(false)}>
                    You are here
                </Popup>
            )}
        </Marker>
    );
};

const position = [22.2994, 73.2081];

const Map = (props) => {
    var user = localStorage.getItem("user");
    const user_id = JSON.parse(user)._id;

    const { coordinates, database, selectedProperty } = props;
    // console.log(selectedProperty);

    const locationSelection = [coordinates?.lat, coordinates?.lon];

    const [markerPosition, setMarkerPosition] = useState([]);

    useEffect(() => {
        async function showAddresses() {
            const updatedAddresses = await Promise.all(
                database.map(async (data) => {

                    // Combine address components
                    const addressQuery = `${data.pincode}`;
                    // const addressQuery = `${data.City}, ${data.State}, ${data.pincode}`;

                    // Fetch latitude and longitude from Nominatim
                    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${addressQuery}`;
                    try {
                        const response = await fetch(url);
                        const responseJson = await response.json();

                        if (responseJson.length > 0) {
                            const result = responseJson[0];
                            const lat = parseFloat(result.lat);
                            const lon = parseFloat(result.lon);

                            return {
                                ...data,
                                lat,
                                lon
                            };
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    return data; // Return the original data if no location found
                })
            );
            // console.log(updatedAddresses);

            // Filter out addresses with valid lat and lon
            const validAddresses = updatedAddresses.filter(data => data.lat !== undefined && data.lon !== undefined);
            // console.log(validAddresses);

            // Update markerPosition state with valid address data
            setMarkerPosition(validAddresses);
        }

        // Call the showAddresses function to fetch and update latitudes and longitudes
        showAddresses();
    }, [database]);

    useEffect(() => {
        if (selectedProperty) {
            // Use the openPopup method on the marker associated with the selectedProperty
            const marker = markerPosition.find(data => data._id === selectedProperty._id);
            if (marker) {
                // Check if the marker exists and open its popup
                marker.ref.openPopup();
            }
        }
    }, [selectedProperty, markerPosition]);

    return (

        <Box className='h-screen w-2/3 z-50 mt-20 relative align'>
            <MapContainer
                className='h-screen w-full absolute mt-2'
                center={position}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=6kQkQ15IbxafcFwxYT4W"
                />

                {coordinates && (
                    <Marker
                        position={locationSelection}
                        icon={
                            L.icon({
                                iconUrl: "./locicon.png",
                                iconSize: [25, 25]
                            })
                        }
                    >
                        <Popup>
                            Your Searched Location
                        </Popup>
                    </Marker>
                )}

                {markerPosition
                    ? markerPosition.map((data, index) => {
                        const keyId = `${data._id}`;

                        let markerIconUrl = '';
                        if (data.propertyFor === "Rent") {
                            markerIconUrl = "./Black.png";
                        } else if (data.propertyFor === "Sell") {
                            markerIconUrl = "./Yellow.png";
                        } else if (data.propertyFor === "PG") {
                            markerIconUrl = "./Blue.png";
                        }

                        return (
                            <Marker
                                key={index}
                                position={[data.lat, data.lon]}
                                icon={
                                    L.icon({
                                        iconUrl: markerIconUrl,
                                        iconSize: [25, 25]
                                    })
                                }
                                ref={(ref) => (data.ref = ref)}
                            >
                                <Popup>
                                    {selectedProperty
                                        && selectedProperty._id === data._id && (
                                            <>
                                                <Flex
                                                    width={"330px"}
                                                    height={'180px'}
                                                    direction={'column'}
                                                    position="relative"
                                                    mt={5}
                                                >
                                                    {/* Carousel */}
                                                    <Carousel
                                                        autoPlay={true}
                                                        interval={4000}
                                                        infiniteLoop={true}
                                                        width={'305px'}
                                                        height={'180px'}
                                                        rounded='lg'
                                                        showArrows={true}
                                                        showThumbs={false}>
                                                        {data.image &&
                                                            data.image.map((imageName, index) => (
                                                                <Flex
                                                                    objectFit={'cover'}
                                                                    key={index}>
                                                                    <Image
                                                                        width={'305px'}
                                                                        height={'180px'}
                                                                        rounded='10px'
                                                                        mt={1}
                                                                        src={require(`../../../Images/${imageName}`)}
                                                                        alt={`Image ${index}`} />
                                                                </Flex>
                                                            ))}
                                                    </Carousel>
                                                </Flex>
                                                <Link
                                                    to="/sellPropInfo"
                                                    onClick={() => localStorage.setItem("pressCard", keyId)}
                                                    key={data._id}
                                                >
                                                    <button
                                                        value={data._id}
                                                        disabled
                                                        className='mt-2'
                                                    >
                                                        {data.likes &&
                                                            data.likes.some((objectId) => objectId === user_id)
                                                            ? (
                                                                <i
                                                                    className="fa-solid fa-heart"
                                                                    style={{ color: "red", fontSize: 22 }}
                                                                >
                                                                </i>
                                                            )
                                                            : (
                                                                <i
                                                                    className="fa-regular fa-heart"
                                                                    style={{ color: "red", fontSize: 22 }}
                                                                >
                                                                </i>
                                                            )}
                                                        &nbsp;
                                                        <span
                                                            style={{ color: "red", fontWeight: "600" }}
                                                            className='font-sans font-medium ml-1'
                                                        >
                                                            {data.likes &&
                                                                data.likes.length}{" "}
                                                            {data.likes &&
                                                                (data.likes.length === 0 || data.likes.length === 1)
                                                                ? "like"
                                                                : "likes"}
                                                        </span>
                                                    </button>

                                                    <div className='text-black'>

                                                        <div
                                                            className='font-sans font-medium text-lg font-weight:900'
                                                        >
                                                            Rs. {data.price}/-
                                                        </div>

                                                        <div
                                                            className='font-sans font-medium text-sm'
                                                        >
                                                            <strong>{data.rooms}</strong> BHK | <strong>{data.area}</strong> m<sup>2</sup> | <strong>{data.type}</strong> for <strong>{data.propertyFor}</strong>
                                                        </div>

                                                        <div
                                                            className='font-sans font-medium text-base'
                                                        >

                                                        </div>

                                                        <Flex
                                                            alignItems={"center"}
                                                            width={"full"}
                                                            ml={1}
                                                            mt={2}
                                                        >
                                                            <IoLocation
                                                                fontSize={50}
                                                                color='blue' />
                                                            <div
                                                                className='ml-2 font-sans font-medium text-sm tracking-wide hover:decoration-red-200'
                                                            >
                                                                {data.society + ", " + data.zone + ", " + data.City + ", " + data.State + ", " + data.pincode}
                                                            </div>
                                                        </Flex>
                                                    </div>
                                                </Link>
                                            </>
                                        )
                                    }
                                    {!selectedProperty
                                        || selectedProperty._id !== data._id && (
                                            <>
                                                <Flex
                                                    width={"330px"}
                                                    height={'180px'}
                                                    direction={'column'}
                                                    position="relative"
                                                    mt={5}
                                                >
                                                    {/* Carousel */}
                                                    <Carousel
                                                        autoPlay={true}
                                                        interval={4000}
                                                        infiniteLoop={true}
                                                        width={'305px'}
                                                        height={'180px'}
                                                        rounded='lg'
                                                        showArrows={true}
                                                        showThumbs={false}>
                                                        {data.image &&
                                                            data.image.map((imageName, index) => (
                                                                <Flex
                                                                    objectFit={'cover'}
                                                                    key={index}>
                                                                    <Image
                                                                        width={'305px'}
                                                                        height={'180px'}
                                                                        rounded='10px'
                                                                        mt={1}
                                                                        src={require(`../../../Images/${imageName}`)}
                                                                        alt={`Image ${index}`} />
                                                                </Flex>
                                                            ))}
                                                    </Carousel>
                                                </Flex>
                                                <Link
                                                    to="/sellPropInfo"
                                                    onClick={() => localStorage.setItem("pressCard", keyId)}
                                                    key={data._id}
                                                >
                                                    <button
                                                        value={data._id}
                                                        disabled
                                                        className='mt-2'
                                                    >
                                                        {data.likes &&
                                                            data.likes.some((objectId) => objectId === user_id)
                                                            ? (
                                                                <i
                                                                    className="fa-solid fa-heart"
                                                                    style={{ color: "red", fontSize: 22 }}
                                                                >
                                                                </i>
                                                            )
                                                            : (
                                                                <i
                                                                    className="fa-regular fa-heart"
                                                                    style={{ color: "red", fontSize: 22 }}
                                                                >
                                                                </i>
                                                            )}
                                                        &nbsp;
                                                        <span
                                                            style={{ color: "red", fontWeight: "600" }}
                                                            className='font-sans font-medium ml-1'
                                                        >
                                                            {data.likes &&
                                                                data.likes.length}{" "}
                                                            {data.likes &&
                                                                (data.likes.length === 0 || data.likes.length === 1)
                                                                ? "like"
                                                                : "likes"}
                                                        </span>
                                                    </button>

                                                    <div className='text-black'>

                                                        <div
                                                            className='font-sans font-medium text-lg font-weight:900'
                                                        >
                                                            Rs. {data.price}/-
                                                        </div>

                                                        <div
                                                            className='font-sans font-medium text-sm'
                                                        >
                                                            <strong>{data.rooms}</strong> BHK | <strong>{data.area}</strong> m<sup>2</sup> | <strong>{data.type}</strong> for <strong>{data.propertyFor}</strong>
                                                        </div>

                                                        <div
                                                            className='font-sans font-medium text-base'
                                                        >

                                                        </div>

                                                        <Flex
                                                            alignItems={"center"}
                                                            width={"full"}
                                                            ml={1}
                                                            mt={2}
                                                        >
                                                            <IoLocation
                                                                fontSize={50}
                                                                color='blue' />
                                                            <div
                                                                className='ml-2 font-sans font-medium text-sm tracking-wide hover:decoration-red-200'
                                                            >
                                                                {data.society + ", " + data.zone + ", " + data.City + ", " + data.State + ", " + data.pincode}
                                                            </div>
                                                        </Flex>
                                                    </div>
                                                </Link>
                                            </>
                                        )
                                    }
                                </Popup>
                            </Marker>
                        )
                    })
                    : ""
                }
                <ResetCenterView coordinates={coordinates} />
                <LocationMarker />
            </MapContainer>
        </Box >
    );
};

export default Map;