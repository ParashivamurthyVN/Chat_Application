import React from 'react'
import { Box, Typography, CardMedia } from '@mui/material';

function Header({user}) {
  return (
   <Box sx={{position:"sticky", top:0, boxShadow: '2px 2px 8px #bebebe,-2px -2px 8px #ffffff', 
   background:'white', zIndex:'10', display:'flex', flexDirection:'row',
    justifyContent:'space-between', alignItems:'center'}}>
   <Typography  variant='h3' fontWeight='bold' p={0.5} >
           <span style={{color:'#2d79f3', marginLeft:'5px'}}>My Chat</span>
    </Typography>
   <CardMedia 
                image={user.picture}
                alt='profile'
                sx={{borderRadius:'50%', mr:'8px', border:'2px solid #e3e3e3', 
                width:'40px', height:'40px'}}
            />
   </Box>
  )
}

export default Header