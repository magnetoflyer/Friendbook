import React, { useState, useEffect } from "react";
import { db } from '../../database';
import { Button } from '@material-ui/core';
import './ViewUsers.css';

function ViewUsers(){
    const [button, setButton] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        setAllUsers(db.getAllPersons());
    }, [button]);

    const handleClick = () => {

        if(!button ){
            setButton(true);}
        else {
            setButton(false);
        }
    }

    const _getPerson = (person) => {
        return (
            <div className="list-item">
                {person.name}
            </div>
        )
    }

    return(
        <div>
            <div className="viewButton">
                <Button variant="contained" onClick={handleClick} color="primary">{button?"Hide Users":"View Users"}</Button>
            </div>
            {(button) ? <div className="list-container">
                {allUsers.map(person => _getPerson(person))}
            </div>: null}
        </div>
    )
}
export default ViewUsers;