import React, { useState, useEffect } from 'react';
import './Header.css';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const Header = () => {
    const [userWallet, setUserWallet] = useState(null);
    const [signerAccount, setSignerAccount] = useState(null);

    const connectWallet = async () => {
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserWallet(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSignerAccount(signer);
    }
    return (
        <div className='header-class'>
            <div className='title-moto'>
            <Link to='/' className='link-buttons'><h2>Bulgarian Wings ✈️</h2></Link>
            </div>
            <div className='options'>
                <ul className='options-ul'>
                    <Link to='/buy' className='link-buttons'><li>Buy a ticket</li></Link>
                    <Link to='participant' className='link-buttons'><li>Become a participant</li></Link>
                    {
                        !userWallet ? <button onClick={() => {
                            connectWallet();
                        }} className='connect-button'>Connect Wallet</button> : <li>{userWallet}</li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header