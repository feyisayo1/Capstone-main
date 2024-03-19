import React, { useEffect, useState } from "react";
import { marked } from "marked";
import "../styles/blogpostviewer.css";
import { db } from "../../../App";
import { doc, getDoc } from "firebase/firestore";

interface BlogPost {
  id: string;
  userId: any;
  createdAt: any;
  articleHeading: string;
  markdownContent: string;
}

const BlogPostViewer: React.FC<{ blogPosts: BlogPost[] }> = ({ blogPosts }) => {
  interface props {
    post: any;
  }
  const Blogs: React.FC<props> = ({ post }) => {
    let [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
      const getUserProfile = async () => {
        const userProfileRef = doc(db, "userProfiles", post.userId);
        const userProfileSnapshot = await getDoc(userProfileRef);
        if (userProfileSnapshot.exists()) {
          userProfile = userProfileSnapshot.data();
          setUserProfile(userProfile);
        }
      };
      return () => {
        getUserProfile();
      };
    }, []);

    let date = post.createdAt.toDate();
    let day = ("0" + date.getDate()).slice(-2);
    let year = date.getFullYear();
    let monthIndex = date.getMonth(); // Months are zero-based
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
    let month = monthNames[monthIndex];

    if (userProfile)
      return (
        <div id="blog-post">
          <section>
            <div>
              <div
                style={{
                  background: `url(${userProfile.userProfilePicture}) center center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div>
                <h3>{userProfile.userName}</h3>
                <p>
                  {userProfile.userOccupation
                    ? userProfile.userOccupation
                    : "Unemployed"}{" "}
                  .{day} {month}, {year}
                </p>
              </div>
            </div>
            <h1>{post.articleHeading}</h1>
          </section>
          <div
            dangerouslySetInnerHTML={{ __html: marked(post.markdownContent) }}
          />
        </div>
      );
  };

  return (
    <div id="blog-container">
      {blogPosts.map((posts) => (
        <Blogs post={posts} key={posts.id} />
      ))}
    </div>
  );
};

export default BlogPostViewer;
