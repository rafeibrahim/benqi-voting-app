import '../styles/NavBar.css';

const NavBar = (props) => {
  const { handleMetaMaskButton, walletAddress } = props;
  return (
    <nav className="navigation-bar">
      <h1>Benqi Liquid Staking Voting Dashboard</h1>
      <button onClick={handleMetaMaskButton}>
        {walletAddress && walletAddress.length > 0
          ? `Connected: ${walletAddress.substring(
              0,
              6
            )}... ${walletAddress.substring(38)}`
          : 'Connect to MetaMask'}
      </button>
    </nav>
  );
};

export default NavBar;
