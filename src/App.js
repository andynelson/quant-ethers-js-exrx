import { useState } from "react";
import { ethers } from "ethers";
 
function App() {
  let [supply, setSupply] = useState("");
  let [savedSupply, setSavedSupply] = useState("");
  let [connected, setConnected] = useState(false);
 
  let { ethereum } = window;
  let contract = null;
 
  if (ethereum) {
 
    let abi = [
      "function grow()",
      "function eat()",
      "function supply() view returns (uint)"
    ]

    let address = "0x2a9ca3dc2eb60487993300eb15099c3e1f1c69f4";
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    contract = new ethers.Contract(address, abi, signer);
  }
 
  return (
    <div className="App">

      <h1>Tomato Garden</h1>
 
      <button onClick={() => {
          if (contract && !connected) {
              ethereum.request({ method: 'eth_requestAccounts'})
                  .then(accounts => {
                      setConnected(true);
                  })
          }
      }}>{!connected ? 'Connect wallet' : 'Connected' }</button>
 
      <form onSubmit={(e) => {
        e.preventDefault();
        if (contract && connected) {
          contract.grow()
        }
      }}>
          <input type="submit" value="Grow" />
      </form>

      <form onSubmit={(e) => {
        e.preventDefault();
        if (contract && connected) {
          contract.eat()
        }
      }}>
          <input type="submit" value="Eat" />
      </form>
 
      <button onClick={() => {
        if (contract && connected) {
          contract.supply()
            .then(supply => {
              supply = supply.toString()
              setSavedSupply(supply);
            })
        }
      }}>Get Supply</button>
 
      <h3>{savedSupply} Tomatoes</h3>
    </div>
  );
}
 
export default App;
