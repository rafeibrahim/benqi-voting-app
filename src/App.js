import './styles/App.css';
import { ethers } from 'ethers';
import { useEffect, useState, useCallback } from 'react';
import veQIContract from './avalanche/veQi';
import gauageControllerContract from './avalanche/gaugeController';
import NavBar from './components/NavBar';
import UserInfo from './components/UserInfo';
import NodesList from './components/NodesList';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [vQContract, setVQContract] = useState();
  const [gCContract, setGCContract] = useState();
  const [validatorNodesArray, setValidatorNodesArray] = useState([]);
  const [userVeQIBalance, setUserVeQIBalance] = useState('');
  const [veQITotalSupply, setVeQITotalSupply] = useState('');

  useEffect(() => {
    getCurrentWallet();
    walletListener();
  }, []);

  // function to connect to MetaMask account
  const connectWallet = async () => {
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      try {
        // MetaMask extension found
        //getting MetaMask provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        //getting accounts with provider
        const accounts = await provider.send('eth_requestAccounts', []);

        // setting up local contracts instances
        setVQContract(veQIContract(provider));
        setGCContract(gauageControllerContract(provider));

        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // MetaMask not found
      console.log('Please install MetaMask extension');
    }
  };

  // function to fetch logged in MetaMask account
  const getCurrentWallet = async () => {
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      try {
        // MetaMask extension found
        //creating provider instance with MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        //getting accounts with provider
        const accounts = await provider.send('eth_accounts', []);

        if (accounts.length > 0) {
          // setting up local contracts instances
          setVQContract(veQIContract(provider));
          setGCContract(gauageControllerContract(provider));

          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log('Connect to MetaMask using button on top right!');
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // MetaMask not found
      console.log('Please install MetaMask extension');
    }
  };

  // attach listener function in case user changes the MetaMask account
  const walletListener = async () => {
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log('from walletListener', accounts[0]);
        } else {
          setWalletAddress('');
          setGCContract(null);
          setVQContract(null);
        }
      });
    } else {
      // MetaMask not found
      setWalletAddress('');
      console.log('Please install MetaMask extension');
    }
  };

  // function for getting total supply from veQI contract
  const getVeQITotalSupplyHandler = useCallback(async () => {
    try {
      const response = await vQContract.totalSupply();
      setVeQITotalSupply(response);
    } catch (error) {
      console.log(error.message);
    }
  }, [vQContract]);

  // function for getting balance of user from veQI contract
  const getUserVeQIBalance = useCallback(async () => {
    try {
      const response = await vQContract.balanceOf(walletAddress);
      setUserVeQIBalance(response);
    } catch (error) {
      console.log(error.message);
    }
  }, [vQContract, walletAddress]);

  // useEffect for for fetching data when veQI contract's local instance is set
  useEffect(() => {
    if (vQContract) {
      getUserVeQIBalance();
      getVeQITotalSupplyHandler();
    }
  }, [vQContract, getUserVeQIBalance, getVeQITotalSupplyHandler]);

  // function for getting validator nodes from gauge controller contract
  const getValidatorNodesHandler = useCallback(async () => {
    try {
      //fetching total length of nodes
      const nodesLengthResponse = await gCContract.getNodesLength();
      const totalNodes = Number(nodesLengthResponse.toNumber());
      //fetching full range of nodes
      const nodesArrayResponse = await gCContract.getNodesRange(
        0,
        totalNodes - 1
      );

      //variable for holding total votes
      let totalVotesInBigNumber = ethers.BigNumber.from(0);

      //fetching votes for each individual node and creating new
      //array with node objects containing address and node votes.
      const promises = nodesArrayResponse.map(async (node) => {
        const nodeVotes = await gCContract.getVotesForNode(node);
        totalVotesInBigNumber = totalVotesInBigNumber.add(nodeVotes);
        return { address: node, votes: nodeVotes };
      });
      const nodesObjectArray = await Promise.all(promises);

      //calculating relative weight percentage and adding it to each
      //node object in the array.
      nodesObjectArray.forEach((nodeObject) => {
        // using FixedNumber API to deal with decimal numbers
        const relativeWeight = ethers.FixedNumber.fromString(
          nodeObject.votes.toString()
        ).divUnsafe(
          ethers.FixedNumber.fromString(totalVotesInBigNumber.toString())
        );
        nodeObject.relativeWeightPercent = relativeWeight * 100;
      });
      setValidatorNodesArray(nodesObjectArray);
    } catch (error) {
      console.log(error.message);
    }
  }, [gCContract]);

  // useEffect for for fetching data when gauage controller contract's local instance is set
  useEffect(() => {
    if (gCContract) {
      // calling function to fetch nodes
      getValidatorNodesHandler();
    }
  }, [gCContract, getValidatorNodesHandler]);

  return (
    <>
      <NavBar
        handleMetaMaskButton={connectWallet}
        walletAddress={walletAddress}
      />
      {walletAddress ? (
        <div>
          <UserInfo
            walletAddress={walletAddress}
            userVeQIBalance={userVeQIBalance}
            veQITotalSupply={veQITotalSupply}
          />
          <NodesList nodeListArray={validatorNodesArray} />
        </div>
      ) : (
        <h2 className="metamask-connect-message">
          Please connect your MetaMask wallet to show statistics!
        </h2>
      )}
    </>
  );
}

export default App;
