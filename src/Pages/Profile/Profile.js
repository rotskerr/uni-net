import { useState } from 'react'
import Left from '../../Components/LeftSide/Left'
import ProfileMiddle from '../../Components/Profile/ProfileMiddle'
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import "../Profile/Profile.css"
import ProfileImg from "../../assets/profile.jpg"
/**
 * Profile component.
 *
 * @component
 *
 * @returns {JSX.Element} Rendered Profile component
 */
const Profile = () => {

  /**
   * @type {Array} following - The number of people the user is following.
   * @type {Function} setFollowing - Setter function for following.
   */
  const [following,setFollowing] =useState(3);

  /**
   * @type {string} search - The search query.
   * @type {Function} setSearch - Setter function for search.
   */
  const [search,setSearch] =useState("");

  /**
   * @type {boolean} showMenu - Whether the menu is shown or not.
   * @type {Function} setShowMenu - Setter function for showMenu.
   */
  const [showMenu,setShowMenu] =useState(false);

  /**
   * @type {Array} images - The images to be displayed.
   * @type {Function} setImages - Setter function for images.
   */
  const [images,setImages] =  useState(null);

  /**
   * @type {string} name - The name of the user.
   * @type {Function} setName - Setter function for name.
   */
  const [name,setName]= useState("");

  /**
   * @type {string} userName - The username of the user.
   * @type {Function} setUserName - Setter function for userName.
   */
  const [userName,setUserName]= useState("");

  /**
   * @type {string} profileImg - The profile image of the user.
   * @type {Function} setProfileImg - Setter function for profileImg.
   */
  const [profileImg,setProfileImg] =useState(ProfileImg);

  /**
   * @type {Object} modelDetails - The details of the model.
   * @type {Function} setModelDetails - Setter function for modelDetails.
   */
  const [modelDetails,setModelDetails] = useState(
    {
      ModelName:"Vijay",
      ModelUserName:"@Vijay98",
      ModelCountryName:"India",
      ModelJobName:"Web Developer in Google"
    }
  );

  return (
    <div className='interface'>
        <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        profileImg={profileImg}
        />
      <div className="home">
        <Left 
        following={following}
        setFollowing={setFollowing}
        profileImg={profileImg}
        modelDetails={modelDetails}
        
        />

        <ProfileMiddle 
        following={following}
        search={search}
        images={images}
        setImages={setImages}
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        modelDetails={modelDetails}
        setModelDetails={setModelDetails}
        />
        
        <Right 
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        following={following}
        setFollowing={setFollowing}
        />
      </div>
    </div>
  )
}

export default Profile