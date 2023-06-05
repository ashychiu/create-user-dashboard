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
      });
      setFilteredList(filtered);
    };
    filterUserList(query);
  }, [query]);

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
          />
        </div>
        <div>
          <h4>Sort by</h4>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="select"
          >
            <option value="username">Alias</option>
            <option value="name" defaultValue="selected">
              Name
            </option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      {listToRender.map((user) => {
        return (
          <div key={user.id} className="userCard__container">
            <Link to={`/user/${user.id}`}>
              <div className="userCard">
                <div className="userCard__avatar"></div>
                <div className="userCard__info">
                  <div className="userCard__container">
                    {user.name}
                    <br />
                    Alias: {user.username}
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
