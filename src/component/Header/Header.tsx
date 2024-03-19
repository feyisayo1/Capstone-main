import "./header.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarIcon = () => {
  const openNavBar = () => {
    let navBar = document.getElementById("navicon");
    navBar?.classList.toggle("opennavbar");

    let navContanier = document.getElementsByClassName("nav-container")[0];
    navContanier?.classList.toggle("open-nav-contanier");
  };
  return (
    <section id="navicon" className="navicon" onClick={openNavBar}>
      <span></span>
      <span></span>
      <span></span>
    </section>
  );
};

function Header() {
  useEffect(() => {
    const fade = Array.from(
      document.getElementsByClassName(
        "nav-container"
      ) as HTMLCollectionOf<HTMLElement>
    );

    setTimeout(() => {
      fade[0].style.visibility = "visible";
    }, 1000);
  }, []);
  return (
    <section id="header">
      <h1 className="logo">CHATTER</h1>
      <div className="nav-container" style={{ visibility: "hidden" }}>
        {window.screen.width <= 1000 ? <h1 className="logo">CHATTER</h1> : null}

        <nav>
          <Link to="/sign-up">Home</Link>
          <Link to="/Feeds">About Us</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Blogs</Link>
        </nav>

        <div className="signin-buttons">
          <button>Log in</button>
          <button>Sign up</button>
        </div>
      </div>
      {window.screen.width <= 1000 ? <NavbarIcon /> : null}
    </section>
  );
}

export default Header;
