import React from 'react';
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import swal from 'sweetalert';
export default function Dashboard() {
    let role;
    let loged;
    if(localStorage.getItem('auth_token')){
        loged = 1;
        role = parseInt( localStorage.getItem('auth_Admin'));
    }
    const username = localStorage.getItem("username");
    if (loged === 1) {
        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row main-row mb-md-5">
                            <div className="text-center mt-2">
                                <div className=" mx-auto main-card col-lg-4">
                                    <h2 className="mt-2">Welcom back {username}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row second-row justify-content-evenly mx-auto">
                            <div className="Reservations col-xl-3 col-lg-3 p-3 my-2 me-lg-2">
                                <Link to="reservations" className=" text-center  Reservations-link ">
                                    <div>
                                        <img src="./images/reservation.png" alt="Reservations icon" height="50px" width="50px" />
                                        <h3 className="mt-3">Reservations</h3>
                                    </div>
                                </Link>
                            </div>
                            <div className="Customers col-xl-3 col-lg-3 p-3 my-2 me-lg-2">
                                <Link to='customers' className=" text-center  Customers-link ">
                                    <div>
                                        <img src="./images/costumer.png" alt="Customers icon" height="50px" width="50px" />
                                        <h3 className="mt-3">Customers</h3>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-xl-3 col-lg-3 p-3 my-2 me-lg-2 Flights">
                                <Link to="flights" className=" text-center  Flights-link ">
                                    <div>
                                        <img src="./images/flights.png" alt="Flights icon" height="50px" width="50px" />
                                        <h3 className="mt-3">Flights</h3>
                                    </div>
                                </Link>
                            </div>
                            {
                            role !== 0 && <div className="Employees col-xl-11 col-lg-11 p-3 my-2 me-lg-2 ">
                                <Link to="employees" className=" text-center  Employees-link ">
                                    <div>
                                        <img src="./images/employees.png" alt="Employees icon" height="50px" width="50px" />
                                        <h3 className="mt-3">Employees</h3>
                                    </div>
                                </Link>
                            </div>
                            }

                        </div>
                    </div>

                </main>
               
            </div>

        );
    }
    else {
        swal("Warning", "You Must Login First", "warning");
        return <Navigate replace to="/login" />;
    }
}