import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios"

function App() {
  const [data,setdata] = useState([])
  const [input,setinput]=useState("")
  const [DATA,setDATA]= useState([])
  
  const HandleChange =(event)=>{
    console.log(event.target.value)
    if(event.target.value !== "all"){
      const filteredData = data.filter((item)=>{
        return item.VehicleType === event.target.value
      })
      setDATA(filteredData)
    }else{
      setDATA(data)
    }
  }
  useEffect(()=>{
    axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?format=json").then((resp)=>{
      setdata(resp.data.Results)
    }).catch((err)=>{
      console.log(err)
    })
  },[data.length]);

  
  //HandleSearchBar
  const HandleSearchBar = (e)=>{
  if(e.key === "Enter"){
    if(input){
     const filteredData = data.filter((item)=>{
        return item.Name.toLowerCase().includes(input)
      })
      console.log(filteredData)
     return setDATA(filteredData)
    }else{
      return setDATA(data);
    }
  }
  }
  const [filt,setfilt]=useState(false)
  const [popup,setpopup]=useState([false])
  const DispayPopUp = (item)=>{
    setfilt(true);
    window.scrollTo(0, 0);
    setpopup(item)
    console.log(popup);
  }
  
  return (
    <div className="container">
     <div>
     <div className="Heading">
        <h1>Vehicle Manufacturer</h1>
      </div>
      <div className="Sub-Header">
          <div className="input-div">
          <label>Search:</label>
            <input type="text" placeholder="Search Here" 
            onChange={(e)=>{setinput(e.target.value.toLowerCase())}}
              onKeyPress={HandleSearchBar}
            />
          </div>
         <div>
         <label>Filter by Vehicle Type:</label>
          <select className="dropDown" onChange={HandleChange}>
          <option className="options" value="all">All</option>
          <option className="options" value="Passenger Car">Passenger Car</option>
          <option className="options" value="Truck">Truck</option>
          <option className="options" value="Bus">Bus</option>
          <option className="options" value="Multipurpose Passenger Vehicle (MPV)">Multipurpose Passenger Vehicle (MPV)</option>
          <option className="options" value="Motorcycle">Motorcycle</option>
          <option className="options" value="Trailer">Trailer</option>
          <option className="options" value="Low Speed Vehicle (LSV)">Low Speed Vehicle (LSV)</option>
          
          </select>
         </div>
         
      </div>
      <div className="table-container">
        <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Country</th>
            <th>Vehicle Type</th>
          </tr>
        </thead>
          <tbody>
            {
              !input &&
              data.map((item,index)=>{
                return  <tr key={index} onClick={()=>{DispayPopUp(item)}}>
                <td>{item.Name}</td>
                <td>{item.Country}</td>
                <td>{item.VehicleType}</td>
                </tr>
              })}
              {
               input  &&
              DATA.map((item,index)=>{
                return  <tr key={index} onClick={()=>{DispayPopUp(item)}}>
                <td>{item.Name}</td>
                <td>{item.Country}</td>
                <td>{item.VehicleType}</td>
                </tr>
              })
              }
           
          </tbody>
        </table>
      </div>
      {
        filt && 
        <div className="PopUp">
        <div>
        <h1>{popup.Name}</h1>
        <h3>{popup.Country}</h3>
        </div>
        <button onClick={()=>{setfilt(false)}}>close</button>
        </div>
      }
     </div>
    </div>
  );
}

export default App