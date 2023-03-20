import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, {useState} from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";


const Header = ({ children, hasHiddenAuthButtons }) => {
  const [log, setLog] = useState(localStorage.getItem("token")) 
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>      
        {hasHiddenAuthButtons?(
        
        <Link className="link" to="/"><Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
        >  
          Back to explore 
        </Button>
        </Link>
        ):(<>
        {log?(
        <Stack direction="row" spacing={2}>
        <img src="avatar.png" alt={localStorage.getItem("username")} />
        <Button className="but use">{localStorage.getItem("username")}</Button>
        <Button className="explore-button but" onClick={ ()=> 
        {
          localStorage.clear();
          setLog(false);
        }
      }>Logout</Button>
        </Stack>
        ):(
          <>
          <Stack direction="row" spacing={2}>
            <Link className="link" to="/login">
            <Button className="explore-button but">Login
          </Button>
          </Link>
          <Link className="link" to="/register">
          <Button className="explore-button but">
            register
          </Button>
          </Link>
          </Stack>
          </>
        )}
  </>
      
      )}
        
      </Box> 
    );
};

export default Header;
