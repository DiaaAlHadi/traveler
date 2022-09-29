
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import swal from 'sweetalert';
export default function Employees() {
    let role;
    let loged = 0;
    if (localStorage.getItem('auth_token')) {
        loged = 1;
        role = parseInt(localStorage.getItem('auth_Admin'));
    }
    const [loading, setLoading] = useState(true);
    const [employeeList, setEmployeeList] = useState([]);
    useEffect(() => {
        axios
            .get(`https://tourism-agency.ddns.net/api/users`)
            .then((res) => {
                if (res.status === 200) {
                    setEmployeeList(res.data);
                    setLoading(false);
                }
                else {

                }
            })
            .catch((err) => {
                if (loged !== 1) { swal("Warning", "You Must Login First", "warning") }
                else if (role !== 1) { swal("Warning", "You Must by an Admin", "warning") }

                setLoading(false);

            });
    }, []);
    const deleteitem = (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        axios.delete(`https://tourism-agency.ddns.net/api/deleteuser/${id}`).then(res=>{
            swal("Success","Employee Was Deleted Successflly","success");
            thisClicked.closest("tr").remove();
        }).catch(err=>{
            console.log(err.response.data);
        });
    }
    let viewemployees_HTMLTABLE = "";
    if (loading) {
        return <h3>Loading Employees...</h3>
    }
    else {
        viewemployees_HTMLTABLE =
            employeeList.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nationalId}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.isAdmin}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td><Link to={`editemployee/${item.id}`}><button className="btn btn-background btn-sm text-light"><img src="./images/edit.png" alt="edit" /></button></Link></td>
                        <td>
                            <button className="btn btn-background btn-sm text-light" onClick={(e)=> deleteitem(e, item.id)}>
                                <img src="./images/delete.png" alt="delete" />
                            </button>
                        </td>
                    </tr>
                )
            });
    }
    if (loged === 1 && role === 1) {
        return (
            <div className="container-fluid mt-3">
                <div className="row table-responsive justify-content-center">
                    <div className="col-12 text-center">
                        <h2 className="main-color mb-3">Employees</h2>
                        <div className="text-end mb-3">
                            <span className="h4">Add a New Employee
                                <Link to='newemployee'>
                                    <button className="btn btn-background btn-sm text-light ms-2">
                                        <img src="./images/add.png" alt="add new employee" />
                                    </button>
                                </Link>
                            </span>
                        </div>
                        <table className="table table-bordered  justify-content-center text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>National ID</th>
                                    <th>Name</th>
                                    <th>Emial</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Admin</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewemployees_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    else if (loged === 1 && role !== 1) {
        return <Navigate replace to="/" />;
    }
    else {
        return <Navigate replace to="/login" />;
    }
}