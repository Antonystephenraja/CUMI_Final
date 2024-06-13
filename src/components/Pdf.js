import React, { useEffect,useContext, useState } from 'react';
import { ModeContext } from './ModeContext'
import reports from '../imgaes/xyma.png'
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const Pdf = () => {
  const {isLightMode}=useContext(ModeContext);
  const [tabledata, setTabledata] = useState([]);

  useEffect(() => {
    tablefetch();
  }, []);

  const tablefetch = async () => {
    try {
      const response = await axios.get('https://cumi.xyma.live/backend/fetch_chart');
      setTabledata(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableHeaders = [['Thickness', 'Battery','Device Temp','Time']];
    const tableData = tabledata.map(item => [item.thickness, item.battery_status, item.device_status, item.timestamp]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
    });
    const blob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl, '_blank');
  };
  const color_value ='bg-[#737373]'
  const iocn_color = 'text-stone-900'
return (
  <div className={`pt-[25px] h-[1088px] px-[25px] ${isLightMode ? 'bg-[#202020]' : 'bg-[#f2f2f2]'}`}>
      <h1 className='text-white mb-5 font-bold'>Reports</h1>
      <div className={`flex flex-col items-center justify-center ml-[20%] mr-[20%] p-4 rounded-md  ${isLightMode ? 'bg-[#2d2d2d]' : color_value} shadow-md mb-4`}>
          <div className="flex h-[100px] w-[300px]">
              <img src={reports} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="text-white text-center mt-5 md:mr-0">
              Conveniently download your test reports
          </div>
          <span  className='text-white text-center md:mr-0'>from this report page</span> 
          <a onClick={generatePDF}>
              <button className="text-white bg-blue-500 rounded-lg text-center mt-5 md:mr-10 px-4 py-2">
                  Download 
              </button>
          </a>
      </div>
  </div>
)
}


export default Pdf

