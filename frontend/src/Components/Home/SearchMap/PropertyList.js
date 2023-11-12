import React from "react";
import { IoLocation } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Flex, Text, Image, ChakraProvider } from "@chakra-ui/react";

const PropertyList = (props) => {
  var user = localStorage.getItem("user");
  const user_id = JSON.parse(user)?._id;

  const {
    showFilteredProperties,
    filteredProperty,
    database,
    setSelectedProperty,
  } = props;

  const propertiesToDisplay = showFilteredProperties
    ? filteredProperty
    : database;

  return (
    <ChakraProvider>
      <Flex
        direction={"column"}
        bg={"whiteAlpha.900"}
        width={"37vw"}
        height="full"
        left={0}
        mt={20}
        zIndex={20}
        overflow="Hidden"
        px={2}
      >
        <Flex flex={1} overflowY={"scroll"} mt={5} direction={"column"}>
          {propertiesToDisplay.length === 0 ? (
            <Flex fontSize={"20px"} ml={"60px"} mt={"60px"}>
              Your choice property is not here.
            </Flex>
          ) : (
            propertiesToDisplay &&
            propertiesToDisplay.map((data, i) => (
              <>
                <Flex
                  bg={"whiteAlpha.100"}
                  px={2}
                  py={2}
                  mb={2}
                  mt={0}
                  mr={2}
                  shadow="xl"
                  direction={"column"}
                  alignItems={"start"}
                  justifyContent="space-between"
                  bgColor={"orange.100"}
                  _hover={{ bg: "teal.100" }}
                  className="font-sans rounded-xl border-2 hover:scale-95 border-red-200  hover:border-teal-400 transition subpixel-antialiased"
                  onClick={() => setSelectedProperty(data)}
                >
                  <Flex justifyContent={"space-between"} width={"full"}>
                    <Flex
                      direction={"column"}
                      justifyContent={"start"}
                      alignItems={"start"}
                      width="full"
                      px={2}
                    >
                      <Flex
                        alignItems={"center"}
                        width={"full"}
                        justifyContent={"space-between"}
                      >
                        <Text
                          textTransform={"capitalize"}
                          width={"40"}
                          fontSize={"lg"}
                          fontWeight={700}
                          isTruncated
                        >
                          {"Property For: " + data.propertyFor}
                        </Text>
                        <Text
                          fontSize={"15px"}
                          fontWeight={500}
                          color={"green.400"}
                        >
                          {"Rs. " + data.price + "/-"}
                        </Text>
                      </Flex>
                      <Flex alignItems={"center"} width={"full"} mt={3}>
                        <Text
                          fontSize={"sm"}
                          fontWeight={"600"}
                          color={"Black.600"}
                        >
                          {"Type of Property : "}
                        </Text>
                        <Text
                          fontSize={"sm"}
                          fontWeight={"500"}
                          color={"red.500"}
                          ml={1}
                        >
                          {data.type}
                        </Text>
                      </Flex>
                      <Flex alignItems={"center"} width={"full"} mt={2}>
                        <Text
                          fontSize={"sm"}
                          fontWeight={"600"}
                          color={"Black.600"}
                        >
                          {"Facilities : "}
                        </Text>
                        <Text
                          fontSize={"sm"}
                          fontWeight={"500"}
                          color={"red.500"}
                          ml={1}
                        >
                          {data.rooms + " BHK"}
                        </Text>
                      </Flex>
                      <Flex alignItems={"center"} width={"full"} mt={2}>
                        <Text
                          fontSize={"sm"}
                          fontWeight={"600"}
                          color={"Black.600"}
                        >
                          {"Land Area : "}
                        </Text>
                        <Text
                          fontSize={"sm"}
                          fontWeight={"500"}
                          color={"red.500"}
                          ml={1}
                        >
                          {data.area}
                          <span>
                            {" "}
                            m<sup>2</sup>
                          </span>
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex direction={"column"}>
                      <Carousel
                        autoPlay={true}
                        interval={4000}
                        infiniteLoop={true}
                        width={"120px"}
                        height={"100px"}
                        rounded="lg"
                        showArrows={false}
                        showThumbs={false}
                      >
                        {data.image.map((imageName, index) => (
                          <Flex objectFit={"cover"} key={index}>
                            <Image
                              width={"140px"}
                              height={"95px"}
                              rounded="lg"
                              mt={1}
                              src={require(`../../../Images/${imageName}`)}
                              alt={`Image ${index}`}
                            />
                          </Flex>
                        ))}
                      </Carousel>
                      <button value={data._id} disabled>
                        {data.likes &&
                        data.likes.some((objectId) => objectId === user_id) ? (
                          <i
                            className="fa-solid fa-heart"
                            style={{ color: "red", fontSize: 13 }}
                          ></i>
                        ) : (
                          <i
                            className="fa-regular fa-heart"
                            style={{ color: "red", fontSize: 13 }}
                          ></i>
                        )}
                        &nbsp;
                        <span
                          style={{
                            color: "red",
                            fontWeight: "600",
                            fontSize: 13,
                          }}
                          className="font-sans font-xxs ml-1"
                        >
                          {data.likes && data.likes.length}{" "}
                          {data.likes &&
                          (data.likes.length === 0 || data.likes.length === 1)
                            ? "like"
                            : "likes"}
                        </span>
                      </button>
                    </Flex>
                  </Flex>
                  <Flex alignItems={"center"} width={"full"} ml={1}>
                    <IoLocation
                      height={10}
                      width={10}
                      // fontSize={30}
                      color="red"
                    />
                    <Text
                      fontSize={"sm"}
                      fontWeight={"500"}
                      color={"black.500"}
                      ml={1}
                    >
                      {data.society +
                        ", " +
                        data.zone +
                        ", " +
                        data.City +
                        ", " +
                        data.State +
                        ", " +
                        data.pincode}
                    </Text>
                  </Flex>
                </Flex>
              </>
            ))
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default PropertyList;
