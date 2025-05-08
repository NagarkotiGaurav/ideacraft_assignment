// src/pages/Home.jsx
import React,{ useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Landing from './Landing';
import Navbar from '../components/Navbar';

const Home = ()=> {
    return <>
    <Navbar/>
    <Outlet/>
    </>


}
export default Home