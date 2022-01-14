import React from "react"
import bck from '../../assests/bck.png'
import machine from '../../assests/machine.png'
class VendingMachine extends React.Component {
    render() {
      return (
        <div
        style={{
          backgroundImage : `url(${bck})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          
          width: '100vw',
          height: '100vh',
         
        }}
        
        >
          
          <img src={machine} alt="machine"
          style={{width: '40vw', height: '100vh', position: 'absolute',  left: '50vw'}}
          />
          
       
         
        </div>
      );
    }
  }

  export default VendingMachine;
