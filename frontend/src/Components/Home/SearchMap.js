import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Header from './SearchMap/Header';
import Map from './SearchMap/Map';
import PropertyList from './SearchMap/PropertyList';

const SearchMap = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [coordinates, setCoordinates] = useState(null);

    const lat = queryParams.get("lat");
    const lng = queryParams.get("lng");

    useEffect(() => {
        if (lat !== null && lng !== null) {
            setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lng) });
        }
    }, [lat, lng]);

    const [filteredProperty, setFilteredProperty] = useState([]);

    const [propertyFor, setPropertyFor] = useState('');
    const [price, setPrice] = useState([0, 0]);
    const [propertyType, setPropertyType] = useState('');
    const [houseType, setHouseType] = useState('');

    const [selectedPropertyFor, setSelectedPropertyFor] = useState("Property For");
    const [selectedPrice, setSelectedPrice] = useState("Choose Price");
    const [selectedPropertyType, setSelectedPropertyType] = useState("Property Type");
    const [selectedHouseType, setSelectedHouseType] = useState("House Type");

    const [database, setDatabase] = useState([]);

    const navigate = useNavigate();

    const [showFilteredProperties, setShowFilteredProperties] = useState(false);

    const [selectedProperty, setSelectedProperty] = useState(null);

    const setSave = () => {
        // Display the filtered properties
        setShowFilteredProperties(true);
    };

    const resetFilters = () => {
        setPropertyFor('');
        setPrice([0, 0]);
        setPropertyType('');
        setHouseType('');
        setShowFilteredProperties(false);
    };


    const setReset = () => {
        // Display all properties from the original database
        setShowFilteredProperties(false);

        resetFilters();

        // Reset the selected values
        setSelectedPropertyFor("Property For");
        setSelectedPrice("Choose Price");
        setSelectedPropertyType("Property Type");
        setSelectedHouseType("House Type");
    };

    useEffect(() => {

        const filteredData = database.filter((data) =>

            (propertyFor === '' || data.propertyFor === propertyFor) &&
            (propertyType === '' || data.type === propertyType) &&
            (houseType === '' || data.rooms === houseType) &&
            (price[0] === 0 || data.price >= price[0]) &&
            (price[1] === 0 || data.price <= price[1])

        );

        setFilteredProperty(filteredData);

    }, [propertyFor, propertyType, houseType, price, database]);

    // Fetch data when the component mounts
    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await fetch('http://localhost:5000/get-data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDatabase(data);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error, e.g., show a message to the user
            }
        };

        fetchData();

    }, []);

    // Redirect to login if not authenticated
    // useEffect(() => {
    //     const auth = localStorage.getItem('user');
    //     if (!auth) {
    //         navigate('/login');
    //     }
    // }, [navigate]);

    return (
        <Flex
            backgroundColor={'lightblue'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'99vw'}
            height={'100vh'}
            maxWidth={'100vw'}
            maxHeight={'100vh'}
            position={'relative'}
        >
            <Header
                coordinates={coordinates}
                setCoordinates={setCoordinates}

                propertyType={propertyType}
                setPropertyType={setPropertyType}

                price={price}
                setPrice={setPrice}

                propertyFor={propertyFor}
                setPropertyFor={setPropertyFor}

                houseType={houseType}
                setHouseType={setHouseType}

                selectedPropertyFor={selectedPropertyFor}
                setSelectedPropertyFor={setSelectedPropertyFor}

                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}

                selectedPropertyType={selectedPropertyType}
                setSelectedPropertyType={setSelectedPropertyType}

                selectedHouseType={selectedHouseType}
                setSelectedHouseType={setSelectedHouseType}

                setSave={setSave}
                setReset={setReset}
            />

            <PropertyList
                database={database}
                showFilteredProperties={showFilteredProperties}
                filteredProperty={filteredProperty}

                setSelectedProperty={setSelectedProperty}
            />

            <Map
                database={database}

                coordinates={coordinates}
                setCoordinates={setCoordinates}

                selectedProperty={selectedProperty}
            />
        </Flex>
    );
};

export default SearchMap;