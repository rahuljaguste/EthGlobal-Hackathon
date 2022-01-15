import React from "react"

import machine from '../../assests/machine.png'

import A1 from '../../assests/cans/A1.jpg'
import A2 from '../../assests/cans/A2.jpg'
import A3 from '../../assests/cans/A3.jpg'
import A4 from '../../assests/cans/A4.jpg'
import B1 from '../../assests/cans/B1.jpg'
import B2 from '../../assests/cans/B2.jpg'
import B3 from '../../assests/cans/B3.jpg'
import B4 from '../../assests/cans/B4.jpg'
import C1 from '../../assests/cans/C1.jpg'
import C2 from '../../assests/cans/C2.jpg'
import C3 from '../../assests/cans/C3.jpg'
import C4 from '../../assests/cans/C4.jpg'



const images = {
  'A1' : A1,
  'A2' : A2,
  'A3' : A3,
  'A4' : A4,
  'B1' : B1,
  'B2' : B2,
  'B3' : B3,
  'B4' : B4,
  'C1' : C1,
  'C2' : C2,
  'C3' : C3,
  'C4' : C4,
}




function click(key){
  //remeber keys start at 1
  alert("You clicked number"+ key)
}
//console.log("Images are here:", images)


function Can(key, name, i,j){
 
  return <img src={images[`${name}`]} 
  style={{width: 50, height: 70, position:'absolute', zIndex: 2, top:120*i, left: j*70}}
  id={key} key={key.toString()}/>;


}




function Button(key, i,j) {
  return <button  id={key} key={key.toString()}
  style={{zIndex: 10,position: 'absolute',left: j*40, top:i*40,
  width: 35}}
  value={key}
  onClick={()=>click(key)}
  >
  {String.fromCharCode(64+i)}{j}
  
  </button>;
}



const buttons = [];
const cans = [];

let k = 1;
for (let i = 1; i <= 3; i++) {
  for (let j= 1; j <= 4; j++) {
    buttons.push(
      Button(k, i,j)
      );

      
      cans.push(
        Can(k, String.fromCharCode(64+i) + j, i,j )
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


      
          <div style={{position: 'absolute',  left: '23vw', top:'11vw'}}>
          {buttons}
          </div>


        {cans}
        
         
    
        </div>
      );
    }
  }

  export default VendingMachine;
