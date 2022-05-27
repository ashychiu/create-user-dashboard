import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserDetails.scss";

const UserDetails = (props) => {
  const { userId } = props.match.params;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const userData = await res.json();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPostsByUser = async () => {
      try {
        const res = await fetch(
          `http://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const postData = await res.json();
        setPosts(postData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserDetails();
    fetchPostsByUser();
  }, [userId]);

  const { name, username, email, phone, website, address, company } = user;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {isLoading ? (
        <p>Fetching data...</p>
      ) : (
        <>
          <h2>
            <Link to="/" className="details__link">
              Users
            </Link>{" "}
            &gt; {name}
          </h2>
          <div className="details__info">
            <div className="details__container">
              <h3>Contact Info</h3>
              <p>Username: {username}</p>
              <p>
                Email:{" "}
                <a href={`mailto:${email}`} className="details__link">
                  {email.toLowerCase()}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href={`tel:${phone}`}
                  className="details__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {phone}
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href={`http://${website}`}
                  className="details__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {website}
                </a>
              </p>
            </div>
            <div className="details__container">
              <h3>Address</h3>
              <p>
                {address.suite} {address.street}, {address.city},{" "}
                {address.zipcode}
              </p>
            </div>
            <div className="details__container">
              <h3>Company</h3>
              <p>{company.name}</p>
              <p>{company.bs}</p>
              <p className="details__catchphrase">
                &quot;{company.catchPhrase}&quot;
              </p>
            </div>
          </div>
          <h2 className="posts__heading">Posts by {name}</h2>
          <div className="posts__container">
            {posts.map((post) => {
              return (
                <div key={post.id} className="posts__card">
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default UserDetails;
