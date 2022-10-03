import React, { useState, useEffect } from 'react';
import './BuyTicket.css';
import { ethers } from 'ethers';
import BWContract from '../ABIJSON/BWContract.json';
import Destinations from './AvaiableDestinations/Destinations.json';


const TicketSale = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [contract, setContract] = useState(null);

    const connectedWallet = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setIsConnected(true)
    }
    const connectContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(BWContract.address, BWContract.abi, signer);
        setContract(contract)
    }
    const buyATicket = async () => {
        const buyATicketFunction = await contract.buyTicket("Dubai", { value: '500000000000000000' })
        console.log(buyATicketFunction)
    }
    useEffect(() => {
        connectedWallet();
        connectContract();
    }, [])
    return (
        <div>
            <div className='destination'>
                {
                    Destinations.map((item, index) => {
                        return (
                            <div className='json-info'>
                                <img src={item.image} alt="" />
                                <h3>{item.city}</h3>
                                <h3>Price: {item.price} ETH</h3>
                                <button className='buy-button' onClick={buyATicket}>Buy ticket</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TicketSale