import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUsers = () => {
    const [userlist, setUserlist] = useState([])
    useEffect(() => {
      getAllUsers();
    }, []);
    const getAllUsers = async () =>{
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

    const DeleteUser = async(id) =>{
    
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
        resData.map(async (conversationId)=>{
            console.log("conId",conversationId?.conversationId);
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
    

  return (
    <div>
      <h2 className="text-center ">All Users Detalis</h2>
      <table className="table-fixed justify-center ">
        <thead>
          <tr>
            <th className="border border-slate-300">Sr No.</th>
            <th className="border border-slate-300">Username</th>
            <th className="border border-slate-300">Image</th>
            <th className="border border-slate-300">Email</th>
            <th className="border border-slate-300">Phone</th>
            <th className="border border-slate-300">DOB</th>
            <th className="border border-slate-300">Operation</th>
          </tr>
        </thead>
        <tbody>
          {userlist.length > 0 ? (
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
                <h1>No Users</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers
