import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const authorIDs = [];

  for (let i = 1; i <= 10; i++) {
    authorIDs.push(i);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => setPosts(response.data))
        .catch((err) => console.error(err));
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setFiltered(filterByAuthor);
  }, [author]);

  const filterByAuthor = posts.filter((post) => post.userId == author);

  const listToFilterQuery = filtered.length ? filtered : posts;
  const filterByQuery = listToFilterQuery.filter((post) =>
    post.title.includes(query)
  );

  console.log("query", filterByQuery);

  const postsToRender = filterByQuery.length
    ? filterByQuery
    : filtered.length
    ? filtered
    : posts;
  console.log(query);

  return (
    <main>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <select onChange={(e) => setAuthor(e.target.value)}>
        <option selected>UserID</option>
        {authorIDs.map((author, index) => 
            <option key={index} value={author}>
              Posts by User ID: {author}
            </option>
        )}
      </select>
      <div>
        {postsToRender.map((post, index) => 
            <div key={index}>
              {/* <p>Author: {post.userId}</p> */}
              <p>Title: {post.title}</p>
            </div>
        )}
      </div>
    </main>
  );
};

export default BlogPosts;
