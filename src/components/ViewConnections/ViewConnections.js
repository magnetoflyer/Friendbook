import React, { useState, useEffect } from "react";
import { db } from '../../database'
import './ViewConnections.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@material-ui/core';


function ViewConnectedUsers(){
    const [fetchUsers, setFetchUsers] = useState(false);

    const [paths, setPaths] = useState([]);
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');

    const [users, setUsers] = useState(db.getAllPersons());

    useEffect(() => {
        setUsers(db.getAllPersons());
    }, [fetchUsers]);

    const handleChangePerson1 = (e) => {
        setUser1(e.target.value);
    }

    const handleChangePerson2 = (e) => {
        setUser2(e.target.value);
    }

    const handleDropDownClick = () => {
        setFetchUsers(!fetchUsers);
    }

    const handleViewConnectionClicked = () => {
        // TODO: Handle if same ids are being connected
        const paths = db.viewconnection(user1, user2);
        setPaths(paths);
    }

    const _getUser = (user) => { 
        return (
            <MenuItem value={user.id}>
                {user.name}
            </MenuItem>
        )
    }

    const _getPath = (path) => {
        return (
            <div className="persons">
                {path.map(current => (
                    <div className="persons">
                        <div className="persons">
                            <div>{current.name}</div>
                            <div>======</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const _getPaths = () => {
        return (
            <div>
                {paths.map(path => _getPath(path))}
            </div>
        )
    }
    // Handle the late rendering of dropdown
    return(
        <div>
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
        <div className="viewConnection">
          <Button className="connect-button" variant="contained" onClick={handleViewConnectionClicked} color="primary">View</Button>
        </div>
    </div>
        <div className="pathsContainer">
        {paths ? _getPaths(): null}
        </div>
    </div>
    );
}

export default ViewConnectedUsers;