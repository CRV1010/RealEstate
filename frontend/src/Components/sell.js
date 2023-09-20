import React, { useState } from 'react'

import { Link } from "react-router-dom";

export default function () {

  // const username = JSON.parse(localStorage.getItem('username'));
  const border = { 'border': '1px solid black' }
  const [cookie,setCookie] = useState({})

  const addToLocalStorage = () => {

    var propertyFor = document.querySelector('input[name="propertyFor"]:checked');
    var selectedValue = null;
    if (propertyFor) {
      selectedValue = propertyFor.value;
    }

    let type = document.getElementById('type').value;
    let State = document.getElementById('State').value;
    let City = document.getElementById('City').value;
    let society = document.getElementById('society').value;
    let zone = document.getElementById('zone').value;
    let pincode = document.getElementById('pincode').value;
    let area = document.getElementById('area').value;
    let price = document.getElementById('price').value;
    let rooms = document.getElementById('rooms').value;

    setCookie({ selectedValue, type, State, City, society, zone, pincode, area, price, rooms });

    localStorage.setItem( 'PropertyDetails' , JSON.stringify( { selectedValue , type,State,City,society,zone,pincode,area,price,rooms} ) );

  }

  return (
    <div>

      <h1>Property Info And Location</h1>
      <br />
      <p>Property For</p>
      <label> <input type="radio" name="propertyFor" value="Sell" /> Sell </label>
      <label> <input type="radio" name="propertyFor" value="Rent" /> Rent </label>
      <label> <input type="radio" name="propertyFor" value="PG" /> PG </label>
      <br /><br />

      <p>Types of Property</p>
      <select id="type" style={border}>
        <option value="Flats/Apartments">Flats/Apartments</option>
        <option value="Residential Plot">Residential Plot</option>
        <option value="Office Space">Office Space</option>
        <option value="Farm House">Farm House</option>
        <option value="Agrictural land">Agrictural land</option>
        <option value="Commercial plots">Commercial plots</option>
        <option value="Warehouse & Godown">Warehouse & Godown</option>
        <option value="Factory">Factory</option>
      </select>
      <br /><br />

      <label>State
        <input type="text" name="State" id="State" style={border} placeholder='Enter State' />
      </label>
      <br />

      <label>City
        <input type="text" name="City" id="City" style={border} placeholder='Enter City' />
      </label>
      <br /><br />

      <label>Apartment/Society
        <input type="text" name="society" id="society" style={border} placeholder='Name Of Apartment/Society' />
      </label>
      <br /><br />

      <label>Area
        <input type="text" name="zone" id="zone" style={border} />
      </label>
      <br /><br />

      <label>Pincode
        <input type="number" name='pincode' id="pincode" style={border} />
      </label>
      <br /><br />

      <h1>Property Feature & Price</h1>
      <label>Plot/LAnd Area
        <input type="number" name='area' id="area" style={border} placeholder='Plot/Land Area in Sq.meter' />
      </label>
      <br />

      <label>Expected Price
        <input type="number" name='price' id="price" style={border} placeholder='Enter Total Price' />
      </label>
      <br />

      <label>No. of Bedrooms </label>
      <select id="rooms" style={border}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">More</option>
      </select>
      <br />

      <button type="submit" style={{ 'width': '100px', 'height': '50px', 'backgroundColor': 'blue' }} onClick={addToLocalStorage}> Save </button>
      <Link to="/addProperty"> Continue </Link>

      {/* <AddProperty data={cookie} /> */}

    </div >
  )
}
