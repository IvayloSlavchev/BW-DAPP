import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BWContract from '../ABIJSON/BWContract.json';
import "./Participant.css";
import Footer from '../Main/Footer';

const Participant = () => {
  const [contract, setContract] = useState(null);
  const [isParticipant, setIsParticipant] = useState(null);
  const [stacked, setStacked] = useState(null);
  const [isClicked, setIsClicked] = useState(false)
  const [members, setMembers] = useState(null);

  const connectContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(BWContract.address, BWContract.abi, signer);
    setContract(contract);
  }
  const becomeParticipant = async () => {
    try {
      await contract.becomeParticipant({ value: '15000000000000000000' });
      setIsParticipant(true)
      alert('Welcome!')
    } catch (err) {
      console.log(err)
    }
  }
  const leaveTheDAO = async () => {
    const leavingDAO = await contract.leaveDAO();
    setIsParticipant(false);
  }
  const moneyStacked = async () => {
    const getMoneyStacked = await contract.viewBalance();
    const formatedEther = ethers.utils.formatEther(getMoneyStacked);
    setStacked(formatedEther);
    const stackedEtherForDAO = await contract.stakedEther('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
    const formatedEtherForDAO = ethers.utils.formatEther(stackedEtherForDAO)
    setMembers(formatedEtherForDAO)
    setIsClicked(true)
  }
  useEffect(() => {
    connectContract();
  }, [])
  return (
    <div>
      <div className='not-connected'>
        <div className='not-participant'>
          <div className='quote-buttons'>
            <h2 className='txt'>Freedom to do whatever you want, whenever you want.</h2>
            <div className='about-become-participant-button'>
              <button className='btns' onClick={moneyStacked}>Learn more</button>
              {
                !isParticipant ? <button className='btns-2' onClick={becomeParticipant}>Become revolutoner</button> : <button className='btns-2' onClick={leaveTheDAO}>Bye legend 👋</button>
              }
            </div>
          </div>
        </div>
        {
          isClicked ? <div className='table-info'>
            <table className='table-content'>
              <thead>
                <tr>
                  <th>TVL</th>
                  <th>DAO ETH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{stacked} ETH</td>
                  <td>{members} ETH</td>
                </tr>
              </tbody>
            </table>
          </div> : null
        }
      </div>
    </div> 
  )
}

export default Participant