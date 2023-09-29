import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import './explore.css'

export default function () {
    const navigate = useNavigate();
    useEffect(() => {
      const auth = localStorage.getItem("user");
      if (!auth) {
        navigate("/login");
      }
    }, []);
    const [database, setdatabase] = useState([]);

    useEffect(() => {
        getData();
    }, [])
    
    async function getData() {
        const result = await fetch("http://localhost:5000/get-data", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
        var data = await result.json();
        setdatabase(data)
    }

    return (
        <>
            <h1 id='headingExplore'> Properties for Explore </h1>
            <div className="mainExplore" style={{'maxWidth': '80%'}}>
                <ul className="cardsExplore">
                    {database ?
                        database.map(
                            (ArrayOfObjects, index) => {
                                const imageNames = ArrayOfObjects.image[0];
                                return (
                                    <li className="cards_item_explore" key={ArrayOfObjects._id}>
                                        <div className="card" tabindex="0">
                                            <h2 className="card_title_explore"> {ArrayOfObjects.propertyFor} &#x2022; &#8377;{ArrayOfObjects.price} </h2>
                                            <div className="card_image_explore">
                                                {
                                                    ArrayOfObjects.image && ArrayOfObjects.image.length > 0 ? (
                                                        <img src={require(`../Images/${ArrayOfObjects.image[0]}`)} key={ArrayOfObjects.image[0]} alt='not fetched' />
                                                    ) : (
                                                        ""
                                                    )
                                                }
                                                
                                            </div>
                                            
                                            <div className="card_content_explore">
                                                <div className="card_text_explore">
                                                    <p> <strong> Property Type: </strong>{ArrayOfObjects.type} </p>
                                                    <p> <strong>Location: </strong> {ArrayOfObjects.society}, {ArrayOfObjects.zone}, {ArrayOfObjects.City}, {ArrayOfObjects.State}. </p>
                                                    <p> <strong>Pincode: </strong> {ArrayOfObjects.pincode} </p> <br />
                                                    <p className="facility_explore"> <strong>Facility: </strong> {ArrayOfObjects.rooms} BHK <br /> <strong>Land Area: </strong> {ArrayOfObjects.area} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        )
                        : ""
                    }
                </ul>
            </div>
        </>
    )
}



// For all image
{/* <div key={ArrayOfObjects._id}>
{
    ArrayOfObjects.image[0] ?
        ArrayOfObjects.image.map((imageName) => {
            return (
                <img src={require(`../Images/${imageName}`)} key={imageName} style={{ 'width': '220px', 'height': '100px' }} alt='Sorry' />
            )
        })
    : ""
}
</div> */}