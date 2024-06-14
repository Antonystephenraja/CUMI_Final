import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import './style.css';
import { Transition } from '@headlessui/react';

const RTables = ({device_data,devicename}) => {
  const alldata = device_data;
  let devicename_id = localStorage.getItem("DeviceId")
 console.log(device_data);
  return (
    <div className="flex flex-col rounded-md">
      <div className="h-[41vh] md:h-[42vh] overflow-y-auto" style={{scrollbarWidth:"none"}}>
        <table className="bg-[#2d2d2d] border w-full text-white">
        <thead className="bg-[#f77f50e5] border-b static">
          <tr>
            <th className="text-sm sm:font-medium text-white">
              DeviceId
            </th>
            <th className="text-sm sm:font-medium text-white">
              Thickness(mm)
            </th>
            <th className="text-sm sm:font-medium text-white">
              Battery(%)
            </th>
            <th className="text-sm sm:font-medium text-white">
              Signal(%)
            </th>
            <th className="text-sm sm:font-medium text-white">
              Device Temp(℃)
            </th>
            <th className="text-sm sm:font-medium text-white">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className={` divide-y divide-gray-200`}>
                {alldata.slice().map((data, index) => {
                  const battery_value = data.battery_status.split(",")[0];
                  let batteryPercentage = parseInt((battery_value - 437) * (100 - 0) / (776 - 437) + 0);
                  const signal_percentage= (data.signal_strength - 0)*(100 - 0 )/(32 - 0)+0;
                  const signal_percentage_convert = parseInt(signal_percentage)
                  return (
                    <tr key={index}>
                      <td className="sm:px-2 whitespace-no-wrap text-center text-sm text-gray-300">{devicename}</td>
                      <td className="sm:px-2 whitespace-no-wrap text-center text-sm  text-gray-300">{data.thickness}</td>
                      <td className="sm:px-2 whitespace-no-wrap text-center text-sm text-gray-300">
                        {batteryPercentage < 0 ? "0 %" : batteryPercentage > 100 ? "100%" : batteryPercentage}
                      </td>
                      <td className="sm:px-2 whitespace-no-wrap text-center text-sm text-gray-300">{signal_percentage_convert}</td>
                      <td className="sm:px-2 whitespace-no-wrap text-center text-sm text-gray-300">{data.device_status}</td>
                      <td className="sm:px-2 whitespace-no-wrap text-center text-sm text-gray-300">{data.timestamp}</td>
                    </tr>
                  );
                })}
              </tbody>
        </table>
      </div>
    </div>
  );
};

export default RTables;
