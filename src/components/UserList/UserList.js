import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.scss";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  console.log(userList);
  const [sortType, setSortType] = useState("name");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUserList(json));
  };

  useEffect(() => {
    const sortUserList = (sortType) => {
      if (sortType === "name") {
        const sorted = [...userList].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUserList(sorted);
      }
      if (sortType === "username") {
        const sorted = [...userList].sort((a, b) =>
          a.username.localeCompare(b.username)
        );
        setUserList(sorted);
      }
      if (sortType === "email") {
        const sorted = [...userList].sort((a, b) =>
          a.email.localeCompare(b.email)
        );
        setUserList(sorted);
      }
    };
    sortUserList(sortType);
  }, [sortType]);

  useEffect(() => {
    const filterUserList = (query) => {
      const searchTerm = query.toLowerCase();
      const filtered = [...userList].filter((user) => {
        if (!query) {
          return user;
        } else if (
          user.name.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        ) {
          return user;
        }
      });
      setUserList(filtered);
      console.log("filtered: ", userList);
    };
    filterUserList(query);
  }, [query]);

  return (
    <div className="userList">
      <h1 className="userList__heading">Users</h1>
      <div className="userList__container">
        <h4>Search</h4>
        <input
          onChange={(e) => {
            setQuery(e.target.value);
            console.log("input: ", e.target.value);
            console.log("query: ", query);
          }}
        />
        <h4>Sort by</h4>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="name" defaultValue="selected">
            Name
          </option>
          <option value="username">Username</option>
          <option value="email">Email</option>
        </select>
      </div>
      {userList.map((user) => {
        return (
          <div className="userCard__container">
            <Link to={`/user/${user.id}`}>
              <div key={user.id} className="userCard">
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
