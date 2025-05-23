import axios from 'axios';

export type ProfileResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export const getProfile = async () => {
  const response = await axios.get<ProfileResponse>('https://dummyjson.com/auth/me');
  return response.data;
};
