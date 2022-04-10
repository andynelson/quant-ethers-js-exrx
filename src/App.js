import { useState } from "react";
import { ethers } from "ethers";

function App() {
  let [text, setText] = useState('');
  const [savedText, setSavedText] = useState("");
  let [connected, setConnected] = useState(false);

  return (
    <div className="App">
      <button onClick={() => {
        let { ethereum } = window;
        if (ethereum && !connected) {
          ethereum.request({ method: 'eth_requestAccounts'})
            .then(accounts => {
              setConnected(true);
            })
        }
      }}>{!connected ? 'Connect wallet' : 'Connected' }</button>

      <form onSubmit={(e) => {
        e.preventDefault();
        let { ethereum } = window;
        if (ethereum) {
          let abi = JSON.parse('[{"inputs": [{"internalType": "string","name": "newText","type": "string"}],"name": "changeText","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "text","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}]')
          let address = '0x354253459DE646F37b3BBdBAe7Ab26830F09feE6';
          let provider = new ethers.providers.Web3Provider(ethereum);
          let signer = provider.getSigner();
          let contract = new ethers.Contract(address, abi, signer);
          contract.changeText(text)
          .then(() => {
            setText("");
          });
        }
        
      }}>
        <input type="text" placeholder="Enter text" onChange={e => setText(e.currentTarget.value)} value={text} />
        <input type="submit" value="save to contract" />
      </form>

      <button onClick={() => {
        let { ethereum } = window;
        if (ethereum) {
          setSavedText('fetching...');
          let abi = JSON.parse('[{"inputs": [{"internalType": "string","name": "newText","type": "string"}],"name": "changeText","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "text","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}]')
          let address = '0x354253459DE646F37b3BBdBAe7Ab26830F09feE6';
          let provider = new ethers.providers.Web3Provider(ethereum);
          let signer = provider.getSigner();
          let contract = new ethers.Contract(address, abi, signer);
          contract.text()
            .then(text => {
              setSavedText(text);
            })
        }
      }}>Get Text</button>

      {savedText}
    </div>
  );
}

export default App;
