import React from 'react';
import { Flex, ChakraProvider } from "@chakra-ui/react";
import List from './List';

const PropertyList = (props) => {
    const { showFilteredProperties, filteredProperty, database, setSelectedProperty } = props;

    const propertiesToDisplay = showFilteredProperties ? filteredProperty : database;

    return (
        <ChakraProvider>
            <Flex
                direction={"column"}
                bg={"whiteAlpha.900"}
                width={"37vw"}
                height="100vh"
                left={0}
                top={0}
                zIndex={1}
                overflow="Hidden"
                px={2}
            >
                <Flex
                    flex={1}
                    overflowY={'scroll'}
                    mt={16}
                    direction={'column'}>
                    {propertiesToDisplay.length === 0
                        ? (
                            <Flex
                                fontSize={"20px"}
                                ml={"60px"}
                                mt={"60px"}
                            >
                                Your choice property is not here.
                            </Flex>
                        )
                        : (propertiesToDisplay &&
                            propertiesToDisplay.map((data, i) => (
                                <List
                                    data={data}
                                    key={i}
                                    setSelectedProperty={setSelectedProperty}
                                />
                            ))
                        )
                    }
                </Flex>
            </Flex>
        </ChakraProvider>
    );
};

export default PropertyList;