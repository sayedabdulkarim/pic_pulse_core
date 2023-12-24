import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
//img
import LogoOne from "../image/logo1.webp";
//auth
import AppContext from "../context";

export default function Navbar() {
  const {
    state: { user },
    clearAll,
  } = useContext(AppContext);
  // const history = useHistory();

  const handleLogOut = (_) => {
    clearAll();
    // fakeAuth.signOut()
    // history.push("/login");
  };

  //renderList
  const renderList = (_) => {
    if (user) {
      return [
        <li title="HOME" key="home">
          <NavLink to="/">
            <i className="material-icons" style={{ fontSize: "25px" }}>
              home
            </i>
          </NavLink>
        </li>,
        <li title="CREATE" key="create-post">
          <NavLink to="/create">
            <i className="material-icons" style={{ fontSize: "25px" }}>
              add_circle_outline
            </i>
          </NavLink>
        </li>,
        <li title="PROFILE" key="profile">
          <NavLink to="/profile">
            <i className="material-icons" style={{ fontSize: "25px" }}>
              account_circle
            </i>
          </NavLink>
        </li>,
        <li title="PROFILE" key="favorite">
          <NavLink to="/favorite">
            <i className="material-icons" style={{ fontSize: "25px" }}>
              favorite_border
            </i>
          </NavLink>
        </li>,
        <li title="PROFILE" key="explore">
          <NavLink to="/explore">
            <i className="material-icons" style={{ fontSize: "25px" }}>
              explore
            </i>
          </NavLink>
        </li>,
        <li title="LOGOUT" key="logout">
          <i
            style={{ color: "#000", fontSize: "25px", cursor: "pointer" }}
            onClick={handleLogOut}
            className="material-icons"
          >
            logout
          </i>
        </li>,
      ];
    } else {
      return [
        <li title="LOGIN" key="login">
          <NavLink to="/login">
            <i
              style={{ color: "#000", cursor: "pointer" }}
              className="material-icons"
            >
              login
            </i>
          </NavLink>
        </li>,
        <li title="SIGNUP" key="signup">
          <NavLink to="/signup">
            <i
              style={{ color: "#000", cursor: "pointer" }}
              className="material-icons"
            >
              create
            </i>
          </NavLink>
        </li>,
      ];
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        position: "fixed",
        width: "100%",
        top: "0",
        left: "0",
        zIndex: 1,
      }}
    >
      {/* <button onClick={() => console.log(profileClass, ' ppp')}>SHOW</button> */}
      <nav style={{ background: "#fff" }}>
        <div
          style={{ padding: "0 10px", width: "70%", margin: "0 auto" }}
          className="nav-wrapper"
        >
          <NavLink
            style={{ fontFamily: `Grand Hotel, cursive`, color: "black" }}
            to={user ? "/" : "/login"}
            className="brand-logo left"
          >
            <img
              src={LogoOne}
              alt="LOGO"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                width: "25%",
              }}
            />
          </NavLink>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
}
