import React, { useState } from 'react';
import { Flex, Input, InputGroup, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Text, Button } from '@chakra-ui/react';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const Header = (props) => {
    const {
        setCoordinates,
        setPropertyFor,
        setPrice,
        setPropertyType,
        setHouseType,
        selectedPropertyFor,
        setSelectedPropertyFor,
        selectedPrice,
        setSelectedPrice,
        selectedPropertyType,
        setSelectedPropertyType,
        selectedHouseType,
        setSelectedHouseType,
        setSave,
        setReset
    } = props;

    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // const [selectedPropertyFor, setSelectedPropertyFor] = useState("Property For");
    // const [selectedPrice, setSelectedPrice] = useState("Choose Price");
    // const [selectedPropertyType, setSelectedPropertyType] = useState("Property Type");
    // const [selectedHouseType, setSelectedHouseType] = useState("House Type");

    const buttonClick = () => {
        const params = {
            q: searchText,
            format: 'json',
            addressdetails: 1,
            polygon_geojson: 0
        };

        const queryString = new URLSearchParams(params).toString();

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        setIsMenuVisible(true);

        fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(JSON.parse(result));
                setListPlace(JSON.parse(result));
            })
            .catch((err) => console.log("err:", err));
    }

    return (
        <Flex
            className="w-full text-black-600 body-font bg-red-200"
            position="absolute"
            top={0}
            left={0}
            width="full"
            px={4}
            py={0}
            zIndex={30}
            style={{ height: '50px' }}
        >
            <Flex className="container flex flex-wrap flex-col md:flex-row items-center">
                <Flex>
                    <InputGroup width="30vw" shadow="lg" className="mr-5">
                        <div className="w-full" height={'38px'}>
                            <div className="w-full ml-1 bg-white p-3 rounded-3xl border border-indigo-900 hover:border-indigo-900 hover:ring-2 hover:ring-indigo-400">
                                <section className="w-full h-6 flex items-center">
                                    <span className="w-10 h-full flex items-center">
                                        <i className="fa-solid fa-magnifying-glass ml-2 text-blue-800" aria-hidden="true"></i>
                                    </span>
                                    <Input
                                        type="text"
                                        name="search"
                                        placeholder="Find the Location"
                                        autoComplete="off"
                                        aria-label="Search talk"
                                        className="w-full h-full font-medium md:pl-2 focus:outline-none"
                                        value={searchText}
                                        onChange={(e) => {
                                            setSearchText(e.target.value);
                                        }}
                                    />
                                    <Button
                                        className="w-1/4 md:w-1/5 p-4 m-0 h-full bg-blue-800 flex justify-center items-center rounded-2xl text-white font-medium ease-in-out"
                                        onClick={buttonClick}
                                    >
                                        Search
                                    </Button>
                                </section>
                                <List
                                    component="nav"
                                    aria-label='main folders'
                                    className={`${isMenuVisible ? 'visible' : 'hidden'}`}
                                >
                                    {listPlace.map((item) => {
                                        return (
                                            <div key={item?.osm_id}>
                                                <ListItem button onClick={() => {
                                                    setCoordinates(item);
                                                    setIsMenuVisible(false);
                                                }}>
                                                    <ListItemIcon>
                                                        <img
                                                            src="./locicon.png"
                                                            alt="Placeholder"
                                                            style={{ width: 20, height: 20 }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={item?.display_name}
                                                    />
                                                </ListItem>
                                            </div>
                                        );
                                    })}
                                </List>
                            </div>
                        </div>
                    </InputGroup>

                    <Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            px={2}
                            py={2}
                            bg="white"
                            rounded={30}
                            ml={0}
                            shadow="lg"
                            cursor="pointer"
                            className='border border-indigo-900 hover:border-indigo-900 hover:ring-2 hover:ring-indigo-400 hover:bg-cyan-100'
                            style={{ height: '48px' }}
                            // hover={{bg: 'yellow.200'}}
                        >
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton
                                            width={'125px'}
                                            ml={10}
                                            isActive={isOpen}
                                            as={Button}
                                            fontWeight={500}
                                            rightIcon={isOpen
                                                ? <BiChevronUp fontSize={25} className="mr-1" />
                                                : <BiChevronDown fontSize={25} className="mr-1" />
                                            }
                                            onClick={() =>
                                                setSelectedPropertyFor("Property For")
                                            }
                                        >
                                            {selectedPropertyFor}
                                        </MenuButton>

                                        <MenuList
                                            bgColor="white"
                                            rounded={20}
                                        >
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={3}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setPropertyFor("Rent");
                                                    setSelectedPropertyFor("Rent");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    Rent
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={3}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setPropertyFor("Sell");
                                                    setSelectedPropertyFor("Sell");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    Sell
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setPropertyFor("PG");
                                                    setSelectedPropertyFor("PG");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    PG
                                                </Text>
                                            </MenuItem>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </Flex>
                    </Flex>

                    <Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            px={8}
                            py={2}
                            bg="white"
                            rounded={30}
                            ml={10}
                            shadow="lg"
                            cursor="pointer"
                            className='border border-indigo-900 hover:border-indigo-900 hover:ring-2 hover:ring-indigo-400 hover:bg-cyan-100'
                            style={{ height: '48px' }}
                        >
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton
                                            width={"165px"}
                                            ml={10}
                                            isActive={isOpen}
                                            as={Button}
                                            fontWeight={500}
                                            rightIcon={isOpen
                                                ? <BiChevronUp fontSize={25} className="mr-2" />
                                                : <BiChevronDown fontSize={25} className="mr-2" />
                                            }
                                        >
                                            {selectedPrice}
                                        </MenuButton>

                                        <MenuList bgColor="white">
                                            {selectedPropertyFor === "Rent" ? (
                                                <>
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([5000, 30000]);
                                                            setSelectedPrice("5000-30000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            5000-30000
                                                        </Text>
                                                    </MenuItem>
                                                    <MenuDivider />
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([30000, 60000]);
                                                            setSelectedPrice("30000-60000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            30000-60000
                                                        </Text>
                                                    </MenuItem>
                                                    <MenuDivider />
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([60000, 100000]);
                                                            setSelectedPrice("60000-100000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            60000-100000
                                                        </Text>
                                                    </MenuItem>
                                                </>
                                            ) : selectedPropertyFor === "Sell" ? (
                                                <>
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([1000000, 3000000]);
                                                            setSelectedPrice("1000000-3000000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            1000000-3000000
                                                        </Text>
                                                    </MenuItem>
                                                    <MenuDivider />
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([3000000, 6000000]);
                                                            setSelectedPrice("3000000-6000000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            3000000-6000000
                                                        </Text>
                                                    </MenuItem>
                                                    <MenuDivider />
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([6000000, 10000000]);
                                                            setSelectedPrice("6000000-10000000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            6000000-10000000
                                                        </Text>
                                                    </MenuItem>
                                                </>
                                            ) : selectedPropertyFor === "PG" ? (
                                                <>
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([5000, 10000]);
                                                            setSelectedPrice("5000-10000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            5000-10000
                                                        </Text>
                                                    </MenuItem>
                                                    <MenuDivider />
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([10000, 15000]);
                                                            setSelectedPrice("10000-15000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            10000-15000
                                                        </Text>
                                                    </MenuItem>
                                                    <MenuDivider />
                                                    <MenuItem
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mt={4}
                                                        px={40}
                                                        py={8}
                                                        bg="white"
                                                        onClick={() => {
                                                            setPrice([15000, 20000]);
                                                            setSelectedPrice("15000-20000");
                                                        }}
                                                        className="hover:bg-blue-200 ease-in-out"
                                                    >
                                                        <Text fontSize={15} fontWeight={500} color="gray.700">
                                                            15000-20000
                                                        </Text>
                                                    </MenuItem>
                                                </>
                                            ) : null}
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </Flex>
                    </Flex>

                    <Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            px={8}
                            py={2}
                            bg="white"
                            rounded={30}
                            ml={10}
                            shadow="lg"
                            cursor="pointer"
                            className='border border-indigo-900 hover:border-indigo-900 hover:ring-2 hover:ring-indigo-400 hover:bg-cyan-100'
                            style={{ height: '48px' }}
                        >
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton
                                            width={'154px'}
                                            ml={10}
                                            isActive={isOpen}
                                            as={Button}
                                            fontWeight={500}
                                            rightIcon={isOpen
                                                ? <BiChevronUp fontSize={25} className="mr-2" />
                                                : <BiChevronDown fontSize={25} className="mr-2" />
                                            }>
                                            {selectedPropertyType}
                                        </MenuButton>

                                        <MenuList bgColor="white">
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setPropertyType("Flats/Apartments");
                                                    setSelectedPropertyType("Flats/Apartments")
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    Flats/Apartments
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setPropertyType("Residential Plot");
                                                    setSelectedPropertyType("Residential Plot");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    Residential Plot
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setPropertyType("Office Space");
                                                    setSelectedPropertyType("Office Space");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    Office Space
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setPropertyType("Farm House");
                                                    setSelectedPropertyType("Farm House");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    Farm House
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setPropertyType("Commercial plots");
                                                    setSelectedPropertyType("Commercial Plot");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    Commercial Plot
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </Flex>
                    </Flex>

                    <Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            px={8}
                            py={2}
                            bg="white"
                            rounded={30}
                            ml={10}
                            shadow="lg"
                            cursor="pointer"
                            className='border border-indigo-900 hover:border-indigo-900 hover:ring-2 hover:ring-indigo-400 hover:bg-cyan-100'
                            style={{ height: '48px' }}
                        >
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton
                                            width={"120px"}
                                            ml={10}
                                            isActive={isOpen}
                                            as={Button}
                                            fontWeight={500}
                                            rightIcon={isOpen
                                                ? <BiChevronUp fontSize={25} className="mr-2" />
                                                : <BiChevronDown fontSize={25} className="mr-2" />
                                            }
                                        >
                                            {selectedHouseType}
                                        </MenuButton>

                                        <MenuList bgColor="white">
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setHouseType(1);
                                                    setSelectedHouseType("1 - BHK");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    1 - BHK
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setHouseType(2);
                                                    setSelectedHouseType("2 - BHK");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    2 - BHK
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setHouseType(3);
                                                    setSelectedHouseType("3 - BHK");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    3 - BHK
                                                </Text>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mt={4}
                                                px={40}
                                                py={8}
                                                bg="white"
                                                onClick={() => {
                                                    setHouseType(4);
                                                    setSelectedHouseType("4 - BHK");
                                                }}
                                                className='hover:bg-blue-200 ease-in-out'
                                            >
                                                <Text fontSize={15} fontWeight={500} color="gray.700">
                                                    4 - BHK
                                                </Text>
                                            </MenuItem>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </Flex>
                    </Flex>

                    <Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            px={6}
                            py={2}
                            bg="blue"
                            rounded={13}
                            ml={10}
                            shadow="lg"
                            cursor="pointer"
                            className='border border-white-900 hover:border-white-900 hover:ring-2 hover:ring-indigo-500'
                            style={{ height: '48px' }}
                        >
                            <Button
                                colorScheme='blue'
                                className='text-white mx-3'
                                onClick={setSave}
                            >
                                Save
                            </Button>
                        </Flex>
                    </Flex>

                    <Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            px={6}
                            py={2}
                            bg="blue"
                            rounded={13}
                            ml={10}
                            shadow="lg"
                            cursor="pointer"
                            className='border border-white-900 hover:border-white-900 hover:ring-2 hover:ring-indigo-500'
                            style={{ height: '48px' }}
                        >
                            <Button
                                colorScheme='blue'
                                className='text-white mx-3'
                                onClick={setReset}
                            >
                                Reset
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex >
        </Flex >
    );
};

export default Header;