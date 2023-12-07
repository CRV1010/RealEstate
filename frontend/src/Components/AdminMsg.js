import React,{useState,useEffect} from 'react'

const AdminMsg = () => {
    const [userMessage, setUserMessage] = useState([])
    let data;
    useEffect(() => {
        getMessages();
    },[])
    
    const getMessages =async() => {
        console.log("fetching msg")
        const result = await fetch("http://localhost:5000/user-message", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
    data = await result.json();
    setUserMessage(data)
    }

  return (
    <div class="flex">
      {userMessage ?
       (userMessage?.map((usermsg, index) => {
            return (
              <div
                key={index}
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {usermsg?.username}
                </h5>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {usermsg?.email}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  {usermsg?.message}
                </p>
              </div>
            );
          }))
        : ""}
    </div>
  );
}

export default AdminMsg
