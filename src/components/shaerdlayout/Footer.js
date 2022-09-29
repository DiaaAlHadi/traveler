import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="text-lg-start">
            <div className="p-3 copyright text-light">
                <span>© 2022 Copyright:  </span>
                <Link className="text-light" to="/">Traveler.com</Link>
            </div>
        </footer>
    );
}