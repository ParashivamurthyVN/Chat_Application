
import axios from 'axios';

const Base_URL='http://localhost:3001'

const options = {
    headers:{
        'content-type':'application/json',
        'Accept':'application/json'
      }
};

export const fetchAPI = async (url)=>{
    const {data}=await axios.get(`${Base_URL}/${url}`, options)
    return data;
}

export const fetchAPIPost = async (url)=>{
    const {data}=await axios.post(`${Base_URL}/${url}`, options)
    return data;
}


