
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import swal from 'sweetalert';
export default function Customers() {

    let loged;
    if (localStorage.getItem('auth_token')) {
        loged = 1;
    }
    const [loading, setLoading] = useState(true);
    const [customersList, setCustomerLits] = useState([]);
    useEffect(() => {
        axios.get(`https://tourism-agency.ddns.net/api/clients`).then(res => {
            if (res.status === 200) {
                setCustomerLits(res.data);
                setLoading(false);
            }
        }).catch(res => {
            swal("Warning", "You Must Login First", "warning")
            setLoading(false);
        })
    }, []);
    const deleteitem = (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        axios.delete(`https://tourism-agency.ddns.net/api/deleteclient/${id}`).then(res=>{
            swal("Success","Customer Was Deleted Successflly","success");
            thisClicked.closest("tr").remove();
        }).catch(err=>{
            console.log(err.response.data);
        });
    }
    let viewcustomers_HTMLTABLE = "";
    if (loading) {
        return <h3>Loading Customers...</h3>
    }
    else {
        viewcustomers_HTMLTABLE =
            customersList.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.passportnumber}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td><Link to={`editcustomer/${item.id}`}><button className="btn btn-background btn-sm text-light"><img src="./images/edit.png" alt="edit" /></button></Link></td>
                        <td>
                            <button className="btn btn-background btn-sm text-light" onClick={(e)=> deleteitem(e, item.id)}>
                                <img src="./images/delete.png" alt="delete" />
                            </button>
                        </td>
                    </tr>
                )
            });
    }
    if (loged === 1) {
        return (
            <div className="container-fluid mt-3">

                <div className="row table-responsive justify-content-center">
                    <div className="col-12 text-center">
                        <h2 className="main-color mb-3">Customers</h2>
                        <div className="text-end mb-3">
                            <span className="h4">Add a New Customer
                                <Link to='newcustomer'>
                                    <button className="btn btn-background btn-sm text-light ms-2">
                                        <img src="./images/add.png" alt="add new customer" />
                                    </button>
                                </Link>
                            </span>
                        </div>
                        <table className="table table-bordered  justify-content-center text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Passport Number</th>
                                    <th>Name</th>
                                    <th>Emial</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewcustomers_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return <Navigate replace to="/login" />;

    }
}