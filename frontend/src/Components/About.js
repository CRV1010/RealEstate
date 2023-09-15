import React from 'react'
import './About.css'
import focus from '../Images/focus.jpg'
import parthiv from '../Images/parthiv.jpg'
import chirag from '../Images/chirag.jpg'
import sanket from '../Images/sanket.jpg'
import ruchir from '../Images/ruchir.jpg'
import sahil from '../Images/sahil.jpg'

function About() {
    return (
      <div className="bg-slate-100">
        <div id="poster">
          <div id="poster-welcome">
            {/* <h1 id="poster-heading">
              <strong> Welcome to our Home Marketplace !!! </strong>
            </h1>
            <p id="poster-text">
              We help people to get home. Whether selling, buying or renting.
              Our customers can get into their next home with speed, certainty
              and ease...
            </p> */}
          </div>
        </div>

        <div>
          <h1 id="focus">
            <strong style={{ "margin-left": "500px" }}>
              {" "}
              Our Focus On...{" "}
            </strong>
          </h1>
          <div id="focusContainer">
            <p id="focusText">
              We are mainly focus on providing user perspective details. At Our
              Home Marketplace, we are dedicated to simplifying the process of
              buying, selling, or renting properties. Whether you're a
              homeowner, a buyer or a tenant our platform offers you a seamless
              and user-friendly experience to meet your real estate needs.
            </p>
            <img src={focus} alt="Focus" id="focusImg" />
          </div>
        </div>

        <div id="vmSection" className="container-fluid">
          <h1 id="vm">
            <strong style={{ "margin-left": "500px" }}>
              {" "}
              Vision & Mission{" "}
            </strong>
          </h1>
          <div id="focusContainer">
            <div className="container cards">
              <div className="row">
                <div className="col-md-6">
                  <div className="card" id="card">
                    <div className="card-body">
                      <h2 className="card-title">
                        <strong style={{ fontSize: "30px" }}> Vision </strong>
                      </h2>
                      <i className="fa fa-paper-plane" id="icon"></i> <br />
                      <br /> <br />
                      <p className="card-text">
                        To revolutionize the Real Estate industry by creating a
                        platform that empowers individuals and businesses to
                        make informed property decisions with ease and happily.
                        We envision a future where finding the perfect home or
                        investment property is an effortless, transparent, and
                        delightful experience for everyone. Our commitment to
                        innovation, integrity, expertise and customer-centricity
                        will redefine the way people buy, sell, rent and invest
                        in real estate, fostering vibrant communities and
                        enabling dreams of homeownership and financial growth
                        with backup.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card" id="card">
                    <div className="card-body">
                      <h2 className="card-title">
                        <strong style={{ fontSize: "30px" }}> Mission </strong>
                      </h2>
                      <i className="fa fa-house-signal" id="icon"></i> <br />
                      <br /> <br />
                      <p className="card-text">
                        Our mission is to provide unparalleled real estate
                        services driven by integrity, expertise, and a
                        relentless commitment to our clients' success. We
                        prioritize transparency and trust in every transaction,
                        offering personalized solutions backed by
                        industry-leading knowledge. We aim to be a trusted
                        partner in your property journey. Beyond transactions,
                        we actively engage in community initiatives, support
                        local causes, and advocate for sustainable development.
                        Our success is synonymous with the satisfaction of our
                        clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="teamSection">
          <h1 id="team">
            <strong> Our Team </strong>
          </h1>
          <div id="teamFlex">
            <div className="container" id="teamContainer">
              <div className="box">
                <div className="imgBox">
                  <a href="https://www.linkedin.com/in/parthiv-dholakiya-329084207/">
                    <img src={parthiv} alt="" />
                  </a>
                </div>
                <div className="content">
                  <h2>
                    PARTHIV DHOLAKIYA <br />
                    <span>HR MANAGER</span>
                  </h2>
                </div>
              </div>
              <div className="box">
                <div className="imgBox">
                  <a href="https://www.linkedin.com/in/chirag-vaghela-55799720a/">
                    <img src={chirag} alt="" />
                  </a>
                </div>
                <div className="content">
                  <h2>
                    CHIRAG VAGHELA <br />
                    <span>CEO & FOUNDER</span>
                  </h2>
                </div>
              </div>
              <div className="box">
                <div className="imgBox">
                  <a href="https://www.linkedin.com/in/parthiv-dholakiya-329084207/">
                    <img src={sanket} alt="" />
                  </a>
                </div>
                <div className="content">
                  <h2>
                    SANKET SHAH <br />
                    <span>MANAGER</span>
                  </h2>
                </div>
              </div>
              <div className="box">
                <div className="imgBox">
                  <a href="https://www.linkedin.com/in/parthiv-dholakiya-329084207/">
                    <img src={ruchir} alt="" />
                  </a>
                </div>
                <div className="content">
                  <h2>
                    RUCHIR PARMAR <br />
                    <span>CO-FOUNDER</span>
                  </h2>
                </div>
              </div>
              <div className="box">
                <div className="imgBox">
                  <a href="http://www.linkedin.com/in/sahil-dharaviya-856869225">
                    <img src={sahil} alt="" />
                  </a>
                </div>
                <div className="content">
                  <h2>
                    SAHIL DHARAVIYA <br />
                    <span>MANAGING DIRECTOR</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default About
