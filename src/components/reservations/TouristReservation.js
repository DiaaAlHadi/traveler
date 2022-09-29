import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
export default function FlightTripReservation() {
    let loged;
    if (localStorage.getItem('auth_token')) {
        loged = 1;
    }
    const Navigation = useNavigate();
    const [reservation, setReservation] = useState({
        trip_num: '',
        clientpassportnumber: '',
        date: '',
        vip: '',
        error_list:[]
    })
    const handleInput = (e) => {
        e.persist();
        setReservation({ ...reservation, [e.target.name]: e.target.value })
    }

    const submitReservation = (e) => {
        e.preventDefault();
        const data = {
            trip_num: reservation.trip_num,
            clientpassportnumber: reservation.clientpassportnumber,
            date: reservation.date,
            vip: reservation.vip,
        }

        axios.post(`http://tourism-agency.ddns.net/api/addtouristtripbooking`, data).then(res => {
            swal("Success", "reservation added successfully!", "success");
            Navigation("/reservations");
        }).catch(err=>{
            if(err.response.data.errors){
                setReservation({...reservation, error_list:err.response.data.errors})
            }
        });
    }
    if (loged === 1) {
        return (
            <section className=" trip-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration border-radius-custem  main-color" >
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Tourist Trip Booking</h3>
                                    <form onSubmit={submitReservation}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="trip_num"
                                                        name="trip_num"
                                                        onChange={handleInput}
                                                        value={reservation.trip_num}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="trip_num">Trip Number</label><br />
                                                    <span className='error_color'>{reservation.error_list.trip_num}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="clientpassportnumber"
                                                        name="clientpassportnumber"
                                                        onChange={handleInput}
                                                        value={reservation.clientpassportnumber}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="clientpassportnumber">Client Passport Number</label><br />
                                                    <span className='error_color'>{reservation.error_list.clientpassportnumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="date"
                                                        name="date"
                                                        onChange={handleInput}
                                                        value={reservation.date}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="date">Date</label><br />
                                                    <span className='error_color'>{reservation.error_list.date}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="number"
                                                        id="vip"
                                                        name='vip'
                                                        onChange={handleInput}
                                                        value={reservation.vip}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="vip" >1 if VIP 0 if not VIP</label><br />
                                                    <span className='error_color'>{reservation.error_list.vip}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-2">
                                            <input className="btn btn-background text-light btn-lg" type="submit" value="Submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        swal("Warning", "You Must Login First", "warning");
        return <Navigate replace to="/login" />;
    }
}