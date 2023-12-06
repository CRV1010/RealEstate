import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import avtar from "../Images/avtar.png";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));
  const createConvo = async () => {
    if (user) {
      if (user?._id !== "650b0d9532d958c9727bea89") {
        let res = await fetch("http://localhost:5000/conversations", {
          method: "POST",
          body: JSON.stringify({
            senderId: user?._id,
            receiverId: "650b0d9532d958c9727bea89",
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        let result = await res.json();
        console.log(result);
        if (result) {
          console.log("Conversation Created");

          window.location.reload(false);

          const res = await fetch("http://localhost:5000/messages", {
            method: "POST",
            body: JSON.stringify({
              conversationId: result._id,
              senderId: "650b0d9532d958c9727bea89",
              message: "Hello From Admin",
              receiverId: user?._id,
            }),
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          });
          const resData = await res.json();
          if(!resData){
            toast.error("Your Token has expired... login again", {
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
            setTimeout(() => {
              localStorage.clear();
              navigate("/login");
            }, 7000);
          }
        }
      }
    }
    return () => {};
  };

  useEffect(() => {
    createConvo();

    // return () => {};
  }, []);

  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState({});
  const [chatwith, setChatwith] = useState();
  const [receiver, setReceiver] = useState("");
  const [cid, setCid] = useState("");
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);

  useEffect(() => {
    setSocket(io("http://localhost:5555"));
    // window.location.reload(false);
  }, []);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages?.messages]);

  useEffect(() => {
    console.log("uid:", user?._id);
    socket?.emit("addUser", user?._id);
    socket?.on("getUsers", (userslist) => {
      console.log("users :", userslist);
    });
    console.log("chirag");
    socket?.on("getMessage", (data) => {
      console.log("msg", data);
      console.log("vaghela");
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { users: data.suser, message: data.message },
        ],
      }));
      console.log("after msg set");
    });
    return () => {};
  }, [socket]);

  const fetchConversations = async () => {
    const userId = JSON.parse(localStorage.getItem("user"));
    // const uid = JSON.parse(userId._id)
    console.log("my Uid",userId._id);
    const res = await fetch(
      `http://localhost:5000/conversations/${userId?._id}`,
      {
        method: "GET",
        header: {
          "Content-Type": "application/json",
          // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const resData = await res.json();
    // console.log(resData)
    // if(!resData){
    //    setTimeout(() => {
    //      localStorage.clear();
    //      navigate("/login");
    //    }, 3000);
    // }
    // else{
      setConversations(resData);
    // }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchMessage = async (conversationId, users) => {
    setChatwith(users);
    setCid(conversationId);
    const res = await fetch(
      `http://localhost:5000/messages/${conversationId}`,
      {
        method: "GET",
        header: {
          "Content-Type": "application/json",
          // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const resData = await res.json();
    // if(!resData){
    //   setTimeout(() => {
    //     localStorage.clear();
    //     navigate("/login");
    //   }, 3000);
    // }
    // else{
      
    let rid = users?.id;
    setReceiver(rid);

    setMessages({ messages: resData, receiver: users });
  };

  const sendMessage = async (e) => {
    const userId = JSON.parse(localStorage.getItem("user"));
    console.log("cid", cid);
    console.log("sid", userId?._id);
    console.log("msg", msg);
    console.log("reciver", receiver);

    socket?.emit("sendMessages", {
      senderId: userId?._id,
      conversationId: cid,
      receiverId: receiver,
      message: msg,
    });
    const res = await fetch("http://localhost:5000/messages", {
      method: "POST",
      body: JSON.stringify({
        conversationId: cid,
        senderId: userId?._id,
        message: msg,
        receiverId: receiver,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const resData = await res.json();

    if (resData) {
      setMsg("");
      console.log(resData);
    }
    else{
        toast.error("Your Token has expired... login again", {
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
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 3000);
    }
  };

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    fetchConversations();
  }, [conversations]);

  return (
    <div
      className="py-6 px-20 h-[672px] rounded-xl"
      style={{
        background: "linear-gradient(to bottom, #5B9A8B 200px, #D8D9DA 0)",
      }}
    >
      <div className=" flex justify-center ">
        <div className="w-[30%] mb-6 overflow-y-scroll rounded-xl  bg-white ">
          <div
            className="flex px-5 py-3 align-middle "
            style={{ backgroundColor: "#F1EFEF" }}
          >
            <img
              src={require(`../Images/${user?.image}`)}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="px-3">
              <h1 className="text-xl text-center">{user?.username}</h1>
            </div>
          </div>
          <div className="px-5 bg-white ">
            <div className="py-0 my-0 ">
              {conversations.length > 0 ? (
                conversations.map(({ users, conversationId }) => {
                  return (
                    <div
                      className="flex  item-center py-4  border-b border-b-gray-300  cursor-pointer"
                      onClick={() => {
                        fetchMessage(conversationId, users);
                      }}
                    >
                      <img
                        src={require(`../Images/${users?.image}`)}
                        alt=""
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <h1 className=" text-xl">{users.username}</h1>
                        <p className=" text-base">{users.email}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center font-semibold text-lg">
                  No Conversation
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="w-[70%]  h-[618px] mb-5 flex flex-col rounded-tr-xl "
          style={{ backgroundColor: "#F1EFEF" }}
        >
          <div className="w-[70%] h-[60px]  mt-3 rounded-full flex mx-5 ">
            <div>
              {chatwith && (
                <img
                  src={require(`../Images/${chatwith?.image}`)}
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="ml-6">
              <h1 className="text-lg text-black">{chatwith?.username}</h1>
              <p className="text-sm font-light">{chatwith?.email}</p>
            </div>
          </div>
          <div
            className="h-[79%] border w-full overflow-y-scroll border-b"
            style={{ backgroundImage: "url(../chatBg.png)" }}
          >
            <div className="h-[1000px] px-10 py-14 my-0">
              {messages?.messages?.length > 0 ? (
                messages.messages.map(({ message, users }) => {
                  const userId = JSON.parse(localStorage.getItem("user"));
                  // if(users.id===undefined) console.log("uni chirag")
                  if (users?.id === userId?._id) {
                    return (
                      <>
                        <div
                          className="max-w-[40%] bg-slate-50 px-3  rounded-b-xl rounded-tr-xl py-2 my-5 "
                          style={{ backgroundColor: "#AED6F1" }}
                        >
                          {message}
                        </div>
                        <div ref={messageRef}></div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div
                          className="max-w-[40%]  px-3 rounded-b-xl rounded-tl-xl py-2 my-5 ml-auto"
                          style={{ backgroundColor: "#B0D9B1" }}
                        >
                          {message}
                        </div>
                        <div ref={messageRef}></div>
                      </>
                    );
                  }
                })
              ) : (
                <div className="text-center text-lg font-semibold mt-24">
                  No Messages
                </div>
              )}
            </div>
          </div>
          {chatwith && (
            <div
              className="flex items-center w-full p-2 rounded-br-xl px-6"
              style={{ backgroundImage: "url(../chatBg.png)" }}
            >
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900  
            text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={msg}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              />
              <div
                className={`ml-4 cursor-pointer ${
                  !msg && "pointer-events-none"
                }`}
                onClick={() => sendMessage()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-send"
                  width="44"
                  height="35"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 14l11 -11" />
                  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
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
    </div>
  );
};

export default ChatAdmin;
