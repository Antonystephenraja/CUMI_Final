import React,{useState,useEffect} from 'react'
import { BrowserRouter,Routes,Route, json } from 'react-router-dom'
import App from '../App';
import Mainpage from '../components/Mainpage';
import Chart from '../components/Chart';
import Reports from '../components/Reports';
import Setting from '../components/Setting';
import Login from '../components/login';
import ProtectedRoute from './../components/ProtectedRoute';
import axios from 'axios';
import AdminPage from '../components/AdminPage';

const Router = () => {
  const [devicenames,setDeviceNames]=useState([]);
const[Thicknessvalue,setThicknessData]=useState([]);
  useEffect(() => {
    devicename();
    corresponding_device_data();
    
    const device_name = setInterval(devicename,2000);
    const device_data = setInterval(corresponding_device_data,2000);
  
    return () => {
      clearInterval(device_name);
      clearInterval(device_data);
    };
  }, []);


const devicename = async()=>{
  try{
    const response = await axios.get('http://34.100.168.176:4000/backend/getDevicename');
    setDeviceNames(response.data.devices);
  }catch(error){
    console.error("Error fetching data:",error);
  }
}

const corresponding_device_data = async()=>{
  try{
    let devicename_id = localStorage.getItem("DeviceId")
    const response = await axios.get('http://34.100.168.176:4000/backend/devicelast30data',{
      params:{
        device_id :devicename_id
      }
    });
    setThicknessData(response.data);
    //console.log("Data fetched:",response.data)
  }catch(error){
    console.error("Error fetching data:",error)
  }
}


  return (
    <div>
        <BrowserRouter>
          <Routes>
          <Route path='login' element={<Login/>}/>
          <Route path='/' element = {<ProtectedRoute />}>
              <Route path='/' element={<App/>}>
                  <Route index element={<Mainpage
                    Devicenames ={devicenames}
                    device_data={Thicknessvalue}
                  />}/>
                  <Route path='chart' element={<Chart
                    chartdata={Thicknessvalue}
                    Devicenames ={devicenames}
                  />}/>
                  {/* <Route path='upgrade' element={<Upgradeplan/>}/> */}
                  <Route path='report' element={<Reports
                  Devicenames ={devicenames}
                  />}/>
                  <Route path ='User&Password:stephen' element={<AdminPage
                    chartdata={Thicknessvalue}
                    Devicenames ={devicenames}
                  />}/>
                  <Route path='setting' element={<Setting/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}
export default Router
