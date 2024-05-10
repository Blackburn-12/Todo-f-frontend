import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BASE_URL } from "./config/index.js";
function App() {
  const [titleValue, setTitleValue] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getPost = await axios.get(`${BASE_URL}/getpost`);
      // console.log(getPost);
      setPost(getPost.data.data);
    } catch (error) {
      // console.log("error", error);
    }
  };
  const addTodoHandler = async () => {
    try {
      const obj = {
        title: titleValue,
        description: description,
        userId: "101",
      };
      const create = await axios.post(`${BASE_URL}/createpost`, obj);
      // console.log("create", create);
      setTitleValue("");
      setDescription("");
    } catch (error) {
      // console.log("error", error.message);
    }
    fetchData();
  };

  const updatePost = async (id) => {
    try {
      const titleValuePrompt = prompt("Enter new Title");
      const descriptionValue = prompt("Enter new Description");
      const obj = {
        title: titleValuePrompt,
        description: descriptionValue,
      };
      const edit = await axios.put(`${BASE_URL}/updatepost/${id}`, obj); // Pass obj as the second argument
      // console.log("edit", edit);
      fetchData();
    } catch (error) {
      // console.log("error", error.message);
    }
    fetchData();
  };
  const deleteHandler = async (id) => {
    try {
      // console.log("Deleting post with ID:", id);
      await axios.delete(`${BASE_URL}/deletepost/${id}`);
      // console.log("Post deleted successfully.");
      fetchData();
    } catch (error) {
      // console.log("Error deleting post:", error.message);
    }
  };

  return (
    <>
   <div className="h-screen relative overflow-y-auto bg-main-bg">
  <h1 className="text-center text-white text-5xl font-bold font-Roboto p-4 overflow-hidden">
    Todo App
  </h1>
  <div className="h-full w-full p-4 relative z-10">
    <input
      type="text"
      placeholder="Enter Title"
      className="w-full block bg-Dark px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-gray-700 text-white placeholder:font-Roboto"
      value={titleValue}
      onChange={(event) => setTitleValue(event.target.value)}
    />
    <input
      type="text"
      placeholder="Enter Description"
      className="w-full block mt-4 bg-Dark px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-gray-700 text-white placeholder:font-Roboto"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
    />
    <button
      className="bg-button-bg mt-4 hover:bg-button-bg-hover text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={addTodoHandler}
    >
      Add Todo
    </button>
  </div>

  <div className="absolute top-60 left-0 w-full z-20">
    {post?.map((post) => {
      return (
        <div
          key={post._id}
          className="bg-card rounded-lg shadow-md p-6 mb-4"
        >
          <h1 className="text-xl text-white font-Roboto font-bold mb-2">
            {post.title}
          </h1>
          <p className="text-white font-Roboto">{post.description}</p>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-button-bg hover:bg-button-bg-hover text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => updatePost(post._id)}
            >
              Update
            </button>
            <button
              className="bg-button-bg hover:bg-button-bg-hover text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => deleteHandler(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>

    </>
  );
}

export default App;
