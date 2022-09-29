import Navbar from "./Navbar";
import Footer from "./Footer";
import React from 'react';


import { Outlet } from 'react-router-dom';
export default function MasterLayout() {
    return (
        <>
            <Navbar />

            <Outlet/>
            <Footer />
        </>
    );
}