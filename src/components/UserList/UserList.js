import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.scss";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [sortType, setSortType] = useState("name");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await fetch("http://jsonplaceholder.typicode.com/users");
        const userData = await res.json();
        if (sortType === "username") {
          userData.sort((a, b) => a.username.localeCompare(b.username));
        } else if (sortType === "email") {
          userData.sort((a, b) => a.email.localeCompare(b.email));
        } else {
          userData.sort((a, b) => a.name.localeCompare(b.name));
        }
        setUserList(userData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserList();
  }, [sortType]);

  useEffect(() => {
    const filterUserList = (query) => {
      const searchTerm = query.toLowerCase();
      const filtered = [...userList].filter((user) => {
        if (!query) {
          return null;
        } else if (
          user.name.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        ) {
          return user;
        }
      });
      setFilteredList(filtered);
    };
    filterUserList(query);
  }, [query]);

  console.log("filteredList:", filteredList);

  return (
    <div className="userList">
      <h1 className="userList__heading">Users</h1>
      <div className="userList__container">
        <div>
          <h4>Search</h4>
          <input
            className="input"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div>
          <h4>Sort by</h4>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="select"
          >
            <option value="name" defaultValue="selected">
              Name
            </option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      {userList.map((user) => {
        return (
          <div
            key={user.id}
            className={
              filteredList.length === 0 ? "userCard__container" : "hide"
            }
          >
            <Link to={`/user/${user.id}`}>
              <div className="userCard">
                <div className="userCard__avatar"></div>
                <div className="userCard__info">
                  <div className="userCard__container">
                    {user.name}
                    <br />
                    {user.username}
                  </div>
                  <div className="userCard__container">
                    <a
                      href={`mailto:${user.email}`}
                      className="userCard__email"
                    >
                      {user.email.toLowerCase()}
                    </a>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
      {filteredList.map((user) => {
        return (
          <div
            key={user.id}
            className={
              filteredList.length === 0 ? "hide" : "userCard__container"
            }
          >
            <Link to={`/user/${user.id}`}>
              <div className="userCard">
                <div className="userCard__avatar"></div>
                <div className="userCard__info">
                  <div className="userCard__container">
                    {user.name}
                    <br />
                    {user.username}
                  </div>
                  <div className="userCard__container">
                    <a
                      href={`mailto:${user.email}`}
                      className="userCard__email"
                    >
                      {user.email.toLowerCase()}
                    </a>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
