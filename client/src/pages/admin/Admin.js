import React, { useEffect, useState, useContext } from "react";
import axios from '../../config/axios'
import { API } from '../../config/api'
// import useAxios from '../../hooks/useAxios'
// import useAuth from '../../hooks/useAuth'

const Admin = () => {
    const [users, setUsers] = useState()
    // const axiosPrivate = useAxios();

    useEffect(() => {
       let isMounted = true;
       
       const getUsers = async () => {
           try {
                const response = await axios.get(API.user, {
                   headers: { 
                       'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
                });
                isMounted && setUsers(response.data);
           } catch (err) {
               console.log(err);
           }
       }

       getUsers();
       
       return () => {
           isMounted = false;
       }
    }, [])

    return (
        <div>
            <h1>Użytkownicy Tutors Alpha</h1>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => <li key={i}>{user?.userName}</li>)}
                </ul>
                ) : <p></p>}
            <br />
        </div>
    )
}   

export default Admin;