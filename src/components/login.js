import React, { useState } from 'react';
import xyma from "../imgaes/xyma_blue.png";
import { useNavigate } from 'react-router-dom';
import cumi from '../imgaes/cumi_login.png'
import './style.css';

const Login = () => {
    const [message, setMessage] = useState(''); // Moved useState hook to the top level

    const LoginSubmit = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:4000/backend/login', {
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
            setMessage('An error occurred. Please try again.');
        }
    }

    return (
        <div className='flex items-center justify-center w-full h-screen bg-[#2c2c2c]' >
            <div className='flex items-center bg-[#fedfcb] rounded-lg w-96 h-96 flex-col p-8 justify-center lg:w-1/4'>
                <img src={xyma} className="cursor-pointer w-full md:w-40 ml-0 md:ml-25 duration-500" alt="Logo" />
                <div className='w-full'>
                    <div className='mb-4'>
                        <p className='font-bold'>Email</p>
                        <input id='email' className='w-full p-2 border border-gray-400 rounded' placeholder='Email'></input>
                    </div>
                    <div className='mb-4'>
                        <p className='font-bold'>Your Password</p>
                        <input type='password' id='password' className='w-full p-2 border border-gray-400 rounded' placeholder='Password'></input>
                    </div>
                    <div>
                        <button className='bg-blue-400 font-bold w-full rounded-lg py-2' onClick={LoginSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

// import React, { useState } from 'react';
// import xyma from "../imgaes/xyma.png";
// import { useNavigate } from 'react-router-dom';
// import cumi from '../imgaes/cumi_login.png'
// import './style.css';
// const Login = () => {

//  const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('https://cumi.xyma.live/backend/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (data.user) {
//         let device_name = "XY00001"
//         localStorage.setItem('token', data.user);
//         sessionStorage.setItem("DeviceId",device_name);
//         sessionStorage.setItem("ChartId",device_name);
//         window.location.href = '/'
//       } else {
//         alert('Error : Incorrect Email and Password');
//       }

//     } catch (error) {
//       console.error(error);
//       setMessage('An error occurred. Please try again.');
//     }
//   };
//   return (
    
//     <div className="flex justify-end items-center h-screen bg-[#A3A3A3] bg-cover" style={{ backgroundImage: `url(${cumi})`}}>
//     <div className="bg-[#636262] mr-40 rounded-t-md  p-6 md:p-10">
//       <div className="flex justify-center">
//         <img src={xyma} className="cursor-pointer w-full md:w-40 mt-2 ml-0 md:ml-25 duration-500" alt="Logo" />
//       </div>
//       <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-white">
//         Sign in to your account
//       </h1>
//       <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5  dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 md:p-2.5  dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full mt-5 text-white bg-[#1AADC4] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm md:text-base px-5 py-2.5 md:py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         >
//           Sign in
//         </button>
//       </form>
//       {message && (
//         <div className={`mt-6 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
//           {message}
//         </div>
//       )}
//     </div>
//   </div>  );
// };
// export default Login;


// import React from 'react'
// import { FaUserAlt } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";
// import '../css/Login.css';
// import xyma from "../imgaes/xyma.png";
// const Login = () => {

//   const LoginSubmit=async() =>{
//     const email = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     try {

//       const response = await fetch('https://cumi.xyma.live/backend/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log(data)

//       if (data.user) {
//         let device_name = "XY00001"
//         localStorage.setItem('token', data.user);
//         sessionStorage.setItem("DeviceId",device_name);
//         sessionStorage.setItem("ChartId",device_name);
//         window.location.href = '/'
//       } else {
//         alert('Error : Incorrect Email and Password');
//       }
//     } catch (error) {
//       console.error(error);
//     }

//   }
//   return (
//     <div className='Login_body'>
//       <div className='wrapper'>
//             <form >
//                 <div className="flex justify-center">
//                     <img src={xyma} className="cursor-pointer w-full md:w-40 mt-2 ml-0 md:ml-25 duration-500" alt="Logo" />
//                 </div>
//               <div className='input-box'>
//               <input type='text'id="username" placeholder='UserId' required></input>
//                   <MdEmail className='icon'/>
//               </div>
//               <div className='input-box'>
//               <input type='password'id="password" placeholder='Password' required></input>
//                 <RiLockPasswordFill className='icon'/>
//               </div>  
//               <button onClick={LoginSubmit}>Submit</button>
//             </form>
            
//           </div>
//     </div>
          
//   )
// }

// export default Login
