import React, { useState } from "react";
import { db } from '../../database'
import { Button, TextField } from '@material-ui/core';
import './AddUser.css';

const RETURN_KEY_CODE = 13; //keyCode for the "enter" key

function AddUser(){
    const [user, setUser] = useState({});

    const handleNameChange = (e) => {
        setUser({
            ...user,
            name: e.target.value.toUpperCase(),
        })
    }

    const onKeyDown = ({ keyCode }) => {
        if (keyCode !== RETURN_KEY_CODE ) { return; }
        handleSubmit();
        
      }

    const handleSubmit = () => {
        db.addPerson(user);
        console.log("users are", db.getAllPersons());
        document.getElementById('outlined-basic').value = null;
    }

    return(
        <div className="addUserContainer">
            <TextField  onKeyDown={onKeyDown} id="outlined-basic" label="Name" variant="outlined" onChange={(e) => handleNameChange(e)}/>
            <div className="submitButton">
                <Button variant="contained" onClick={handleSubmit} color="primary">Submit</Button>
            </div>
        </div>
    );
}

export default AddUser;