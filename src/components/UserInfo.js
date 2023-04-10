import '../styles/UserInfo.css'

const UserInfo = (props) => {
    const {walletAddress, userVeQIBalance, veQITotalSupply} = props
    return (
        <div className='user-container'>
            <h2>User Information</h2>
            <p>Wallet Address: {walletAddress}</p>
            <p>Total Supply: {veQITotalSupply.toString()} veQI</p>
            <p>My Balance: {userVeQIBalance.toString()} veQI</p>
        </div>
    )
};

export default UserInfo;