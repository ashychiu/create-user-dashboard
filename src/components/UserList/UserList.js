import { useEffect, useState } from "react";
import "./UserList.scss";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [sortType, setSortType] = useState("name");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUserList(json));
  };

  useEffect(() => {
    const sortArray = (sortType) => {
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
    sortArray(sortType);
  }, [sortType]);

  //   const sortUserList = (value) => {
  //     console.log(value);
  //     [...userList].sort((a, b) => a[value].localeCompare(b[value]));
  //     console.log("sortby:", sortUserList());
  //   };
  //   const sortByUsername = [...userList].sort((a, b) =>
  //     a.username.localeCompare(b.username)
  //   );
  //   console.log("sortByUsername: ", sortByUsername);
  //   const sortByEmail = [...userList].sort((a, b) =>
  //     a.email.localeCompare(b.email)
  //   );
  //   console.log("sortbyemail:", sortByEmail);

  return (
    <div className="userList">
      <h1 className="userList__heading">Users</h1>
      <h4>Search</h4>
      <input type="text" />
      <h4>Sort by</h4>
      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="name">Name</option>
        <option value="username">Username</option>
        <option value="email">Email</option>
      </select>
      {userList.map((user) => {
        return (
          <div key={user.id} className="userCard">
            <div className="userCard__avatar"></div>
            <div className="userCard__info">
              <div className="userCard__container">
                {user.name}
                <br />
                {user.username}
              </div>
              <div className="userCard__container">
                <a href={`mailto:${user.email}`} className="userCard__email">
                  {user.email}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
