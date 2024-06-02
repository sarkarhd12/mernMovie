import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/api';


const Home = () => {

    const navigate =useNavigate();
    const [user,setUser] =useState();
    const token =localStorage.getItem("token");

    useEffect(()=>{
    const fetchUser = async (e) =>{
        try {
            const response = await fetch(`${BASE_URL}/user/profile` ,{
                headers : {
                    "Authorization" : `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if(result && result.user){
                setUser(result.user);
            }else{
                console.log('Failed to fetch user:', result);
                navigate("/login");
            }
            } catch (error) {
                console.log(error);                
        }
    }
        if(token) {
            fetchUser();
        }else{
            navigate("/login")
        }
    },[navigate,token])
  return (
   <>
   <Search user={user}/>
   </>
  )
}

export default Home