import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
export default function EditEmployee() {
    let loged;
    if (localStorage.getItem('auth_token')) {
        loged = 1;
    }
    const Navigation = useNavigate();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    let idnum = id;
    const [employee, setEmployee] = useState([]);
    const [errors, setErrors] = useState({
        error_list: []
    })
    useEffect(() => {
        axios.get(`http://tourism-agency.ddns.net/api/users/${id}`).then(res => {
            setEmployee(res.data);
            setLoading(false);
        }).catch(res => {
            swal("Warning", "You Must Login First", "warning")
            setLoading(false);
        });
    }, [id]);
    const handleInput = (e) => {
        e.persist();
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }
    const updateEmployee = (e) => {
        e.preventDefault();
        const data = employee;
        axios.put(`http://tourism-agency.ddns.net/api/updateuser/${idnum}`, data).then(res => {
            swal("Success", "employee Information Updated Successfly", "success");
            Navigation("/employees");
        }).catch(err => {
            if (err.response.data.errors) {
                setErrors({ ...errors, error_list: err.response.data.errors });
            }
        })
    }
    if (loading) {
        return <h3>Loading Employee Information...</h3>
    }
    if (loged === 1) {
        return (
            <section className=" gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration border-radius-custem  main-color" >
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Edit Employee Infromatin</h3>
                                    <form onSubmit={updateEmployee}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="Name"
                                                        name='name'
                                                        onChange={handleInput}
                                                        value={employee.name}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="Name">Full Name</label><br />
                                                    <span className='error_color'>{errors.error_list.name}</span>
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="NationalID"
                                                        name='nationalId'
                                                        onChange={handleInput}
                                                        value={employee.nationalId}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="NationalID">National ID</label><br />
                                                    <span className='error_color'>{errors.error_list.nationalId}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <input
                                                        type="email"
                                                        id="emailAddress"
                                                        name='email'
                                                        onChange={handleInput}
                                                        value={employee.email}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="emailAddress">Email</label><br />
                                                    <span className='error_color'>{errors.error_list.email}</span>
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="phoneNumber"
                                                        name='phone'
                                                        onChange={handleInput}
                                                        value={employee.phone}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="phoneNumber">Phone Number</label><br />
                                                    <span className='error_color'>{errors.error_list.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name='address'
                                                        onChange={handleInput}
                                                        value={employee.address}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="address">Address</label><br />
                                                    <span className='error_color'>{errors.error_list.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="password"
                                                        id="Password"
                                                        name='password'
                                                        onChange={handleInput}
                                                        value={employee.password}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="Password" >Passwrod</label><br />
                                                    <span className='error_color'>{errors.error_list.password}</span>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <input
                                                        type="number"
                                                        id="isAdmin"
                                                        name='isAdmin'
                                                        onChange={handleInput}
                                                        value={employee.isAdmin}
                                                        className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="isAdmin" >1 if Admin 0 if not Admin</label><br />
                                                    <span className='error_color'>{errors.error_list.isAdmin}</span>
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
        );
    } else {
        return <Navigate replace to="/login" />;
    }
}