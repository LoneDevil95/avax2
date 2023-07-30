import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ownerName, setOwnerName] = useState(undefined);
  const [add, setAdd] = useState(undefined);
  const [sub, setSub] = useState(undefined);
  const [mult, setMult] = useState(undefined);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  
  const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      window.ethereum.on("accountsChanged", (accounts) => {
        handleAccount(accounts);
      });
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({method: "eth_accounts"});
      handleAccount(accounts);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }
  const checkOwner = async () => {
    if (atm) {
      let owner = await atm.checkOwner();
      setOwnerName("Pratham");
    }
  }
  const addition = async () => {
      if (atm) {
        const a = parseInt(first);
        const b = parseInt(second);
        const answer = await atm.addition(a,b);
        setAdd(answer);
      }
  }  
  const multiplication = async () => {
    if (atm) {
      const a = parseInt(first);
      const b = parseInt(second);
      const answer = await atm.multiplication(a,b);
      setMultiply(answer);
    }
  }
  const division = async () => {
    if (atm) {
      const a = parseInt(first);
      const b = parseInt(second);
      const answer = await atm.division(a,b);
      setDivide(answer);
    }
  }
  const handleInputAChange = (event) => {
    setInputA(event.target.value);
  };

  const handleInputBChange = (event) => {
    setInputB(event.target.value);
  };

  
  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <>
        <div>
          <p>Your Account: {account}</p>
          <p>Your Balance: {balance}</p>
          <p>Owner Name: {ownerName}</p>
  
          <button style={{ backgroundColor: "#cyan" }} onClick={deposit}>
            Deposit 1 ETH
          </button>
          <button style={{ backgroundColor: "blue" }} onClick={withdraw}>
            Withdraw 1 ETH
          </button>
        </div>
  
        <div>
          <h2>Calculator</h2>
          <p>Add: {add ? add.toString() : ""}</p>
          <p>Sub: {sub ? sub.toString() : ""}</p>
          <p>Multiply: {mult ? mult.toString() : ""}</p>

          <input
            type="number"
            placeholder="Enter first value"
            value={first}
            onChange={handleInputAChange}
          />
          <input
            type="number"
            placeholder="Enter second value"
            value={second}
            onChange={handleInputBChange}
          />
  
          <button style={{ backgroundColor: "red" }} onClick={addition}>
            Add
          </button>
          <button style={{ backgroundColor: "red" }} onClick={multiplication}>
            Multiply
          </button>
          <button style={{ backgroundColor: "red" }} onClick={division}>
            Divide
          </button>
        </div>
      </>
    );
    
  }

  useEffect(() => {
    getWallet();
    checkOwner();
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome </h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
        
      `}
      </style>
    </main>
  )
}
