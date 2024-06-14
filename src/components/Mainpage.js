import React, { useState } from 'react';
import { Badge } from 'antd';
import { IoIosNotifications } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoNotificationsCircleOutline, IoAlertCircleSharp } from "react-icons/io5";
import Model from './Model';
import Rcards from './Rcards';
import './style.css';
import Charts from './Charts';
import RTables from './RTables';
import toast, { Toaster } from 'react-hot-toast';

const Mainpage = ({Devicenames,device_data}) => {
  const alldata = device_data[0];
  const device_id = alldata ? alldata.device_name : "N/A";
  const device_lastime = alldata ? alldata.timestamp : 'N/A';

  const device_time_var = Devicenames.find(device =>device.Device_ID === device_id)
  const user_set_time = device_time_var ?device_time_var.Sleep_time :'N/A';
  const id =device_time_var?device_time_var.Device_Name :'N/A';


  const [showSidebar, setShowSidebar] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);

  const dateObject = new Date(device_lastime);

  //console.log("devicetime", formatDateTime(time));
  const millisecondsSinceEpoch = dateObject.getTime();
  const secondsSinceEpoch = millisecondsSinceEpoch / 1000;
  let next_device_time = parseInt(secondsSinceEpoch+((user_set_time*60)+120))
  let current_time = Math.floor(new Date().getTime() / 1000);
  const isWorking = parseFloat(next_device_time) <= parseFloat(current_time);


  let device_names_data = []
  let device_name_time = []
  let deviceErr=[]
  const deviceinfos =localStorage.getItem(id)
  const parsedInfo = JSON.parse(deviceinfos);
  let device_ids = parsedInfo ?parsedInfo.device_names :"N/A";
  let device_time = parsedInfo?parsedInfo.time :"N/A";
  let device_Err = parsedInfo?parsedInfo.Err :"N/A";
  const device_ids_length = device_ids.split(',').length;
  device_names_data.push(device_ids)
  device_name_time.push(device_time)
  deviceErr.push(device_Err);
  const deviceNamesArray = device_names_data[0]?device_names_data[0].split(',').map(name => name.trim()):[];
  const devicetimings =device_name_time[0]?device_name_time[0].split(',').map(name=>name.trim()):[];
  const device_Error = deviceErr[0] ? deviceErr[0].split(',').map(name => name.trim()):[]; 
 
  const devicenames =localStorage.getItem("DeviceId");
  const device1 = Devicenames.find(item => item.Device_ID === devicenames)
 const deviceIds = device1 ?device1.Device_Name : 'N/A';
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    
  };

  const closeSidePopup = () => {
    setShowSidebar(false);
  };



  const dummyArray = Array.from({ length: device_ids_length }, (_, index) => index);


  const ClearNotificationCount=()=>{
    localStorage.removeItem(id)
    setNotificationCount(0)
    setShowSidebar(false)
  }

  
  
  return (
    <div className='w-[100%] h-[100%]'>
      <div className='flex h-[6%]'>
        <div className='shadow-xl sm:w-[98%] flex bg-white mt-4 ml-2 rounded-lg'>
          <div className='sm:flex justify-center '>
            <div>
              <p className="font-bold mt-0.5 ml-2 text-black text-sm">ID:{deviceIds}</p>
            </div>
            <div className='flex ml-2'>
              {!isWorking ?(
                  <IoAlertCircleSharp className="text-xl mt-0.5 text-green-500 align-items-start" /> 
                ):(
                  <IoAlertCircleSharp className="text-xl mt-0.5 text-red-500 align-items-start" /> 
                )
                }
                {!isWorking ? (
                <p className="ml-1 text-green-500 font-bold text-base">Active</p>
                ) : (
                  <p className="ml-1 text-red-500 font-bold text-base animated-blink">Inactive</p>
                )}
            </div>
          </div>
          <div className='flex items-center justify-center w-full'>
            <h2 className='font-bold text-sm sm:text-xl text-center mr-7'>Wear Monitoring Device</h2>
          </div>
          <div className=''>
            <Badge count={device_ids_length === 1 && dummyArray > 1 ? "0": device_ids_length} className='text-xl mt-3 sm:mt-1 mr-2 ' onClick={toggleSidebar}>
              <IoIosNotifications/>
            </Badge>
          </div>
        </div>
      </div>
      <div className='h[96%]'>
        <div className='h-[48%] flex flex-col sm:flex-row mt-2 ml-2 mr-2 gap-2'>
          <div className='sm:w-[50%] h-full'>
            <Model 
            Devicename={Devicenames}
            />
          </div>
          <div className='sm:w-[50%] h-full'>
            <Rcards 
              lastupdated_data ={alldata}
              Last_time ={device_time_var}
            />
          </div> 
        </div>      
        <div className='flex flex-col  h-[48%] sm:flex-row mt-9 md:mt-0 ml-2 mr-2 gap-2'>
          <div className='sm:w-[50%]'>
          <Charts
            DeviceData ={device_data}
            />
          </div>
          <div className='w-full sm:w-[50%] overflow-x-auto '>
          <RTables 
            device_data ={device_data}
            devicename={deviceIds}
            />
          </div> 
        </div>
      </div>
      {showSidebar && (
        <div className="fixed right-0 top-0 h-full w-[20%] bg-gradient-to-b from-[#2d2d2d] to-transparent z-50 ">
          <div className='flex flex-col justify-between'>
            <div className='flex justify-end m-2 text-white text-2xl cursor-pointer' onClick={closeSidePopup}>
              <IoMdCloseCircle />
            </div>
            <div className='flex justify-end m-2' onClick={ClearNotificationCount}>
              <button className='text-white underline border-none' >Clear</button>
            </div>
            <div className='max-h-screen overflow-y-auto scrollbar-hide '>
              {dummyArray.length > 1 ? dummyArray.map((item, index) => (
                  <div key={index} className='text-white border border-white flex justify-around items-center rounded-md p-1 bg-gray-200 m-1'>
                    <p className='text-2xl flex justify-center items-center'>
                      ⚠️
                    </p>
                    <p className='font-bold text-green-700'>{device_Error[index]}</p>
                    <div className='grid grid-rows-2 gap-1'>
                      <div className='text-xs text-black font-bold'>
                        {deviceNamesArray[index]} - {device_time_var.Location}
                      </div>
                      <span className='text-xs text-red-500'>
                        {devicetimings[index]}
                      </span>
                    </div>
                    
                  </div>
                ) ):""}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Mainpage;
