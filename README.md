# BenQI Liquid Staking Voting Dashboard

## About the App
This application has been developed as an interview assignment and to learn DAPP development. DAPP is built on decentralised network that combines smart contract (program stored on the blockchain) and a frontend user interface. This application displays voting statistics of validator nodes for BenQI Liquid Staking Protocol built on Avalanche blockchain. It interacts with following smart contracts to display these statistics. 

1. [VeQI Smart Contract](https://snowtrace.io/address/0x7Ee65Fdc1C534A6b4f9ea2Cc3ca9aC8d6c602aBd)
2. [Gauage Controller Smart Contract](https://snowtrace.io/address/0x14593cb3Ffe270a72862Eb08CeB57Bc3D4DdC16C)

### Implemented Features
1. App can connect to user's MetaMask account.
2. Detect already connected MetaMask account.
3. Detect change in connected MetaMask account.
4. Display veQI total supply.
5. Display connected user's veQI balance. 
6. Display list of validator nodes with their total votes and relative weight percentage.

## Screenshot

<img width="1352" alt="Screenshot 2023-04-10 at 15 21 41" src="https://user-images.githubusercontent.com/22117035/230900656-0d475d99-d2d0-4703-80b0-2b87a42945d5.png">

## Technologies

HTML, CSS, JavaScript, React.js, Ethers.js, BigNumber.js, FixedNumber.js

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This application is still in development mode. 
In order to run this app in dev mode in your local machine. Please follow the following steps
1. Download or clone the repository
2. Run npm intall to install node_modules folder
3. Run npm run start to run the add in dev mode.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
