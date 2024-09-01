import { React, useState  } from "react";
import { Box, Paper, IconButton} from '@mui/material';
import {Add} from '@mui/icons-material';

function AddContacts({addContact}) {
    const [contact, setContact] = useState('');

    const Adding = (e) => {
         e.preventDefault(); 
        addContact(contact);
         setContact('');
      };

  return (
    <Box>
    <Paper component='form'
      onSubmit={Adding}
    sx={{position:"sticky", top:0, borderRadius:"10px",my:'4px', border:'1px solid #e3e3e3', pl:2, boxShadow:"none", width: '100%',
         maxWidth: '210px',
         alignSelf:'center'}}>
    <input className='add-bar' type='email' placeholder='Add Contacts...' value={contact} 
        onChange={(e) => setContact(e.target.value)} />
    <IconButton type='submit' sx={{color:'#2d79f3', p:'4px'}}>
        <Add/>
    </IconButton>
    </Paper>
    </Box>
  )
}

export default AddContacts