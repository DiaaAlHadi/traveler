import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import swal from 'sweetalert';
export default function Editflight() {
    let loged;
    if (localStorage.getItem('auth_token')) {
        loged = 1;
    }
    const Navigation = useNavigate();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    let idnum = id;
    const [flightTrip, setFlightTrip] = useState([]);
    const [errors, setErrors] = useState({
        error_list: []
    })
    useEffect(() => {
        axios.get(`https://tourism-agency.ddns.net/api/flighttrips/${id}`, { validateStatus: false }).then(res => {
            setFlightTrip(res.data);
            setLoading(false);
        }).catch(res => {
            swal("Warning", "You Must Login First", "warning")
            setLoading(false);
        });
    }, [id]);
    const handleInput = (e) => {
        e.persist();
        setFlightTrip({ ...flightTrip, [e.target.name]: e.target.value })
    }
    const updateFlight = (e) => {
        e.preventDefault();
        const data = flightTrip;
        axios.put(`https://tourism-agency.ddns.net/api/updateflighttrip/${idnum}`, data).then(res => {
            swal("Success","flight Trip Information Updated Successfully","success");
            Navigation("/flights");
        }).catch(err => {
            if (err.response.data.errors) {
                setErrors({ ...errors, error_list: err.response.data.errors });
            }
        })
    }
    if (loading) {
        return <h3>Loading Flight Trip Information...</h3>
    }
    if (loged === 1) {
        return (
            <section className=" gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration border-radius-custem  main-color" >
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Edit Flight Trip Infromation</h3>
                                    <form onSubmit={updateFlight}>
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
                                                    <span className='error_color'>{errors.error_list.trip_number}</span>
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
                                                    <span className='error_color'>{errors.error_list.departureairport}</span>
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
                                                    <span className='error_color'>{errors.error_list.destination_airport}</span>
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
                                                    <span className='error_color'>{errors.error_list.starttime}</span>
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
        return <Navigate replace to="/login" />;
    }
}