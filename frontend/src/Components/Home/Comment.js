import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";


const Comment = () => {
    const [comment, setComment] = useState([])
    const getComments = async () =>{
         const result = await fetch("http://localhost:5000/show-comments", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
        var data = await result.json();
        var myCommentData = [];
        for(let i=0;i<data.length;i++){
          console.log(data[i].uid);
          const result1 = await fetch("http://localhost:5000/getUserDetails", {
            method: "post",
            body: JSON.stringify({ _id: data[i].uid }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          var data1 = await result1.json();
          console.log(data1);
            myCommentData.push([data1?.image, data1?.username, data[i].comment]);
            
        }
        console.log(myCommentData);
        setComment(myCommentData);
        // console.log(comment);
    }

    useEffect(()=>{
        getComments();
    },[]);

    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-1/2 w-full mb-6">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Review
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          {comment ? (
            <div className="flex flex-wrap -m-4">
              {
                comment.map((commentDetails) => {
                console.log("com", commentDetails);
                return (
                  <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                    <div className="h-full text-center">
                      <img
                        alt="testimonial"
                        className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                        src={require(`../../Images/${commentDetails[0]}`)}
                        key = {commentDetails[0]}
                      />
                      <p className="leading-relaxed">
                        {commentDetails[2]}
                      </p>
                      <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                      <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                        {commentDetails[1]}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div> Sorry ! No Comment </div>
          )}
        </div>
      </section>
    );
};

export default Comment;
