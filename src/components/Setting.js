import React, { useState,useRef, useContext, useEffect } from 'react';
import { ModeContext } from './ModeContext';
import { MdSystemUpdateAlt,MdCircleNotifications, MdBrowserUpdated,MdOutlineSupportAgent } from 'react-icons/md';
import xyma from '../imgaes/xyma.png';
import cumi from '../imgaes/CUMI0908.png';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiSupport ,BiAlarmAdd} from "react-icons/bi"; // Import all icons from react-icons


const Setting = () => {
  const { isLightMode } = useContext(ModeContext);





  const color_value ='bg-[#737373]'
  const iocn_color = 'text-stone-900'
  return (
    <div className={`flex items-center justify-center h-screen px-4 `}>
<div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
          <h1 className="text-2xl text-center font-bold mb-1">XYMA Analytics Private Ltd</h1>

          <div className="mb-4">
            <p className='text-center'>IIT Madras Research Park</p>
            {/* Add more company details as needed */}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 text-center"> The Wear Monitoring Device (WMD) monitors the wear of ceramic linings in industrial plant operations</h2>
            <p className='text-center'>This Device is battery-powered and braodcast the percentage of the remaining wall thickness to the dashboard via the Industrial Internet of Things (IIoT) module</p>
            {/* <p>Description: Brief description of the project.</p> */}
            {/* Add more project details as needed */}
          </div>

          <div className="mb-2">
            <h2 className="text-lg font-semibold mb-2 text-center">Contact Information:</h2>
            <p className='text-center'>Mail: info@xyma.in</p>
            <p className='text-center'>©2023 XYMA Analytics Private Ltd</p>
          </div>
      </div>
  </div>
  );
};

export default Setting;
