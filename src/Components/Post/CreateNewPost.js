import React, { useState } from 'react';
import { storage } from '../../utils/Config';
import './CreateNewPost.css';

const categories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  // Add more categories as needed
];

const CreateNewPost = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0].id);

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleVideoChange = e => {
    if (e.target.files[0]) {
      setVideo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = () => {
    // Upload image or video to Firebase Storage...
  };

  return (
    <div className="post-form">
      <h1 className="form-title">New Post</h1>
      <input className="form-input" type="file" accept="image/*" onChange={handleImageChange} />
      <input className="form-input" type="file" accept="video/*" onChange={handleVideoChange} />
      <textarea className="form-textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button className="form-button" onClick={handleUpload}>Upload</button>
      <br />
      {image && <img className="form-preview" src={image} alt="preview" />}
      {video && <video className="form-preview" src={video} controls />}
    </div>
  );
};

export default CreateNewPost;