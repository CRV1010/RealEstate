import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Swiper from 'swiper';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '../Home/swiper.css';



const Comment = () => {
  const [comment, setComment] = useState([])
  const [modal1Open, setModal1Open] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"))
  const [userName, setUserName] = useState(user?.username);
  const [userComment, setUserComment] = useState("");

  const openModal = (propertyFor) => {
    localStorage.setItem("propertyFor", propertyFor);
    setModal1Open(true);
  };

  const closeModal1 = () => {
    setModal1Open(false);
  };

  const getComments = async () => {
    const result = await fetch("http://localhost:5000/show-comments", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      }
    })
    var data = await result.json();
    var myCommentData = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].uid);
      const result1 = await fetch("http://localhost:5000/getUserDetails", {
        method: "post",
        body: JSON.stringify({ _id: data[i].uid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      var data1 = await result1.json();
      // console.log(data1);
      myCommentData.push([data1?.image, data1?.username, data[i].comment, data[i].uid, data[i]._id]);

    }
    console.log(myCommentData);
    setComment(myCommentData);
    // console.log(comment);
  }

  useEffect(() => {
    getComments();
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      initialSlide: 1,
      autoplay: {
        delay: 5000, // Set the delay between slides in milliseconds
        disableOnInteraction: false, // Continue autoplay even when user interacts with slides
      },
      
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
     
    });

    return () => {
      swiper.destroy(); // Clean up Swiper when component is unmounted
    };
  }, []);


  const saveComment = async () => {
    const result = await fetch("http://localhost:5000/comment", {
      method: "post",
      body: JSON.stringify({ uid: user._id, comment: userComment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Your Comment is added...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getComments();
    setModal1Open(false);
  }

  const deleteComment = async (id) => {
    toast.warning("You are Deleting Comment...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    let data = await fetch(`http://localhost:5000/commentDelete/${id}`, {
      method: "delete",
    });
    data = await data.json();
    if (data) {
      getComments();
    }
  }



  return (
  
    <section>
      <div className="container px-5 py-6 mx-auto">
        <div className="lg:w-1/2 w-full mb-6">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Review
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <div>
        {comment ? (
          <div className="swiper mySwiper" >
            <div className="swiper-wrapper">
              {comment.map((commentDetails) => {
                return (
                  <div className="card swiper-slide  ">
                    <div className="card__image">
                      <img
                        alt="testimonial"
                        src={require(`../../Images/${commentDetails[0]}`)}
                        key={commentDetails[0]}
                        className=" border-4 p-3 border-indigo-500"
                      />
                    </div>

                    <div className="card__content">
                      <span className="card__title text-indigo-700  font-bold">{commentDetails[1]}</span>
                      <p className="card__text">{commentDetails[2]}</p>
                    </div>
                    {(() => {
                      if (
                        user?._id === commentDetails[3] ||
                        user?._id === "650b0d9532d958c9727bea89"
                      ) {
                        return (
                          <button
                            onClick={() => {
                              deleteComment(commentDetails[4]);
                            }}
                            className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700"
                          >
                            Delete
                          </button>
                        );
                      }
                    })()}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div> Sorry ! No Comment </div>
        )}
      </div>

      
      <div className="p-2 w-full">
      {user ? (
        <button
          onClick={() => {
            openModal("Sell");
          }}
          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Add Comment
        </button>
        )
            : (
              <div></div>
            )
        }
        {modal1Open && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white  rounded-lg w-1/3">
              <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                  Review
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
                  <div className="sm:col-span-3">

                    <label
                      for="name"
                      className="leading-7 font-medium text-sm text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      autoFocus
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    ></input>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="sm:col-span-3">
                    <label
                      for="message"
                      className="leading-7 font-medium text-sm text-gray-900"
                    >
                      Comment
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="px-20 pb-6">
                <button
                  onClick={saveComment}
                  className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        )}
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

    </section >
  );
};

export default Comment;
