import React, { useContext, useEffect, useState } from 'react';
import { ModeContext } from './ModeContext';
import xyma from '../imgaes/xyma.png';
import reportpng from '../imgaes/products.png';
import Select from 'react-select';
import axios from 'axios';
import './style.css';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

import coverImg from '../imgaes/pdfcover.jpg'
import xymaimg from '../imgaes/xyma.png'
import disclaimerPage from '../imgaes/disclaimerPage.jpg'

const Reports = (Devicenames) => {
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [deviceId, Dropdowndata] = useState('');
  const [sensors_name, DropdownDeviceName] = useState('');
  const { isLightMode } = useContext(ModeContext);
  const devicename = Devicenames.Devicenames ?Devicenames.Devicenames :'N/A';

  const handleDateChange = (event, dateType) => {
    const selectedDate = event.target.value;
    if (dateType === 'from') {
      setSelectedFromDate(selectedDate);
    } else if (dateType === 'to') {
      setSelectedToDate(selectedDate);
    }
  };

  const handleDownload = async () => {
    try {
      const startDate = new Date(selectedFromDate);
      const endDate = new Date(selectedToDate);

      const response = await axios.post('http://localhost:4000/backend/getData', {
        device: deviceId,
        startdate: startDate,
        enddate: endDate
      });
      const apidata = response.data.data;
      const doc = new jsPDF();

        const logo = xymaimg;
        const cover = coverImg;
        // const  desc = sensorPage;
        const disclaimer = disclaimerPage;

         //cover img  
         doc.addImage(cover, 'JPG',0,0,210,297);
         doc.addPage();

            const tableHeaders = [
              ['Device', 'Thickness', 'Battery', 'Device Temp', 'Time'],
            ];
        
            const tableData = apidata.map(item => {
              const rawBatteryPercentage = parseInt((parseInt(item.battery_status.split(",")[0]) - 265) * (100 - 0) / (540 - 265) + 0);
              const batteryPercentage = Math.max(Math.min(rawBatteryPercentage, 100), 0);
              const formattedBatteryPercentage = batteryPercentage < 0 ? 0 : (batteryPercentage > 100 ? 100 : batteryPercentage);
              return [
                sensors_name,
                item.thickness,
                formattedBatteryPercentage,
                item.device_status,
                item.timestamp,
              ];
            });

            doc.autoTable({
              head: tableHeaders,
              body: tableData,
            });

            doc.addImage(disclaimer,'PNG',0,50,210,250)
            // Save the PDF
           const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);

        window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating Excel:', error);
    }
  };

  const customStyles = {
    control: provided => ({
      ...provided,
      backgroundColor: '#2A77E8',
      borderColor: '#FDFDFD',
      color: isLightMode ? 'white' : 'black'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2d2d2d' : isLightMode ? '#2d2d2d' : '#FDFDFD',
      color: state.isSelected || isLightMode ? 'white' : 'black'
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: 'red'
    }),
    placeholder: defaultStyles => ({
      ...defaultStyles,
      color: '#fffff'
    })
  };
 

  const options = devicename
    ? devicename.map(devicename => ({
        value: devicename.Device_ID,
        label: devicename.Device_Name
      }))
    : [];

  const handleSensorChange = selectedOption => {
    if (selectedOption) {
      const sensorNumber = selectedOption.value;
      Dropdowndata(sensorNumber);
      DropdownDeviceName(selectedOption.label)
    }
  };

  return (
    <div className={`pt-[25px] m-2 px-[25px]'bg-[#2d2d2d]'}`}>
      <h1 className="text-white mb-5 font-bold text-center">Reports</h1>
      <div className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-md bg-[#2d2d2d] shadow-md`} style={{ height: 'auto' }}>
        <div className="flex report_align flex-col items-center md:items-start mb-4 md:mb-0 md:w-1/2">
          <img src={xyma} className="report_img md:mt-0 w-40 ml-4 md:ml-10" alt="XYMA" />
          <div className="grid grid-rows-4 mt-4 items-center ml-10 md:items-start justify-center">
            <div className="text-white flex items-center">
              <h1 className="mb-2 mr-2 ">Select a Device Id:</h1>
              <Select className="ml-4" options={options} styles={customStyles} onChange={handleSensorChange} />
            </div>
            <div className="mt-2 flex items-center">
              <h1 className="text-white ml-1">From Date :</h1>
              <input type="date" className="border rounded p-2 ml-5" onChange={e => handleDateChange(e, 'from')} />
            </div>
            <div className="mt-2 flex items-center">
              <h1 className="text-white ml-6">To Date :</h1>
              <input type="date" className="border rounded p-2 ml-5" onChange={e => handleDateChange(e, 'to')} />
            </div>
            <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
        <div className="flex flex-col items-centerrounded-[80%] justify-center md:items-end w-full md:w-1/2 mt-4 md:mr-28 md:mt-0">
          <img src={reportpng} style={{ width: '50vh', maxWidth: '100%' }} alt="Report" />
        </div>
      </div>
    </div>
  );
};

export default Reports;

