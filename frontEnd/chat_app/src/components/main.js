import React from 'react'
import io from 'socket.io-client';
import { useState, useEffect } from "react";
import Sidebar from './sidebar';
import MessageTab from './messageTab';
import { Stack, Box, Typography, CardMedia } from '@mui/material';
import { fetchAPI } from '../utils/fetchAPI';
import Header from './header';
import AddContacts from './addContacts';

function Main({user}) {
const UserID=user.email;
const SOCKET_URL = "http://localhost:3001";

const [socket, setSocket] = useState(null);
const [messages, setMessages] = useState([]);
const [contacts, setContacts] = useState([]);
const [contactSelected, setContactSelected] = useState('');
const [imgUrl, setImgUrl] = useState('');


useEffect(() => {
  
  const socketIo = io(SOCKET_URL);
  setSocket(socketIo);

  socketIo.on('socketID', (socketID) => {
    console.log("ID: "+socketID);
    sendSocket(socketID);
  });

  socketIo.on('message', (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  });

  return () => {
    socketIo.disconnect();
  };

}, [user]);

useEffect(()=>{
fetchAPI(`contacts/${user.email}`).then((data)=>
    setContacts(data.contacts)
);
},[user]);

useEffect(()=>{
  if(contactSelected){
 const selected = messages.find(s=>s.from===contactSelected)
 setImgUrl(selected.profile)}
  },[messages]);


async function sendSocket (socketID){
    fetch('http://localhost:3001/store-socket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ socketid: socketID , email: UserID }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

//conatcts adding
    async function addContact (contact){
      if(contact){
      fetch('http://localhost:3001/addContact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email:UserID, contact:contact }),
        })
          .then((response) => response.json())
          .then((data) => {
            setContacts(data.contacts)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
      };

    const handleSubmit = ( message) => {
      if (message && contactSelected && UserID) {
        socket.emit('user_message', { message, recipientId:contactSelected, senderId: UserID, profile:user.picture});
       ; 
      }
    };
   

return (
  <Box>
  <Header user={user}/>
    <Stack sx={{flexDirection:"row", px:0.5, py:1 }}>
    <Box sx={{height: {sx:'auto', md:'84vh'}, borderRight:'1px solid #3d3d3d', px:{sx:0, md:1} }}>
    <AddContacts addContact={addContact}/>
    {(contacts && contacts.length > 0)?
    (<Sidebar
    contactSelected={contactSelected} 
    setContactSelected={setContactSelected} contacts={contacts}/>):(<div>add contacts</div>)}
      <Typography className='copyright' variant='body2' sx={{mt:1.5}}>
        copyright 2024 Murthy
      </Typography>
    </Box>
    <Box px={2} py={0.5} sx={{overflowY:"auto", flex:'2'}}>
    <Box sx={{display:'flex', flexDirection:'row', position:"sticky", top:0, p:'1px', justifyContent:'flex-start', alignItems:'center' }}>
    {imgUrl &&
    <CardMedia 
                image={imgUrl}
                alt='profile'
                sx={{borderRadius:'50%', mr:'8px', border:'2px solid #e3e3e3', 
                width:'40px', height:'40px'}}
            />}
      <Typography  variant='h6' fontWeight='bold' sx={{color:'#151717'}}>
        {contactSelected}
      </Typography></Box>
      <MessageTab messages={messages} contactSelected={contactSelected} handleSubmit={handleSubmit} setMessages={setMessages}/>
    </Box>
  </Stack>
  </Box>
);
}

export default Main
