import React from "react"

import machine from '../../assests/machine.png'



function click(key){

  alert("You clicked number"+ key)
}



function Button(key, i,j) {
  return <button  id={key} key={key.toString()}
  style={{zIndex: 10,position: 'absolute',left: j*40, top:i*40,
  width: 35}}
  value={key}
  onClick={()=>click(key)}
  >
  {k}
  
  </button>;
}



const fields = [];

let k = 1;
for (let i = 1; i <= 3; i++) {
  for (let j= 1; j <= 4; j++) {
    fields.push(
      Button(k, i,j)
      );
     k++; 
  }
  
    
}




class VendingMachine extends React.Component {
      
      

    render() {
      return (
        <div style={{position: 'absolute',  left: '50vw'}}>
          
          <img src={machine} alt="machine"
          style={{width: '40vw', height: '100vh'}}
          />


      
          <div style={{position: 'absolute',  left: '23vw', top:'12vw'}}>
          {fields}
          </div>
        
    
        </div>
      );
    }
  }

  export default VendingMachine;
