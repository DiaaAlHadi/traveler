import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import swal from 'sweetalert';
export default function Reservations() {
    let loged;
    if (localStorage.getItem('auth_token')) {
        loged = 1;
    }
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [flightReservation, setFlightReservation] = useState([]);
    const [touristReservation, setTouristReservation] = useState([]);
    useEffect(() => {
        axios
            .get(`https://tourism-agency.ddns.net/api/flighttripbookings`)
            .then(res1 => {
                if (res1.status === 200) {
                    setFlightReservation(res1.data)
                }
                setLoading(false);
            })
            .catch(res => {
                swal("Warning", "You Must Login First", "warning")
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        axios
            .get(`https://tourism-agency.ddns.net/api/touristtripbookings`)
            .then(res2 => {

                if (res2.status === 200) {
                    setTouristReservation(res2.data)
                }
                setLoading2(false);
            })
            .catch(res => {
                swal("Warning", "You Must Login First", "warning")
                setLoading2(false);
            })
    }, []);

    const deleteitem = (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        axios.delete(`https://tourism-agency.ddns.net/api/deleteflighttripbooking/${id}`).then(res=>{
            swal("Success","Reservation Was Deleted Successflly","success");
            thisClicked.closest("tr").remove();
        }).catch(err=>{
            console.log(err.response.data);
        });
    }
    const deleteitem2 = (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        axios.delete(`https://tourism-agency.ddns.net/api/deletetouristtripbooking/${id}`).then(res=>{
            swal("Success","Reservation Was Deleted Successflly","success");
            thisClicked.closest("tr").remove();
        }).catch(err=>{
            console.log(err.response.data);
        });
    }

    let viewflightreservation_HTMLTABLE = "";
    let viewtouristreservation_HTMLTABLE = "";
    if (loading2) {
        return <h3>Loading Tourist Reservations...</h3>
    }
    else {
        viewtouristreservation_HTMLTABLE =
            touristReservation.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.trip_num}</td>
                        <td>{item.clientpassportnumber}</td>
                        <td>{item.date}</td>
                        <td>{item.vip}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td><Link to={`edittouristreservation/${item.id}`}><button className="btn btn-background btn-sm text-light"><img src="/images/edit.png" alt="edit" /></button></Link></td>
                        <td>
                            <button className="btn btn-background btn-sm text-light" onClick={(e)=> deleteitem2(e, item.id)}>
                                <img src="/images/delete.png" alt="delete" />
                            </button>
                        </td>
                    </tr>
                )
            });
    }
    if (loading) {
        return <h3>Loading Flight Reservations...</h3>
    }
    else {
        viewflightreservation_HTMLTABLE =
            flightReservation.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.trip_num}</td>
                        <td>{item.clientpassportnumber}</td>
                        <td>{item.date}</td>
                        <td>{item.vip}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td><Link to={`editflightreservation/${item.id}`}>
                            <button className="btn btn-background btn-sm text-light">
                                <img src="/images/edit.png" alt="edit" />
                            </button></Link>
                        </td>
                        <td>
                            <button className="btn btn-background btn-sm text-light" onClick={(e)=> deleteitem(e, item.id)}>
                                <img src="/images/delete.png" alt="delete" />
                            </button>
                        </td>
                    </tr>
                )
            });
    }
    if (loged === 1) {
        return (
            <Tabs
                defaultActiveKey="touristtrip"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="touristtrip" title="Tourist Reservation">
                    <div className="container-fluid mt-3">

                        <div className="row table-responsive justify-content-center">
                            <div className="col-12 text-center">
                                <h2 className="main-color mb-3">Tourist Trip Reservations</h2>
                                <div className="text-end mb-3">
                                    <span className="h4">Add a New Reservation
                                        <Link to='touristreservation'>
                                            <button className="btn btn-background btn-sm text-light ms-2">
                                                <img src="/images/add.png" alt="add new reservation" />
                                            </button>
                                        </Link>
                                    </span>
                                </div>
                                <table className="table table-bordered  justify-content-center text-center">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Trip Number</th>
                                            <th>Passport Number</th>
                                            <th>Date</th>
                                            <th>VIP</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewtouristreservation_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="flighttrip" title="Flight Reservation">
                    <div className="container-fluid mt-3">

                        <div className="row table-responsive justify-content-center">
                            <div className="col-12 text-center">
                                <h2 className="main-color mb-3">Flight Trip Reservations</h2>
                                <div className="text-end mb-3">
                                    <span className="h4">Add a New Reservation
                                        <Link to='flighttripreservation'>
                                            <button className="btn btn-background btn-sm text-light ms-2">
                                                <img src="/images/add.png" alt="add new reservation" />
                                            </button>
                                        </Link>
                                    </span>
                                </div>
                                <table className="table table-bordered  justify-content-center text-center">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Trip Number</th>
                                            <th>Passport Number</th>
                                            <th>Date</th>
                                            <th>VIP</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewflightreservation_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        );
    }
    else {
        return <Navigate replace to="/login" />;
    }

}