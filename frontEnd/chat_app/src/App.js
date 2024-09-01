
import Main from './components/main';
import Login from './components/login';
import React, { useState } from 'react';
import { Box} from '@mui/material';


function App() {
  const [user, setUser] = useState(null);

  return (
    <Box style={{display:'flex', flexDirection:'column', height:'100vh'}} >
      {user ? (
        <Main user={user} />
      ) : (
        <Login setUser={setUser} />
      )}
    </Box>
  );
}

export default App;
