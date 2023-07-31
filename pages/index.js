<!DOCTYPE html>
<html>
  <head>
    <title>CONNECTION TO METAMASK</title>
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.2.7-rc.0/web3.min.js"
    ></script>
    <!-- <style>
      html {
        background-color: #a683e3;

        min-height: 1000px;
      }
      body {
        font-size: 33px;
        text-align: center;
      }
      button {
        font-size: 33px;

        border-radius: 10px;
      }
      button:hover {
        background-color: #ffd6ff;
      }
      .show {
        height: fit-content;
        width: fit-content;
        margin: 100px 500px;
        padding: 20px;
        background-color: #edede9;
        border-radius: 5px;
      }
    </style> -->
  </head>
  <body>
    <div>
      <p>Your Account: {account}</p>
      <p>Your Balance: {balance}</p>
      <button onclick="connectMetamask()">Connect to metamask</button> <br />
      <p id="accountArea"></p>
      <button onclick="connectContract()">Contract Connected</button> <br />
      <p id="contractArea"></p>
      <button onClick="mint()">Deposit 1 ETH</button>
      <p id="numberArea"></p>
      <button onClick="burn()">Withdraw 1 ETH</button>
      <p id="messageArea"></p>
    </div>
    <!-- <div class="show">
      <button onclick="connectMetamask()">Connect to metamask</button> <br />
      <p id="accountArea"></p>
      <button onclick="connectContract()">Contract Connected</button> <br />
      <p id="contractArea"></p>

      <button onclick="mint()">Get the Balance</button> <br />
      <p id="numberArea"></p>
      <button onclick="burn()">My view</button> <br />
      <p id="messageArea"></p>
    </div> -->

    <script>
      /////
      let account;
      const connectMetamask = async () => {
        if (window.ethereum !== "undefined") {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          account = accounts[0];
          document.getElementById("accountArea").innerHTML = account;
        }
      };

      const connectContract = async () => {
        const ABI = [
          {
            inputs: [
              {
                internalType: "uint256",
                name: "initBalance",
                type: "uint256",
              },
            ],
            stateMutability: "payable",
            type: "constructor",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "withdrawAmount",
                type: "uint256",
              },
            ],
            name: "InsufficientBalance",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "Deposit",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "Withdraw",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "a",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "b",
                type: "uint256",
              },
            ],
            name: "addition",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "balance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "checkOwner",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "deposit",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "a",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "b",
                type: "uint256",
              },
            ],
            name: "division",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "getBalance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "a",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "b",
                type: "uint256",
              },
            ],
            name: "multiplication",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [
              {
                internalType: "address payable",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_withdrawAmount",
                type: "uint256",
              },
            ],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ];

        const Address = "0xBc5384e910B035537340B785d064C4036a72C820";
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        document.getElementById("contractArea").innerHTML =
          "connected to smart contract";
      };

      const mint = async () => {
        const data = await window.contract.methods.deposit().call();
        document.getElementById(
          "numberArea"
        ).innerHTML = `Contract Balance: ${data}`;
      };
      const burn = async () => {
        const message = await window.contract.methods.withdraw().call();
        document.getElementById("messageArea").innerHTML = message;
      };
      // const deposit = async () => {
      //     if (atm) {
      //       let tx = await atm.deposit(1);
      //       await tx.wait();
      //       getBalance();
      //     }
      //   };

      //   const withdraw = async () => {
      //     if (atm) {
      //       let tx = await atm.withdraw(1);
      //       await tx.wait();
      //       getBalance();
      //     }
      //   };
    </script>
  </body>
</html>
