import "../style/user-account.css";
import { Calendar1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { db, auth } from "../../../../../App";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserAccount = () => {
  let [user, setUser] = useState<any>(null);
  let [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (e) => {
      if (e) {
        user = e;
        setUser(user);
      } else {
        user = null;
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      checkifUserFileExists();
    }
  }, [user]);

  const checkifUserFileExists = async () => {
    const userID = user.uid;
    const userRef = doc(db, "userProfiles", userID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      console.log(userDoc.data());
      userProfile = userDoc.data();
      setUserProfile(userProfile);
    }
  };

  let date;
  let day;
  let year;
  let monthIndex; // Months are zero-based
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month;
  if (userProfile) {
    date = new Date(userProfile.userCreationDate);
    year = date.getFullYear();
    monthIndex = date?.getMonth();
    month = monthNames[monthIndex];
    day = ("0" + date.getDate()).slice(-2);
  }
  if (userProfile)
    return (
      <section id="user-account">
        <div
          style={{
            background: `url(${userProfile.userBackGroundProfilePicture}) center center no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
        <section>
          <span>
            <div
              style={{
                background: `url(${userProfile.userProfilePicture}) center center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
            <h1>{userProfile.userName}</h1>
            <span>
              <Calendar1 />
              <p>
                {day} {month} {year}
              </p>
            </span>
          </span>
          <button>Edit Profile</button>
        </section>
      </section>
    );
};

export default UserAccount;
