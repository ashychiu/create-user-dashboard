import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserList } from "../Helpers";
import "./UserList.scss";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [sortType, setSortType] = useState("name");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userListData = await fetchUserList(sortType);
      setUserList(userListData);
    };

    fetchData();
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
        // Default return
        return null;
      });
      setFilteredList(filtered);
    };
    filterUserList(query);
  }, [query, userList]);

  const listToRender = query ? filteredList : userList;

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
            // disabled={true}
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
            <option value="email">Email</option>
            <option value="username">User Name</option>
          </select>
        </div>
      </div>
      {listToRender.map((user) => (
        <div
          key={user.id}
          className="userCard__container"
          data-testid="user-card"
        >
          <div className="userCard">
            <Link to={`/user/${user.id}`}>
              <div className="userCard__avatar" data-testid="user-avatar"></div>
            </Link>
            <div className="userCard__info">
              <Link to={`/user/${user.id}`}>
                <div className="userCard__container">
                  {user.name}
                  <br />
                  {user.username}
                </div>
              </Link>
              <div className="userCard__container">
                <a href={`mailto:${user.email}`} className="userCard__email">
                  {user.email.toLowerCase()}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
