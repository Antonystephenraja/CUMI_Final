import React from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import xyma from '../imgaes/xyma_blue.png'
import '../css/Login.css';
const Login = () => {
  const LoginSubmit=async(event) =>{
    event.preventDefault(); 
    try {
      const email = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      console.log("email",email);
      console.log("password",password);
      const response = await fetch('http://34.100.168.176:4000/backend/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.user) {
        let device_name = "XY00001"
        localStorage.setItem('token', data.user);
        localStorage.setItem("DeviceId", device_name);
        localStorage.setItem("ChartId", device_name);
        window.location.href = '/';
    } else {
        alert('Error: Incorrect Email and Password');
    }   
    } catch (error) {
        console.error(error);
    }
  }
  
  return (
    <div className='Login_body'>
      <div className='wrapper'>
        <form >
            <div className='flex justify-center'>
                
                <img src={xyma} className='w-[50%] h-[20%]'/>
            </div>
        
          <div className='input-box'>
          <input type='text'id="username" placeholder='UserId' required></input>
              <MdEmail className='icon'/>
          </div>
          <div className='input-box'>
          <input type='password'id="password" placeholder='Password' required></input>
            <RiLockPasswordFill className='icon'/>
          </div>  
          <button onClick={LoginSubmit}>Submit</button>
        </form>
        
      </div>
    </div>
          
  )
}

export default Login
