
import { Box, Typography, Paper, IconButton} from '@mui/material';
import { React, useState  } from "react";
import {Send} from '@mui/icons-material';


function MessageTab({contactSelected, messages, handleSubmit, setMessages}) {
  const [message, setMessage] = useState('');

  const send = (e) => {
    e.preventDefault(); 
     handleSubmit(message);
    setMessage('');
    setMessages((prevMessages) => [...prevMessages, {message, to:contactSelected}])
  };
 

  return (
    <Box style={ {display:'flex', flexDirection:'column'} } >
     <Typography variant='body1' sx={{fontWeight:'500'}}> 
    <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, height:'58vh' }}>
    {messages.map((msg, index) => {
      if(msg.from===contactSelected){
      return <div key={index}  style={{display:'flex', flexDirection:'row', marginBottom:'8px' }}><span style={{boxShadow: '2px 2px 8px #bebebe,-2px -2px 8px #ffffff', borderRadius:'4px', color:'#151717', padding:'4px 8px' }}>{msg.message}</span></div>
      };
      if(msg.to===contactSelected){
      return <div key={index}  style={{display:'flex', flexDirection:"row-reverse", marginBottom:'8px' }}><span style={{boxShadow: '2px 2px 8px #bebebe,-2px -2px 8px #ffffff', borderRadius:'4px', color:"#0078d4", padding:'4px 8px' }}>{msg.message}</span></div>
      };

    })}
    </Box>
     </Typography> 
    
    <Paper component='form'
    onSubmit={send}
    sx={{position:"sticky", bottom:0, borderRadius:"10px", border:'1px solid #e3e3e3', pl:2, mr:{sm:5}, boxShadow:"none", width: '100%',
          maxWidth: '650px',
           alignSelf:'center'}}>
    <input className='search-bar' placeholder='type...' value={message} 
        onChange={(e) => setMessage(e.target.value)} />
    <IconButton type='submit' sx={{color:'#2d79f3', p:'10px'}}>
        <Send/>
    </IconButton>
    </Paper>

   </Box>
  )
}

export default MessageTab



// <Box key={index} sx={{display:'flex'}}  >
// {msg.from===contactSelected && <div key={index} className="message incoming" style={{ boxShadow: '2px 2px 8px #bebebe,-2px -2px 8px #ffffff', padding:'5px', borderRadius:'4px'}}>{msg.message}</div>} 
// {msg.to===contactSelected && <div key={index} className="message outgoing" style={{ alignItems:'end', display: 'inline-block', boxShadow: '2px 2px 8px #bebebe,-2px -2px 8px #ffffff', padding:'5px', borderRadius:'5px'}}>{msg.message}</div>} 
// </Box>