import React, { useEffect, useState } from 'react'
import './Profile.css'
import ProfileImg from './../Images/focus.jpg';

export default function (props) {

  var user = localStorage.getItem("user");
  var _id = JSON.parse(user)._id;

  const [UserDetails, setUserDetails] = useState();
  const [propertyDetails, setPropertyDetails] = useState();

  useEffect(() => {
    getUserData();
    getPropertyData();
  }, [])

  async function getUserData() {
    const result = await fetch("http://localhost:5000/getUserDetails", {
      method: "post",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    var data = await result.json();
    setUserDetails(data)
  }

  async function getPropertyData() {
    const result = await fetch("http://localhost:5000/getPropertyDetails", {
      method: "post",
      body: JSON.stringify({ sellerId : _id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await result.json();
    setPropertyDetails(data);
    console.log(data)
  }

  return (
    <div>
      {
        UserDetails ?
          <div className="mainProfile">
            <div className="left-section lsbackground">
              <img src={ProfileImg} alt="Your Image" className='roundImg roundImageHover'/>
              <h1 id='proUName' className='proUNameTextColor'><strong>{UserDetails.username}</strong></h1>
              <h2 id='proField' className='proFieldHover'> 
                <strong>
                  Email: <input type="text" value={UserDetails.email} id='proEmail' disabled/>
                </strong> 
              </h2>
              <h2 id='proField' className='proFieldHover'><strong>Phone: {UserDetails.phone}</strong></h2>
              <div id='proUpdate'>
                <button id='proUpdateBtn'> Update </button>                   
              </div>
            </div>

            <div className="right-section">
              <h1 id='proHeading'> <i className='fa fa-star'></i> Your Properties To Sell <i className='fa fa-star'></i> </h1>
              <div className="mainExplore" style={{'maxWidth': '80%'}}>
                <ul className="cardsExplore" style={{'grid-template-columns': 'repeat(auto-fill, minmax(calc(50% - 3rem), 1fr))', 'gap': '4rem'}}>
                    {propertyDetails ?
                        propertyDetails.map(
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
                                                    <div id='propertyBtn'>
                                                    <button className='profilePropertyBtn' style={{'backgroundColor': 'green'}}> Update </button>
                                                    <button className='profilePropertyBtn' style={{'backgroundColor': 'red'}}> Delete </button>
                                                    </div>
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
            </div>
          </div>
        : 
          <div> Sorry ! Data is not Fetched... </div>
      }
    </div>
  )
}