import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Main = () => {
  return (
    <div>
      <div className='main-page'>
        <div className='moto'>
          <h2>Making your flying ticket compatable with your pocket</h2>
          <h3>Welcome to our DAO! We are so happy that you choice our services</h3>
          <Link to='/buy'><button className='buy-ticket'>View our list of destinations</button></Link>
        </div>
        <div className='DAO'>
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Main