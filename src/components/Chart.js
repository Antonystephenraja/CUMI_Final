import React from "react";
import { Line } from "react-chartjs-2";
import Select from 'react-select';



const Chart = ({chartdata,Devicenames}) => {


  //console.log("Devicenames",Devicenames[0].Device_ID)
  const thickness = chartdata.map((item) => item.thickness );
  const devicename = chartdata.map((item) => item.device_name );
  const battery = chartdata.map(item => {
    const values = item.battery_status.split(','); 
    const firstValue = parseInt(values[0]);
    let Battery_percentage = (firstValue - 437) * (100 - 0) / (776 - 437) + 0;
    Battery_percentage = Battery_percentage > 100 ? 100 : Battery_percentage < 0 ? 0 : Battery_percentage;
    Battery_percentage = Number(Battery_percentage.toFixed(2));
    return Battery_percentage; 
  });

  const time = chartdata.map(item => item.timestamp);

  const Data_freequences = [
    
    // { label: 'XY00001', value: 'XY00001' },
    // { label: 'XY00002', value: 'XY00002' },
    // { label: 'XY00003', value: 'XY00003' },
    // { label: 'XY00004', value: 'XY00004' },
    // { label: 'XY00005', value: 'XY00005' },
  ];

  for(let i =0;i<=29 ; i++){

    let devicenames_value= Devicenames[i] ? Devicenames[i].Device_Name:"N/A";
    let incre_a = i+1
    const devicenumber = `XY${incre_a.toString().padStart(5,'0')}`;
    Data_freequences.push({label:devicenames_value,value:devicenumber})
  }



  const customStyles_2 = {
    control: (provided) => ({
      ...provided,
      // backgroundColor: '#2d2d2d',
      borderColor:'#2d2d2d',
      color: 'black',
    }),
    option: (provided, state) => ({
      ...provided,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#D3D2D1', 
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: '#fffff', 
    }),
  };

  const handle_dropdown_Change = async(selectedOption) => {
    localStorage.setItem("DeviceId",selectedOption.value)
  }

const data = {
  labels: time,
  datasets: [
    {
      label: 'Dataset 1',
      data: thickness,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Dataset 2',
      data: battery,
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }
  ]
};

  // const data={
  //   labels:time,
  //   datasets:[
  //     {
  //       data:thickness,
  //       backgroundColor:'transparent',
  //       borderColor:'#08B8FF',
  //       pointBorderColor:'transparent',
  //     },
  //     {
  //       data: battery ,
  //       backgroundColor: 'transparent',
  //       borderColor: '#FF5733', 
  //       pointBorderColor: 'transparent',
  //     },
  //   ]
  // }


  return (
    <div className="chart_page">
      <div id="chart" className="bg-[#2d2d2d] ml-4 mr-4 mt-4 rounded-lg ">
        <div className="flex justify-center items-center">
          <div className="flex">
          <h3 className="font-bold mt-2 text-white">Select the DeviceId:</h3>
            <Select  className="w-22 ml-2 mt-1 h-10" options={Data_freequences} styles={customStyles_2} isSearchable={true}  placeholder={`${devicename[0]}`} onChange={handle_dropdown_Change} />
          </div>
        </div>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Chart;
