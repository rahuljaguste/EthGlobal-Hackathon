import React from "react";

import machine from "../../assests/machine.png";
import Out_of_service from "../../assests/Out_of_service.png";

/*

these are needed for the cans
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
*/

//console.log("Images are here:", images)

/*
function Can(key, name, i,j, amountLeft, amountMinted){
 
  return (
  
  <div  style={{position:'absolute', zIndex: 2, top:160*i-60, left: j*80-34, alignItems: "center", textAlign : 'center', backgroundColor : 'white'}} id={key} key={key.toString()}>
  
  {amountLeft}/{amountMinted}
  <img src={images[`${name}`]} 
  style={{width: '4vw', height: '10vh'}}
  />
  {name}
  </div>
  );


}*/

/*
@key is the dom key
@i is the column
@j is the row
@run is callback to the HOC to run some code
*/
function Button(key, i, j, run) {
  return (
    <button
      id={key}
      key={i * 10 + j}
      style={{
        zIndex: 10,
        position: "absolute",
        left: j * 40,
        top: i * 40,
        width: 35,
      }}
      value={key}
      onClick={() => run(key)}
    >
      {String.fromCharCode(64 + i)}
      {j}
    </button>
  );
}

const buttons = [];

class VendingMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCans: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      maxCans: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      isEmpty: false,
      lastPress: 0, //index + 1 since it starts at 1, 0 is a null value
      color: "green",
    };
  }

  isEmpty = async () => {
    //this asyncrounous checks if is empty
    //#TODO this is a perfect place to call an backend update function to see if anyone else minted any

    const resp = await this.getTokensLeft();

    if (resp && resp[0] === undefined) {
      return; //web3 isn't working
    }

    for (let i = 0; i < 12; i++) {
      if (this.state.currentCans[i] > 0) {
        return;
      }
    }
    this.setState({ isEmpty: true });
    alert("Empty");
  };

  /*  
this uses the prop function and makes an array of all the types of tokens

*/
  getTokensLeft = async () => {
    let tokens = Array.from({ length: 12 }, (_, i) => 1 + i);

    for (let i = 0; i < 12; i++) {
      tokens[i] = await this.props.getTokensLeft(i);
    }

    this.setState({ currentCans: tokens });
  };

  /*
this is what runs after a button has been clicked


@index is the index starting at 1(even though the array starts at 0 that's why -1 appears)
*/
  async click(index) {
    this.isEmpty();

    this.setState({ lastPress: index });
    if (this.state.currentCans[index - 1] == 0) {
      //alert(this.state.currentCans[this.state.lastPress] != 0)
      this.setState({ color: "red" });
      return;
    }

    if (this.state.color === "red") {
      //this allows for a flop if the user hits the button for an item that is avaible after hitting one that is not
      this.setState({ color: "green" });
    }
    // let temp = this.state.currentCans;

    // temp[index - 1] = temp[index - 1] - 1;

    //this.setState({ currentCans: cCans }); //decrements amount
  }

  componentDidMount() {
    this.getTokensLeft();
    console.log("current number left 1", this.state.currentCans);

    let k = 1;
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 4; j++) {
        buttons.push(Button(k, i, j, (key) => this.click(key)));

        k++;
      }
    }
    this.forceUpdate(); //forces it to reload have the buttons have been loaded
  }

  render() {
    return (
      <div style={{ position: "relative", left: 500 }}>
        <img src={machine} alt="machine" style={{ width: 600, height: 700 }} />

        {this.state.isEmpty ? ( //this simply renders the out of order sign
          <div style={{ position: "absolute", right: 350, top: 200 }}>
            <img
              src={Out_of_service}
              alt="out of service"
              style={{ width: "5vw", height: "20vh" }}
            />
          </div>
        ) : null}

        <div style={{ position: "absolute", left: 350, top: 160 }}>
          {buttons}
        </div>

        <div
          style={{
            position: "absolute",
            left: 432,
            top: 163,
            backgroundColor: this.state.color,
            width: 75,
            height: 20,
            textAlign: "center",
            borderRadius: 5,
          }}
        >
          {this.state.lastPress > 0 ? (
            <p
              style={{
                color: this.state.color === "green" ? "#1a3a08" : "#990000",
              }}
            >
              {this.state.currentCans[this.state.lastPress - 1]}/
              {this.state.maxCans[this.state.lastPress - 1]}
            </p>
          ) : null}
        </div>

        {this.props.isMintVisible ? (
          <div style={{ position: "absolute", left: 400, top: 330 }}>
            <button
              onClick={() => {
                this.props.handleMint(this.state.lastPress - 1);
              }}
              style={{ width: 140, color: "purple", borderRadius: 10 }}
            >
              Mint
            </button>
          </div>
        ) : (
          <div style={{ position: "absolute", left: 400, top: 330 }}>
            {this.props.Account}
          </div>
        )}
      </div>
    );
  }
}

export default VendingMachine;
