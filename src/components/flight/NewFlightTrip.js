import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import swal from 'sweetalert';
export default function NewFlightTrip() {
    let loged;
    if (localStorage.getItem('auth_token')) {
        loged = 1;
    }
    const Navigation = useNavigate();
    const [flightTrip, setFlightTrip] = useState({
        trip_number: '',
        departureairport: '',
        destination_airport: '',
        starttime: '',
        error_list: []
    })
    const handleInput = (e) => {
        e.persist();
        setFlightTrip({ ...flightTrip, [e.target.name]: e.target.value })
    }
    const submitFlightTrip = (e) => {
        e.preventDefault();
        const data = {
            trip_number: flightTrip.trip_number,
            departureairport: flightTrip.departureairport,
            destination_airport: flightTrip.destination_airport,
            starttime: flightTrip.starttime,
        }
        axios.post('http://tourism-agency.ddns.net/api/addflighttrip', data).then(res => {
            swal("Success", "Flight Trip Has Been Added", "success")
            Navigation("/flights");
        }).catch(err => {
            if (err.response.data.errors) {
                setFlightTrip({ ...flightTrip, error_list: err.response.data.errors })
            }
        });
    }
    if (loged === 1) {
        return (
            <section className=" gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration border-radius-custem  main-color" >
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add New Flight Trip</h3>
                                    <form onSubmit={submitFlightTrip}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="trip_number"
                                                        name="trip_number"
                                                        onChange={handleInput}
                                                        value={flightTrip.trip_number}
                                                        className="form-control form-control-lg"
                                                    />
                                                    <label className="form-label" htmlFor="trip_number">Trip Number</label><br />
                                                    <span className='error_color'>{flightTrip.error_list.trip_number}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="departureairport"
                                                        name="departureairport"
                                                        onChange={handleInput}
                                                        value={flightTrip.departureairport}
                                                        className="form-control form-control-lg"
                                                    />
                                                    <label className="form-label" htmlFor="departureairport">Departure Aireport</label><br />
                                                    <span className='error_color'>{flightTrip.error_list.departureairport}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="destination_airport"
                                                        name="destination_airport"
                                                        onChange={handleInput}
                                                        value={flightTrip.destination_airport}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="destination_airport">Destination Airport</label><br />
                                                    <span className='error_color'>{flightTrip.error_list.destination_airport}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="starttime"
                                                        name="starttime"
                                                        onChange={handleInput}
                                                        value={flightTrip.starttime}
                                                        placeholder="13:30 24/9/2022"
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="starttime">Start Time</label><br />
                                                    <span className='error_color'>{flightTrip.error_list.starttime}</span>
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