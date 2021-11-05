import React from "react";
import { db } from '../database';
import AddUser from '../components/AddUser/AddUser';
import ViewUsers from '../components/ViewUsers/ViewUsers';
import ConnectUsers from '../components/ConnectUsers/ConnectUsers';
import ViewConnectedUsers from '../components/ViewConnections/ViewConnections';


import './FriendsBook.css';

function FriendsBook(){
    return(
        <div className="container">
            <div>
                <AddUser /> 
                <ConnectUsers />
                <ViewConnectedUsers />
            </div>
            <div>
                <ViewUsers />
            </div>
        </div>
    );
}

export default FriendsBook;