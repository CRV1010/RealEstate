import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
          animate: true,
        }
      );
    }
  }, [coordinates]);

  return null;
};

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
      icon={L.icon({ iconUrl: "./locicon.png", iconSize: [30, 30] })}
    >
      {isPopupOpen && (
        <Popup onClose={() => setIsPopupOpen(false)}>You are here</Popup>
      )}
    </Marker>
  );
};

const position = [22.2994, 73.2081];

const Map = (props) => {
  const mapRef = useRef(null); // Create a mapRef using useRef
  var user = localStorage.getItem("user");
  const user_id = JSON.parse(user)?._id;

  const { coordinates, database, selectedProperty } = props;
  // console.log(selectedProperty);

  const locationSelection = [coordinates?.lat, coordinates?.lon];

  const [markerPosition, setMarkerPosition] = useState([]);

  useEffect(() => {
    async function showAddresses() {
      const updatedAddresses = await Promise.all(
        database.map(async (data) => {
          // Combine address components
          const addressQuery = `${data.pincode}` || `${data.City}`;
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
                lon,
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
      const validAddresses = updatedAddresses.filter(
        (data) => data.lat !== undefined && data.lon !== undefined
      );
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
      const marker = markerPosition.find(
        (data) => data._id === selectedProperty._id
      );
      if (marker) {
        // Check if the marker exists and open its popup
        marker.ref.openPopup();

        // Calculate the offset to accommodate the popup
        const popupOffset = [0, -marker.ref._icon.clientHeight / 2];

        // Center the map on the selected property and adjust the zoom
        const map = mapRef.current;
        map.flyTo([marker.lat, marker.lon], 12, {
          animate: true,
          offset: popupOffset,
        });
      }
    }
  }, [selectedProperty, markerPosition]);

  return (
    <Box
      className="h-screen z-60 align-left"
      right={0}
      position={"fixed"}
      top={110}
      width={"64%"}
    >
      <br />
      <MapContainer
        ref={mapRef} // Ref for the map container
        className="h-screen w-full absolute -mt-3"
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
            icon={L.icon({
              iconUrl: "./locicon.png",
              iconSize: [25, 25],
            })}
          >
            <Popup>Your Searched Location</Popup>
          </Marker>
        )}

        {markerPosition
          ? markerPosition.map((data, index) => {
              const keyId = `${data._id}`;

              let markerIconUrl = "";
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
                  icon={L.icon({
                    iconUrl: markerIconUrl,
                    iconSize: [25, 25],
                  })}
                  ref={(ref) => (data.ref = ref)}
                >
                  <Popup>
                    {(selectedProperty && selectedProperty._id === data._id) ||
                    !selectedProperty ? (
                      <>
                        <div className="mt-5">
                          <Flex
                            width={"290px"}
                            height={"160px"}
                            direction={"column"}
                            position="relative"
                            mt={15}
                            mb={5}
                            mx={5}
                          >
                            {/* Carousel */}
                            <Carousel
                              autoPlay={true}
                              interval={4000}
                              infiniteLoop={true}
                              width={"290px"}
                              height={"160px"}
                              rounded="lg"
                              showArrows={true}
                              showThumbs={false}
                            >
                              {data.image &&
                                data.image.map((imageName, index) => (
                                  <Flex objectFit={"cover"} key={index}>
                                    <Image
                                      width={"290px"}
                                      height={"160px"}
                                      rounded="10px"
                                      mt={1}
                                      src={require(`../../../Images/${imageName}`)}
                                      alt={`Image ${index}`}
                                    />
                                  </Flex>
                                ))}
                            </Carousel>
                          </Flex>
                          <Link
                            to="/sellPropInfo"
                            onClick={() =>
                              localStorage.setItem("pressCard", keyId)
                            }
                            key={data._id}
                          >
                            <div className="flex justify-between ml-1 items-center">
                              <button
                                value={data._id}
                                disabled
                                className="mt-2"
                              >
                                {data.likes &&
                                data.likes.some(
                                  (objectId) => objectId === user_id
                                ) ? (
                                  <i
                                    className="fa-solid fa-heart"
                                    style={{ color: "red", fontSize: 18 }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fa-regular fa-heart"
                                    style={{ color: "red", fontSize: 18 }}
                                  ></i>
                                )}
                                &nbsp;
                                <span
                                  style={{ color: "red", fontWeight: "600" }}
                                  className="font-sans font-medium ml-1"
                                >
                                  {data.likes && data.likes.length}{" "}
                                  {data.likes &&
                                  (data.likes.length === 0 ||
                                    data.likes.length === 1)
                                    ? "like"
                                    : "likes"}
                                </span>
                              </button>
                              <div className="font-sans mt-1 mr-4 font-medium text-lg font-weight:900">
                                Rs. {data.price}/-
                              </div>
                            </div>

                            <div className="text-black ml-1">
                              <div className="font-sans font-medium text-sm">
                                <div>
                                  <strong>{data.rooms}</strong> BHK |{" "}
                                  <strong>{data.area}</strong> m<sup>2</sup> |{" "}
                                  <strong>{data.type}</strong> for{" "}
                                  <strong>{data.propertyFor}</strong>
                                </div>
                              </div>

                              <div className="font-sans font-medium text-base"></div>

                              <Flex
                                alignItems={"center"}
                                width={"full"}
                                ml={1}
                                mt={2}
                              >
                                <Flex>
                                  <IoLocation fontSize={25} color="blue" />
                                </Flex>
                                <Flex className="ml-2 font-sans font-medium text-sm tracking-wide hover:decoration-red-200">
                                  {data.society}, {data.zone}, {data.City},{" "}
                                  {data.State}, {data.pincode}
                                </Flex>
                              </Flex>
                            </div>
                          </Link>
                        </div>
                      </>
                    ) : null}
                    {!selectedProperty ||
                      (selectedProperty._id !== data._id && (
                        <>
                          <div className="mt-5">
                            <Flex
                              width={"290px"}
                              height={"160px"}
                              direction={"column"}
                              position="relative"
                              mt={15}
                              mb={5}
                              mx={5}
                            >
                              {/* Carousel */}
                              <Carousel
                                autoPlay={true}
                                interval={4000}
                                infiniteLoop={true}
                                width={"290px"}
                                height={"160px"}
                                rounded="lg"
                                showArrows={true}
                                showThumbs={false}
                              >
                                {data.image &&
                                  data.image.map((imageName, index) => (
                                    <Flex objectFit={"cover"} key={index}>
                                      <Image
                                        width={"290px"}
                                        height={"160px"}
                                        rounded="10px"
                                        mt={1}
                                        src={require(`../../../Images/${imageName}`)}
                                        alt={`Image ${index}`}
                                      />
                                    </Flex>
                                  ))}
                              </Carousel>
                            </Flex>
                            <Link
                              to="/sellPropInfo"
                              onClick={() =>
                                localStorage.setItem("pressCard", keyId)
                              }
                              key={data._id}
                            >
                              <div className="flex justify-between ml-1 items-center">
                                <button
                                  value={data._id}
                                  disabled
                                  className="mt-2"
                                >
                                  {data.likes &&
                                  data.likes.some(
                                    (objectId) => objectId === user_id
                                  ) ? (
                                    <i
                                      className="fa-solid fa-heart"
                                      style={{ color: "red", fontSize: 18 }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="fa-regular fa-heart"
                                      style={{ color: "red", fontSize: 18 }}
                                    ></i>
                                  )}
                                  &nbsp;
                                  <span
                                    style={{ color: "red", fontWeight: "600" }}
                                    className="font-sans font-medium ml-1"
                                  >
                                    {data.likes && data.likes.length}{" "}
                                    {data.likes &&
                                    (data.likes.length === 0 ||
                                      data.likes.length === 1)
                                      ? "like"
                                      : "likes"}
                                  </span>
                                </button>
                                <div className="font-sans mt-1 mr-4 font-medium text-lg font-weight:900">
                                  Rs. {data.price}/-
                                </div>
                              </div>

                              <div className="text-black ml-1">
                                <div className="font-sans font-medium text-sm">
                                  <div>
                                    <strong>{data.rooms}</strong> BHK |{" "}
                                    <strong>{data.area}</strong> m<sup>2</sup> |{" "}
                                    <strong>{data.type}</strong> for{" "}
                                    <strong>{data.propertyFor}</strong>
                                  </div>
                                </div>

                                <div className="font-sans font-medium text-base"></div>

                                <Flex
                                  alignItems={"center"}
                                  width={"full"}
                                  ml={1}
                                  mt={2}
                                >
                                  <Flex>
                                    <IoLocation fontSize={25} color="blue" />
                                  </Flex>
                                  <Flex className="ml-2 font-sans font-medium text-sm tracking-wide hover:decoration-red-200">
                                    {data.society}, {data.zone}, {data.City},{" "}
                                    {data.State}, {data.pincode}
                                  </Flex>
                                </Flex>
                              </div>
                            </Link>
                          </div>
                        </>
                      ))}
                  </Popup>
                </Marker>
              );
            })
          : ""}
        <ResetCenterView coordinates={coordinates} />
        <LocationMarker />
      </MapContainer>
    </Box>
  );
};

export default Map;
