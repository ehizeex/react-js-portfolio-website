import React, { useEffect, useState } from "react";

import imgBack from "../../../src/images/im4.jpg";
import load1 from "../../../src/images/load2.gif";
import axios from "axios";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import { toast } from "react-toastify";
import "./ContactMe.css";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import Footer from "../Footer/Footer";
import Typical from "react-typical";

const ContactMe = (props) => {
  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;

    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(
    fadeInScreenHandler
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false);

  useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);

  // handle inputs
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = {
        name,
        email,
        message,
      };

      setBool(true);

      const res = await axios.post(`/contact`, data);

      if (name.length === 0 || email.length === 0 || message.length === 0) {
        setBanner(res.data.msg);
        toast.error(res.data.msg);
        setBool(false);
      } else if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setBool(false);

        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container" id={props.id || ""}>
      <ScreenHeading
        subHeading={"Let's Keep In Touch"}
        title={props.screenName ? props.screenName : ""}
      />
      <div className="central-form">
        <div className="col">
          <h2 className="title">
        

                {" "}
                <Typical
                  loop={Infinity}
                  steps={[
                    "Get in Touch 🤝",
                    1000,
                    
               
                
                  ]}
                />
            
        </h2>
          <a href="https://web.facebook.com/choc.prince.1">
            <i className="fa fa-facebook-square" />
          </a>
          <a href="">
            <i className="fa fa-google-plus-square" />
          </a>
          <a href="https://www.instagram.com/instructor_ehizeex/">
            <i className="fa fa-instagram" />
          </a>
          <a href="https://www.youtube.com/channel/UCSSr5ZDFbilpZ592_ycoAwA">
            <i className="fa fa-youtube-square" />
          </a>
          <a href="https://twitter.com/Ehiedu_baba">
            <i className="fa fa-twitter" />
          </a>
        </div>

        <div className="back-form">
          <div className="img-back">
            <h4>Send your message</h4>
            <img src={imgBack} alt="" />
          </div>
          <form onSubmit={formSubmit}>
            <p>{banner}</p>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleName} value={name} />

            <label htmlFor="email">Email</label>
            <input type="email" onChange={handleEmail} value={email} />

            <label htmlFor="message">Message</label>
            <textarea
              type="text"
              onChange={handleMessage}
              value={message}
              name="message"
            />

            <div className="send-btn">
              <button type="submit">
                Send <i className="fa fa-paper-plane"></i>
                {bool ? (
                  <b className="load">
                    <img src={load1} alt="load1" />
                  </b>
                ) : (
                  ""
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactMe;
