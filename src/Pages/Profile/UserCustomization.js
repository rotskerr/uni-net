import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../../utils/Config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "./UserCustomization.css";

function UserCustomization() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      const imageRef = ref(storage, 'files/avatar.jpg');
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
    };

    fetchImage();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);

    // Create a URL object and set it as the image URL
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImageUrl(objectUrl);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const storageRef = ref(storage, `files/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Handle the upload progress
          }, 
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            reject(error);
          }, 
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setImageUrl(downloadURL); // set the new image URL
              resolve(downloadURL);
            });
          }
        );
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        "https://uni-net.fun/api/v1/consumer/update",
        {
          name,
          status,
          description,
          is_locked: isLocked,
          avatar: imageUrl, // use the current image URL
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 201) {
        console.log("User customization saved successfully");
        navigate('/home');
      } else {
        console.log("Failed to save user customization");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <div className="container">
      <form className="container-form" onSubmit={handleSubmit}>
        <h1 className="form-title">User Customization</h1>
        <label htmlFor="avatar-upload" className="label-center">
  <img src={imageUrl} alt="avatar" className="avatar" />
</label>
        <input
          id="avatar-upload"
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <button type="button" onClick={handleImageUpload} className="upload-button">
          Upload Image
        </button>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input name-input"
          placeholder="Full Name"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="input status-input"
          placeholder="Status"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input description-input"
          placeholder="Description"
        />
        <div className="switch-container">
          <div className="switch">
            <input
              type="checkbox"
              checked={isLocked}
              onChange={(e) => setIsLocked(e.target.checked)}
              id="isLocked"
              className="lock-input"
            />
            <label htmlFor="isLocked" className="lock-label"></label>
          </div>
          <label htmlFor="isLocked" className="lock-text">Is Locked</label>
        </div>
        <div className="divBtn">
          <button type="submit" className="loginBtn save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserCustomization;