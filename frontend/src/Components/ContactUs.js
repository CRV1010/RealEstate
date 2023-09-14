import React from "react";

const ContactUs = () => {
    return (
        <div className="antialiased bg-white-100 m-5">
            <div className="flex w-full min-h-screen justify-center items-center">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-cyan-700 w-full max-w-4xl p-8 
                    md:p-12 rounded-xl shadow-lg text-white overflow-hidden">
                    <div className="flex flex-col space-y-8 justify-between">
                        <div>
                            <h1 className="font-bold text-4xl tracking-wide">
                                Contact Us
                            </h1>
                            <p className="pt-2 text-cyan-100 text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, voluptatum.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-6">
                            <div className="inline-flex space-x-2 items-center">
                                <ion-icon
                                    name="call"
                                    className="text-teal-300 text-xl"
                                ></ion-icon>
                                <span>+(123) 456 7890</span>
                            </div>
                            <div className="inline-flex space-x-2 items-center">
                                <ion-icon
                                    name="mail"
                                    className="text-teal-300 text-xl"
                                ></ion-icon>
                                <span>sscrpmsu@gmail.com</span>
                            </div>
                            <div className="inline-flex space-x-2 items-center">
                                <ion-icon
                                    name="location"
                                    className="text-teal-300 text-xl"
                                ></ion-icon>
                                <span>Genda Circle, Alkapuri, Vadodara, Gujarat, 390002</span>
                            </div>
                        </div>
                        <div className="flex space-x-4 text-lg">
                            <a href="#">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="#">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a href="#">
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>
                            <a href="#">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute z-0 w-40 h-40 bg-teal-400 rounded-full -right-28 -top-28"></div>
                        <div className="absolute z-0 w-40 h-40 bg-teal-400 rounded-full -left-28 -bottom-16"></div>
                        <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-64">
                            <form action="" className="flex flex-col space-y-4">
                                <div>
                                    <label htmlFor="" className="text-sm">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="ring ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none 
                                        focus:ring-2 focus:ring-teal-300" />
                                </div>
                                <div>
                                    <label htmlFor="" className="text-sm">Your Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Your Email Address"
                                        className="ring ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none 
                                        focus:ring-2 focus:ring-teal-300" />
                                </div>
                                <div>
                                    <label htmlFor="" className="text-sm">Message</label>
                                    <textarea
                                        placeholder="Message"
                                        rows="4"
                                        className="ring ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none 
                                        focus:ring-2 focus:ring-teal-300" >
                                    </textarea>
                                </div>
                                <button className="inline-block self-end bg-cyan-700 text-white font-bold rounded-lg 
                                px-6 py-2  uppercase text-sm">
                                    SEND MESSAGES
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;