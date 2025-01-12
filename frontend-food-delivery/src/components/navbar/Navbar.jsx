import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [menuVisible, setMenuVisible] = useState(false); // State to toggle the menu visibility
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); //key name
    setToken("");
    navigate("/");
  };

  const location = useLocation();
  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigation = (path, sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    // Handle scrolling when navigating back to home page
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);
    }
  }, [location]);

  return (
    <div className="navbar">
      <Link to="./" onClick={() => setMenu("")}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      {/* Hamburger icon for mobile screens */}
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <img id="menu-bar" src={assets.menu_bar_8} alt="Menu" />
      </div>

      <ul className={`navbar-menu ${menuVisible ? "show" : ""}`}>
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#"
          onClick={() => {
            setMenu("menu"); // Update the menu state
            handleNavigation("/", "#explore-menu"); // Navigate to the section
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#"
          onClick={() => {
            setMenu("mobile-app");
            handleNavigation("/", "#app-download");
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#"
          onClick={() => {
            setMenu("contact-us");
            handleNavigation("/", "#footer");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar-search-icon">
          <Link to="./cart" onClick={() => setMenu("")}>
            <img id="bag" src={assets.basket_icon_1} alt="" />
          </Link>
          <div className={!getTotalCartAmount() ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img id="profile" src={assets.profile_image_3} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
