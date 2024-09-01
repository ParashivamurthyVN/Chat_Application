import React from 'react'
import { Stack} from '@mui/material';



const Sidebar = ({contactSelected, setContactSelected, contacts}) => {
  return (
    <Stack direction='row' sx={{ overflowY:"auto", height:{sx:"auto", md:"85%"}, flexDirection:{ md:"column"}}}>
        {contacts.map((contact)=>(
            <button className='category-btn' 
            onClick={()=>setContactSelected(contact)}
            style={{color: contact===contactSelected ? '#2d79f3' : '#151717'}}
             key={contact}>
                {/* <span style={{color:contact===contactSelected? 'white':'red', marginRight:'15px'}} >{category.icon}</span> */}
                <span style={{opecity:contact===contactSelected ? '1':'0.8'}} >{contact}</span>
            </button>
        ))}
    </Stack>
  )
}

export default Sidebar