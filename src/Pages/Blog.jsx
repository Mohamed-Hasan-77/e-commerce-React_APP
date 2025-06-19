import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));


  function getPosts() {
    axios.get("https://json-server-backend-production-7fc9.up.railway.app/posts")
      .then(res => setPosts(res.data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load posts");
      });
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://json-server-backend-production-7fc9.up.railway.app/posts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
      toast.success("Post deleted");
    } catch (error) {
      toast.error("Error deleting post");
    }
  };


  useEffect(() => {
    getPosts()
  }, []);

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Blog </h1>

      <div className="grid md:grid-col-1 gap-6">
        {posts.map(post => (
          <div key={post.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={post.image} alt={post.title} className="h-96 w-full object-cover"/>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.description}</p>
              <p className="text-sm text-gray-500">Author: {post.author}</p>

              {user && user.id === post.userId && (
                <div className="flex gap-2 justify-end mt-4">
                  <button onClick={() => handleDelete(post.id)} className="btn btn-error ">Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {user && (
        <Link to="/addPost" className="btn btn-primary fixed bottom-5 right-5 shadow-lg">
          + Add Post
        </Link>
      )}
      <ToastContainer />

    </div>
  );
}
