import About from "./About/About";
import SignUp from "./SignUp/SignUp";
import Feeds from "./LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import UserAccount from "./LandingPage/components/NavBar/components/UserAccount";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feeds />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/User-Account" element={<UserAccount />} />
      </Routes>
    </>
  );
};

export default Home;
