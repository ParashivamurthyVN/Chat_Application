
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Box} from '@mui/material';
import env from "env";

const clientId = process.env.GOOGLE_CLIENT_ID;

function Login({ setUser }) {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } 
    );
  }, []);

  const handleCredentialResponse = (response) => {
    const userObject = jwtDecode(response.credential); 
    setUser(userObject);
    console.log(userObject);
  };
  

  return (
    <Box style={ {display:'flex', flexDirection:'column', alignItems:'center', height:'90vh'}}>
      <h2>Login with Google to continue</h2>
      <div id="buttonDiv"></div>
    </Box>
  );
}

export default Login;
