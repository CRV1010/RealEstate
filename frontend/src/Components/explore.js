import React, { useEffect, useState } from 'react'

export default function () {

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
            {database ?
                database.map(
                    (ArrayOfObjects, index) => {
                        const imageNames = ArrayOfObjects.image;
                        return (
                            <>
                                <div key={ArrayOfObjects._id}>
                                    <h1>{ArrayOfObjects.type}</h1>
                                    <h1>{ArrayOfObjects.propertyFor}</h1>
                                    <h1>{ArrayOfObjects.City}</h1>
                                    <h1>{ArrayOfObjects.State}</h1>
                                    <h1>{ArrayOfObjects.society}</h1>
                                    <h1>{ArrayOfObjects.zone}</h1>
                                    <h1>{ArrayOfObjects.pincode}</h1>
                                    <h1>{ArrayOfObjects.area}</h1>
                                    <h1>{ArrayOfObjects.price}</h1>
                                    <h1>{ArrayOfObjects.rooms}</h1>
                                </div>
                                <div key={ArrayOfObjects._id}>
                                    {ArrayOfObjects.image ?
                                        ArrayOfObjects.image.map((imageName) => {
                                            return (
                                                <img src={require(`../Images/${imageName}`)} key={imageName} style={{ 'width': '220px', 'height': '100px' }} alt='Sorry' />
                                            )
                                        })
                                        : ""
                                    }
                                    <br /><br />
                                </div>
                            </>
                        )
                    }
                )
                : ""
            }
        </>
    )
}

