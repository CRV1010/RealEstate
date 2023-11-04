import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProperty = () => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //   const auth = localStorage.getItem("user");
    //   if (!auth) {
    //     navigate("/login");
    //   }
    // }, []);
    const [database, setdatabase] = useState([]);
   
    useEffect(() => {
      getData();
    }, []);

    async function getData () {
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
    
    const DeleteProperty = async (id) =>{
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
           console.log("delete Id",id);
         let dataprop = await fetch(`http://localhost:5000/property/${id}`, {
           method: "delete",
           headers: {
             authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
           }
         });
         dataprop = await dataprop.json();
         if (dataprop) {
           // alert("Record Deleted")
           getData();
         }
    }

  return (
    <div>
      <h2 className="text-center ">All Property Detalis</h2>
      <table className="table-fixed justify-center ">
        <thead>
          <tr>
            <th className="border border-slate-300">Sr No.</th>
            <th className="border border-slate-300">Owner</th>
            <th className="border border-slate-300">Property Type</th>
            <th className="border border-slate-300">Property For</th>
            <th className="border border-slate-300">Image</th>
            <th className="border border-slate-300">Address</th>
            <th className="border border-slate-300">Facility</th>
            <th className="border border-slate-300">Price</th>
            <th className="border border-slate-300">Operation</th>
          </tr>
        </thead>
        <tbody>
          {database.length ? (
            database.map((ArrayOfObjects, index) => (
              <tr key={index}>
                <td className="border border-slate-300">{index + 1}</td>
                <td className="border border-slate-300">
                  {ArrayOfObjects.owner}
                </td>
                <td className="border border-slate-300">
                  {ArrayOfObjects.type}
                </td>
                <td className="border border-slate-300">
                  {ArrayOfObjects.propertyFor}
                </td>
                <td className="border border-slate-300">
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
                <td className="border border-slate-300">
                  {ArrayOfObjects.society}, {ArrayOfObjects.zone},{" "}
                  {ArrayOfObjects.City}, {ArrayOfObjects.State}.{" "}
                </td>
                <td className="border border-slate-300">
                  {ArrayOfObjects.rooms} BHK
                </td>
                <td className="border border-slate-300">
                  ₹ {ArrayOfObjects.price}
                </td>
                <td className="border border-slate-300">
                  <button
                    onClick={() => DeleteProperty(ArrayOfObjects._id)}
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
  );
};

export default AdminProperty;
