import React, { useState, useEffect, useRef } from "react";
import avtar from "../Images/avtar.png";
import { io } from "socket.io-client";

const ChatAdmin = () => {
  
  let user = JSON.parse(localStorage.getItem("user"));

  const createConvo = async () => { 
    if (user) {
      if (user?._id !== "64f812e20714d7288931039d") {
        let res = await fetch("http://localhost:5000/conversations", {
          method: "POST",
          body: JSON.stringify({
            senderId: user?._id,
            receiverId: "64f812e20714d7288931039d",
          }),
          headers: {
            "Content-Type": "application/json",
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
              senderId: "64f812e20714d7288931039d",
              message: "Hello From Admin",
              receiverId: user?._id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const resData = await res.json();
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
  const [chatwith, setChatwith] = useState("");
  const [receiver, setReceiver] = useState("");
  const [cid, setCid] = useState("");
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);
  
  console.log(messages, "msgs");

  useEffect(() => {
    setSocket(io("http://localhost:5050"));
    // window.location.reload(false);
  }, []);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
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
      setMessages(
        (
          prev 
        ) => ({
          ...prev,
          messages: [
            ...prev.messages,
            { users: data.suser, message: data.message },
          ],
        })
      );
      console.log("after msg set");
    });
    return () => {};
  }, [socket]);
  const fetchConversations = async () => {
    const userId = JSON.parse(localStorage.getItem("user"));
    // const uid = JSON.parse(userId._id)
    const res = await fetch(
      `http://localhost:5000/conversations/${userId?._id}`,
      {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    // console.log(resData)
    setConversations(resData);
  };
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchMessage = async (conversationId, users) => {
    setChatwith(users.username);
    setCid(conversationId);
    const res = await fetch(
      `http://localhost:5000/messages/${conversationId}`,
      {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
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
      },
    });
    const resData = await res.json();

    if (resData) {
      setMsg("");
      console.log(resData);
    }
  };

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    fetchConversations();
  }, [conversations]);

  return (
    <div className="w-screen flex">
      <div className="w-[25%] border border-black h-screen  overflow-scroll ">
        <div className="flex justify-center my-8">
          <img src={avtar} width={50} height={50} />
          <div className="ml-4">
            <h1 className="text-2xl">{user.username}</h1>
          </div>
        </div>
        <hr />
        <div className="ml-10 ">
          <div>Messages</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ users, conversationId }) => {
                // console.log(users, conversationId);
                return (
                  <div
                    className="flex  item-center py-8 border-b border-b-gray-300  cursor-pointer"
                    onClick={() => {
                      fetchMessage(conversationId, users);
                    }}
                  >
                    <img src={avtar} width={50} height={50} />
                    <div className="ml-4">
                      <h1 className="text-2xl">{users.username}</h1>
                      <p>{users.email}</p>
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
      <div className="w-[50%] border border-black h-screen flex flex-col items-center">
        <div className="w-[75%] h-[80px] bg-cyan-300 mt-3 rounded-full flex items-center px-14">
          <div>
            <img src={avtar} width={50} height={50} />
          </div>
          <div className="ml-6">
            <h1 className="text-lg ">{chatwith}</h1>
            <p className="text-sm font-light  text-gray-600">online</p>
          </div>
        </div>
        <div className="h-[75%] border w-full overflow-scroll border-b">
          <div className="h-[1000px] px-10 py-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, users }) => {
                const userId = JSON.parse(localStorage.getItem("user"));
                // if(users.id===undefined) console.log("uni chirag")
                if (users?.id === userId?._id) {
                  return (
                    <>
                      <div className="max-w-[40%] bg-green-200 rounded-b-xl rounded-tr-xl py-4 ">
                        {message}
                      </div>
                      <div ref={messageRef}></div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <div className="max-w-[40%] bg-blue-200 rounded-b-xl rounded-tr-xl py-4 ml-auto">
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
          <div className="h-[25%] flex items-center w-full p-2 px-4 ">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={msg}
              placeholder="Type a message..."
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
            <div
              className={`ml-4 cursor-pointer ${!msg && "pointer-events-none"}`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send"
                width="44"
                height="44"
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
      <div className="w-[25%] border border-black h-screen"></div>
    </div>
  );
};

export default ChatAdmin;
