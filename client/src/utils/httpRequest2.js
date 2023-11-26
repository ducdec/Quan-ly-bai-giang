import axios from 'axios';

const httpRequest2 = axios.create({
  baseURL: process.env.MONGODB_URI, //.env.development
});
console.log('Dong 6:', process.env.MONGODB_URI);

export const get = async (path, options = {}) => {
  const reponse = await httpRequest2.get(path, options);
  return reponse.data;
};

export default httpRequest2;
