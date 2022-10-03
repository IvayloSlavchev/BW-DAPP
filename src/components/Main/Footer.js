import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
  const info = [
    "We are first bulgarian DAO. Our porpouse is to change the airplane industry, because " + 
    "we believe that planes should be the most securest and cheapest transport in the world.",
    "As a Blockchain based company we don't have bosses and 'parents' to tell how to do our job, " + 
    "so if you love the freedom of the Blockchain please join our organization, or see the list of destinations."
  ]
  return (
    <footer className='footer-component'>
        <div className='title'>
            <h1>About us</h1>
            <h2>We love planes and Blockchain</h2>
        </div>
        <div className='picture-and-plaintext'>
            <div className='picture'>
                <img src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="" />  
             </div>
             <div className='information'>
                {
                  info.map((item, index) => {
                    return(
                      <div key={index}>
                        <h1>{item}</h1>
                      </div>
                    )
                  })
                }
             </div>
        </div>
    </footer>
  )
}

export default Footer