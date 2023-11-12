import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

// const params = {
//     q: '',
//     format: 'json',
//     addressdetails: 'addressdetails'
// }

const Searchbar = () => {
  const [coordinates, setCoordinates] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const buttonClick = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(params).toString();

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    setIsMenuVisible(true);

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err:", err));
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      if (selectedIndex !== -1) {
        // If an item is selected, perform the selected item action
        const selectedItem = listPlace[selectedIndex];
        setCoordinates(selectedItem);
        setIsMenuVisible(false);
        navigate(`/searchmap?lat=${selectedItem.lat}&lng=${selectedItem.lon}`);
      } else {
        // If no item is selected, perform the search action
        buttonClick();
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex < listPlace.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedIndex, listPlace]);

  const listItemStyles = {
    backgroundColor: "rgba(178, 235, 242, 0.9)",
    borderRadius: "20px",
  };

  const navigate = useNavigate();

  return (
    <>
      <Flex className="flex justify-center items-center" zIndex={100}>
        <div className="w-full h-full mt-40 ml-40 flex flex-col hover:opacity-90 opacity-60">
          <div className="w-2/3 md:w-8/12 xl:w-1/2 bg-white p-2 border-solid border-2 ring-blue-400 ring-2 hover:ring-blue-600 rounded-lg drop-shadow-3xl md:drop-shadow-xl">
            <section className="w-full h-7 flex items-center">
              <span className="w-10 h-full flex items-center">
                <i
                  className="fa-solid fa-magnifying-glass ml-2 text-blue-800"
                  aria-hidden="true"
                ></i>
              </span>
              <input
                type="text"
                name="search"
                placeholder="Search Address, City & Pincode....."
                autoComplete="on"
                aria-label="Search talk"
                className="w-full h-full font-medium md:pl-2 focus:outline-none"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={handleEnterKeyPress}
              />
              <button
                className="w-25 p-4 h-full bg-blue-700 flex justify-center items-center rounded-lg text-white font-medium"
                onClick={buttonClick}
                onKeyDown={handleEnterKeyPress}
              >
                Search
              </button>
            </section>
            <List
              component="nav"
              aria-label="main folders"
              className={`${isMenuVisible ? "visible" : "hidden"}`}
            >
              {listPlace.map((item, index) => {
                const isItemSelected = index === selectedIndex;
                const isSelectedOrHovered =
                  isItemSelected || index === selectedIndex;

                return (
                  <div key={item?.osm_id}>
                    <ListItem
                      button
                      onClick={() => {
                        setCoordinates(item);
                        setIsMenuVisible(false);
                        navigate(`/searchmap?lat=${item.lat}&lng=${item.lon}`);
                        setSelectedIndex(index);
                      }}
                      selected={isItemSelected}
                      onMouseEnter={() => setSelectedIndex(index)}
                      style={isSelectedOrHovered ? listItemStyles : {}}
                    >
                      <ListItemIcon>
                        <img
                          src="./locicon.png"
                          alt="Placeholder"
                          style={{ width: 20, height: 20 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item?.display_name} />
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default Searchbar;
