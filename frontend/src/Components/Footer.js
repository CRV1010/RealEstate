import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font mt-10">

      <hr class="border-1 border-gray-400 bg-gray-400" />

      <div class="container px-5 py-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div class="container mx-auto flex flex-wrap flex-col md:flex-row justify-center items-center">
          <div class="flex flex-wrap text-xl flex-row align-center list-none">
            <li class="ml-5">
              <a href="./about" class="text-gray-600 hover:text-blue-800">About</a>
            </li>
            <li class="ml-5">
              <a href="./contact" class="text-gray-600 hover:text-blue-800">Contact</a>
            </li>
            <li class="ml-5">
              <a href="#" class="text-gray-600 hover:text-blue-800">Research</a>
            </li>
            <li class="ml-5">
              <a href="#" class="text-gray-600 hover:text-blue-800">Help</a>
            </li>
            <li class="ml-5">
              <a href="./searchbar" class="text-gray-600 hover:text-blue-800">Map</a>
            </li>
            <li class="ml-5">
              <a href="./sell" class="text-gray-600 hover:text-blue-800">Sell</a>
            </li>
            <li class="ml-5">
              <a href="./explore" class="text-gray-600 hover:text-blue-800">Explore</a>
            </li>
            <li class="ml-5">
              <a href="#" class="text-gray-600 hover:text-blue-800">Help</a>
            </li>
          </div>
        </div>
      </div>


      <hr class="border-1 border-gray-400 bg-gray-400" />

      <div className="items-center justify-center flex flex-wrap flex-row sm:flex-row mx-32 my-5">
        <p lassName="text-center text-black-100 text-sm">Our Group is committed to ensuring digital accessibility for individuals with disabilities. We are
          continuously working to improve the accessibility of our web experience for everyone, and we welcome
          feedback and accommodation requests. If you wish to report an issue or seek an accommodation, please
          <a href="./contact" className="text-blue-900"> let us know.</a>
        </p>
      </div>

      <hr class="border-1 border-gray-400 bg-gray-400" />

      <div className="mt-4 bg-white-100">
        <div className="container mx-auto items-center justify-center flex flex-wrap flex-col sm:flex-row">
          <span className="inline-flex sm:mt-0 mt-2 ml-4 justify-center sm:justify-start">
            <img
              src="deal.gif"
              alt=""
              className="ml-4 w-12 h-12 bg-white-500"
            />
            <Link to="/home">
              <span className="ml-2 w-12 h-12 py-4 text-2xl">Real Estate</span>
            </Link>
            <p className="ml-5 mt-2">Follow Us :</p>
            <a className="text-blue-500" href="https://www.facebook.com">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-2 text-blue-500" href="https://www.twitter.com">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-blue-500" href="https://www.instagram.com">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-blue-500" href="https://www.linkedin.com">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-8 h-8" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
          <p className="text-gray-500 ml-5 text-sm text-center sm:text-center">© 2023 Real Estate —
            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@knyttneve</a>
          </p>
        </div>
      </div>
      <br />
      <div>
        <img src="footer.png" alt="footer" className="w-full h-72 opacity-75" />
      </div>
    </footer>
  );
};

export default Footer;