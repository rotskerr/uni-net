import axios from 'axios';

export const getUserInfo = async (userId) => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage
    const response = await axios.get(`https://uni-net.fun/api/v1/consumer/get-profile/${userId}`, {
      
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user info: ${error}`);
    return null;
  }
}

export const getMyProfileInfo = async () => {
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  if (!userId) {
    console.error('No user ID found in local storage');
    return null;
  }

  return getUserInfo(userId);
}