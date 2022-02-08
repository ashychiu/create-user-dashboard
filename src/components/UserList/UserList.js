import { useEffect, useState } from "react";
import "./UserList.scss";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserList();
    console.log(userList);
  }, []);

  const fetchUserList = () => {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUserList(json));
  };
  return (
    <div className="userList">
      <h1 className="userList__heading">Users</h1>
      {userList.map((user) => {
        return (
          <div key={user.id} className="userCard">
            <div className="userCard__avatar"></div>
            <div className="userCard__info">
              <div className="userCard__container">
                {" "}
                {user.name}
                <br />
                {user.username}
              </div>
              <div className="userCard__container">
                {" "}
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
