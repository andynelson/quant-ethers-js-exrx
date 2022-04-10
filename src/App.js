
function App() {
  return (
    <div className="App">
      <button onClick={() => {
        let { ethereum } = window;
        if (ethereum) {
          ethereum.request({ method: 'eth_requestAccounts'})
            .then(accounts => {
              console.log("Accounts connected\n", accounts);
            })
        }
      }}>Connect wallet</button>
    </div>
  );
}

export default App;
