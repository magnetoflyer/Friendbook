import React, { useState, useEffect } from "react";
import { db } from '../../database'
import './ConnectUsers.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@material-ui/core';


function ConnectUsers(){
    const [fetchUsers, setFetchUsers] = useState(false);

    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");

    const [users, setUsers] = useState(db.getAllPersons());

    useEffect(() => {
        setUsers(db.getAllPersons());
    }, [fetchUsers]);

    const handleChangePerson1 = (e) => {
        console.log(e.target.value);
        setUser1(e.target.value)
    }

    const handleChangePerson2 = (e) => {
        console.log(e.target.value);
        setUser2(e.target.value)
    }

    const handleDropDownClick = () => {
        setFetchUsers(!fetchUsers);
    }

    const handleConnectClicked = () => {
        // TODO: Handle if same ids are being connected
        
        {
        db.connectPersons(user1, user2);
        }
       
    }

    const _getUser = (user) => { 
        return (
            <MenuItem value={user.id}>
                {user.name}
            </MenuItem>
        )
    }

    // Handle the late rendering of dropdown
    return(
    <div className="connection">
        <div className="person1-box">
            <FormControl fullWidth onClick={handleDropDownClick}>
            <InputLabel id="person1">Person 1</InputLabel>
            <Select
            value={user1.id}
            label="Person 1"
            onChange={handleChangePerson1}
            >
                {(users.length) ?  users.map((user) => _getUser(user)): null}
            </Select>
            </FormControl>
        </div>
        
        <div className="person2-box">
            <FormControl fullWidth onClick={handleDropDownClick}>
            <InputLabel id="person2">Person 2</InputLabel>
            <Select
            value={user2.id}
            label="Person 2"
            onChange={handleChangePerson2}
            >
                {users.map((user) => _getUser(user))}
            </Select>
            </FormControl>
        </div>
      <Button className="connect-button" variant="contained" onClick={handleConnectClicked} color="primary">Connect</Button>
    </div>
    );
}

export default ConnectUsers;