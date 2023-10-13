import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminPage = () => {

    const [modalAdminUser, setModalAdminUser] = useState(false);
    const [modalAdminProperty, setModalAdminProperty] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [database, setdatabase] = useState([]);

    const openModal = () => {
        setModalAdminUser(true);
    };

    const closeModal1 = () => {
        setModalAdminUser(false);
    };

    const openModal2 = () => {
        setModalAdminProperty(true);
    };

    const closeModal2 = () => {
        setModalAdminProperty(false);
    };


    useEffect(() => {
        getAllUsers();
        getData();
    }, []);

    // Admin User
    const getAllUsers = async () => {
        const result = await fetch("http://localhost:5000/getAllUsers", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        var data = await result.json();

        setUserlist(data);
        console.log(data);
    }

    const DeleteUser = async (id) => {

        toast.error("You are Deleting User,his Conversations and all its property...", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        // Delete Conversations

        const res = await fetch(
            `http://localhost:5000/conversations/${id}`,
            {
                method: "GET",
                header: {
                    "Content-Type": "application/json",
                },
            }
        );
        const resData = await res.json();
        console.log(resData);
        resData.map(async (conversationId) => {
            console.log("conId", conversationId?.conversationId);
            let data = await fetch(
                `http://localhost:5000/conversations/${conversationId?.conversationId}`,
                {
                    method: "delete",
                    // headers: {
                    //   authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    // }
                }
            );
        })


        // delete Property
        console.log(id);
        let data = await fetch(
            `http://localhost:5000/user-property-delete/${id}`,
            {
                method: "delete",
                // headers: {
                //   authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                // }
            }
        );
        data = await data.json();
        console.log(data);

        // deleting user
        let deluser = await fetch(`http://localhost:5000/delete-user/${id}`, {
            method: "delete",
            // headers: {
            //   authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            // }
        });
        deluser = await deluser.json();
        console.log(deluser);

        getAllUsers();
    }


    // Admin Property
    async function getData() {
        const result = await fetch("http://localhost:5000/get-data", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        var data = await result.json();
        //   var i=0;
        //   var resu = await data.map(async(d)=>{
        //     const uname = await fetch("http://localhost:5000/getUserDetails", {
        //       method: "post",
        //       body: JSON.stringify({ _id:d.sellerId }),
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     });
        //     var userdetail = await uname.json();
        //     d = {...d,"owner":userdetail.username}
        //   })
        console.log(data);
        setdatabase(data);
    }

    const DeleteProperty = async (id) => {
        toast.error(
            "You are Deleting property...",
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                rtl: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
        console.log("delete Id", id);
        let dataprop = await fetch(`http://localhost:5000/property/${id}`, {
            method: "delete",
            // headers: {
            //   authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            // }
        });
        dataprop = await dataprop.json();
        if (dataprop) {
            // alert("Record Deleted")
            getData();
        }
    }

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-wrap -m-4 justify-center">
                    <div class="p-4 md:w-1/3">
                        <button onClick={() => { openModal(); }}>
                            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:scale-105">
                                <img class="p-4 w-full object-cover object-center" src="../Admin/AdminUser-2.jpg" alt="blog" />
                                <div class="p-6">
                                    <h2 class="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">{userlist.length}</h2>
                                    <h1 class="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-indigo-500 hover:text-xl">The Catalyzer</h1>
                                </div>
                            </div>
                        </button>
                        {modalAdminUser && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div className="bg-white  rounded-lg w-auto">
                                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                                        <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                                            User Details
                                        </span>
                                        <button
                                            onClick={closeModal1}
                                            className="text-white font-bold text-xl px-3"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="justify-center px-20 py-6">
                                        <div className="mb-4">
                                            <div className="sm:col-span-3 rounded-2xl ">
                                                <table className="table-fixed justify-center shadow-xl overflow-y-scroll  block h-[400px]">
                                                    <thead className=" bg-indigo-400 rounded text-white shadow-md">
                                                        <tr>
                                                            <th className="border border-slate-300 p-2">Sr No.</th>
                                                            <th className="border border-slate-300 p-2">Username</th>
                                                            <th className="border border-slate-300 p-2">Image</th>
                                                            <th className="border border-slate-300 p-2">Email</th>
                                                            <th className="border border-slate-300 p-2">Phone</th>
                                                            <th className="border border-slate-300 p-2">DOB</th>
                                                            <th className="border border-slate-300 p-2">Operation</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=" text-center px-5 mx-10">
                                                        {userlist.length > 0 ? (
                                                            userlist.map((userdetail, index) =>
                                                                userdetail._id !== "650b0d9532d958c9727bea89" ? (
                                                                    <tr key={index}>
                                                                        <td className="border border-slate-300">{index}</td>
                                                                        <td className="border border-slate-300 px-5">
                                                                            {userdetail?.username}
                                                                        </td>
                                                                        <td className="border border-slate-300 ">
                                                                            <img
                                                                                src={require(`../Images/${userdetail?.image}`)}
                                                                                // onerror="fallbackImage()"
                                                                                // alt={ProfileImg}
                                                                                alt=""
                                                                                className="w-20 h-20"
                                                                            />
                                                                        </td>
                                                                        <td className="border border-slate-300 px-5">
                                                                            {userdetail?.email}
                                                                        </td>
                                                                        <td className="border border-slate-300 px-5">
                                                                            {userdetail?.phone}
                                                                        </td>
                                                                        <td className="border border-slate-300 px-5">
                                                                            {userdetail?.dob?.substring(0, 10)}
                                                                        </td>
                                                                        <td className="border border-slate-300 justify-center text-center">
                                                                            <button
                                                                                onClick={() => DeleteUser(userdetail._id)}
                                                                                className="bg-red-500 text-white font-semibold mx-5 mr-6 px-5 py-2 rounded hover:bg-indigo-700 "
                                                                            >
                                                                                Delete
                                                                            </button>{" "}
                                                                        </td>
                                                                        <ToastContainer
                                                                            position="top-right"
                                                                            autoClose={5000}
                                                                            hideProgressBar={false}
                                                                            newestOnTop={false}
                                                                            closeOnClick
                                                                            rtl={false}
                                                                            pauseOnFocusLoss
                                                                            draggable
                                                                            pauseOnHover
                                                                            theme="light"
                                                                        />
                                                                    </tr>
                                                                ) : null
                                                            )
                                                        ) : (
                                                            <tr>
                                                                <td>
                                                                    <h1>No Users</h1>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div class="p-4 md:w-1/3">
                        <button onClick={() => { openModal2(); }}>
                            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:scale-105">
                                <img class=" w-full object-cover object-center" src="../Admin/AdminProperty-2.webp" alt="blog" />
                                <div class="p-6">
                                    <h2 class="tracking-widest text-center text-lg title-font font-medium text-gray-400 mb-1">{database.length}</h2>
                                    <h1 class="title-font text-lg text-center font-semibold text-gray-900 mb-3 hover:text-indigo-500 hover:text-xl">Property Details</h1>
                                </div>
                            </div>
                        </button>
                        {modalAdminProperty && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div className="bg-white  rounded-lg w-auto">
                                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                                        <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                                            All Property Detalis
                                        </span>
                                        <button
                                            onClick={closeModal2}
                                            className="text-white font-bold text-xl px-3"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="justify-center px-20 py-6">
                                        <div className="mb-4">
                                            <div className="sm:col-span-3 rounded-2xl ">
                                                <table className="table-fixed justify-center text-center shadow-xl overflow-y-scroll  block h-[400px]">
                                                    <thead className=" bg-indigo-400 rounded text-white shadow-md">
                                                        <tr>
                                                            <th className="border border-slate-300 p-2">Sr No.</th>
                                                            <th className="border border-slate-300 p-2">Owner</th>
                                                            <th className="border border-slate-300 p-2">Property Type</th>
                                                            <th className="border border-slate-300 p-2">Property For</th>
                                                            <th className="border border-slate-300 p-2">Image</th>
                                                            <th className="border border-slate-300 p-2">Address</th>
                                                            <th className="border border-slate-300 p-2">Facility</th>
                                                            <th className="border border-slate-300 p-2">Price</th>
                                                            <th className="border border-slate-300 p-2">Operation</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody text-center px-5 mx-10>
                                                        {database.length ? (
                                                            database.map((ArrayOfObjects, index) => (
                                                                <tr key={index}>
                                                                    <td className="border border-slate-300 px-3">{index + 1}</td>
                                                                    <td className="border border-slate-300 px-2">
                                                                        {ArrayOfObjects.owner}
                                                                    </td>
                                                                    <td className="border border-slate-300 px-2">
                                                                        {ArrayOfObjects.type}
                                                                    </td>
                                                                    <td className="border border-slate-300 px-2">
                                                                        {ArrayOfObjects.propertyFor}
                                                                    </td>
                                                                    <td className="border border-slate-300 ">
                                                                        {ArrayOfObjects.image && ArrayOfObjects.image.length > 0 ? (
                                                                            <img
                                                                                src={require(`../Images/${ArrayOfObjects.image[0]}`)}
                                                                                key={ArrayOfObjects.image[0]}
                                                                                alt="not fetched"
                                                                                className="w-20 h-20"
                                                                            />
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                    </td>
                                                                    <td className="border border-slate-300 px-2 w-60">
                                                                        {ArrayOfObjects.society}, {ArrayOfObjects.zone},{" "}
                                                                        {ArrayOfObjects.City}, {ArrayOfObjects.State}.{" "}
                                                                    </td>
                                                                    <td className="border border-slate-300 px-2">
                                                                        {ArrayOfObjects.rooms} BHK
                                                                    </td>
                                                                    <td className="border border-slate-300 px-2">
                                                                        ₹ {ArrayOfObjects.price}
                                                                    </td>
                                                                    <td className="border border-slate-300 justify-center">
                                                                        <button
                                                                            onClick={() => DeleteProperty(ArrayOfObjects._id)}
                                                                            className="bg-red-500 text-white font-semibold px-5 mx-4 py-2 rounded hover:bg-indigo-700 "
                                                                        >
                                                                            Delete
                                                                        </button>{" "}
                                                                    </td>
                                                                    <ToastContainer
                                                                        position="top-right"
                                                                        autoClose={5000}
                                                                        hideProgressBar={false}
                                                                        newestOnTop={false}
                                                                        closeOnClick
                                                                        rtl={false}
                                                                        pauseOnFocusLoss
                                                                        draggable
                                                                        pauseOnHover
                                                                        theme="light"
                                                                    />
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td>No Property</td>
                                                            </tr>
                                                        )}
                                                        {/* {userlist.length > 0 ? (
            userlist.map((userdetail, index) =>
              userdetail._id !== "650b0d9532d958c9727bea89" ? (
                <tr key={index}>
                  <td className="border border-slate-300">{index}</td>
                  <td className="border border-slate-300">
                    {userdetail?.username}
                  </td>
                  <td className="border border-slate-300">
                    <img
                      src={require(`../Images/${userdetail?.image}`)}
                      // onerror="fallbackImage()"
                      // alt={ProfileImg}
                      alt=""
                      className="w-20 h-20"
                    />
                  </td>
                  <td className="border border-slate-300">
                    {userdetail?.email}
                  </td>
                  <td className="border border-slate-300">
                    {userdetail?.phone}
                  </td>
                  <td className="border border-slate-300">
                    {userdetail?.dob?.substring(0, 10)}
                  </td>
                  <td className="border border-slate-300">
                    <button
                      onClick={() => DeleteUser(userdetail._id)}
                      className="bg-red-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700"
                    >
                      Delete
                    </button>{" "}
                  </td>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td>
                <h1>No Property</h1>
              </td>
            </tr>
          )} */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AdminPage;
