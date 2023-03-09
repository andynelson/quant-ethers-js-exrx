import { useState } from "react";
import { ethers } from "ethers";
 
function App() {
  let [text, setText] = useState("");
  let [savedText, setSavedText] = useState("");
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
            .then(() => {
              setText("");
            });
        }
      }}>
          <input type="submit" value="grow" />
      </form>

      <form onSubmit={(e) => {
        e.preventDefault();
        if (contract && connected) {
          contract.eat()
            .then(() => {
              setText("");
            });
        }
      }}>
          <input type="submit" value="eat" />
      </form>
 
      <button onClick={() => {
console.log({contract})
        if (contract && connected) {
          contract.supply()
            .then(text => {
              text = text.toString()
console.log({text})
              setSavedText(text);
            })
        }
      }}>Get Text</button>
 
      <span>{savedText}</span>
    </div>
  );
}
 
export default App;
