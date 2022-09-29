import React, { useEffect, useState } from 'react';
import { Link ,Navigate} from 'react-router-dom';
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import swal from 'sweetalert';
export default function Flights() {
    let loged;
    if(localStorage.getItem('auth_token')){
        loged = 1;
    }
    const[loading,setLoading]=useState(true);
    const[loading2,setLoading2]=useState(true);
    const[flightTripList,setFlightTripList]=useState([]);
    const[touristTripList,setTourisTripList]=useState([]);
    useEffect(()=>{
        axios.get(`https://tourism-agency.ddns.net/api/flighttrips`).then(res=>{
            if(res.status === 200)
            {
                setFlightTripList(res.data)
            }
            setLoading(false);
        });
    },[]);
    useEffect(()=>{
        axios.get(`https://tourism-agency.ddns.net/api/touristtrips`).then(res=>{
            if(res.status === 200)
            {
                setTourisTripList(res.data)
            }
            setLoading2(false);
        });
    },[]);
    const deleteitem = (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        axios.delete(`https://tourism-agency.ddns.net/api/deleteflighttrip/${id}`).then(res=>{
            swal("Success","Flight Trip Was Deleted Successflly","success");
            thisClicked.closest("tr").remove();
        }).catch(err=>{
            console.log(err.response.data);
        });
    }
    const deleteitem2 = (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        axios.delete(`https://tourism-agency.ddns.net/api/deletetouristtrip/${id}`).then(res=>{
            swal("Success","Torist Tirp Was Deleted Successflly","success");
            thisClicked.closest("tr").remove();
        }).catch(err=>{
            console.log(err.response.data);
        });
    }
    let viewflighttrip_HTMLTABLE = "";
    let viewtouristtrip_HTMLTABLE = "";
    if(loading){
        return <h3>Loading Flight Trips...</h3>
    }
    else{
        viewflighttrip_HTMLTABLE = 
        flightTripList.map((item)=>{
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.trip_number}</td>
                    <td>{item.departureairport}</td>
                    <td>{item.destination_airport}</td>
                    <td>{item.starttime}</td>
                    <td>{item.created_at}</td>
                    <td>{item.updated_at}</td>
                    <td><Link to={`editflighttrip/${item.id}`}><button className="btn btn-background btn-sm text-light"><img src="./images/edit.png" alt="edit" /></button></Link></td>
                    <td>
                        <button className="btn btn-background btn-sm text-light" onClick={(e)=> deleteitem(e, item.id)}>
                            <img src="./images/delete.png" alt="delete" />
                        </button>
                    </td>
                </tr>
            )
        });
    }
    if(loading2){
        return <h3>Loading Tourist Trips...</h3>
    }
    else{
        viewtouristtrip_HTMLTABLE = 
        touristTripList.map((item)=>{
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.trip_number}</td>
                    <td>{item.departureairport}</td>
                    <td>{item.destination_airport}</td>
                    <td>{item.starttime}</td>
                    <td>{item.created_at}</td>
                    <td>{item.updated_at}</td>
                    <td><Link to={`edittouristtrip/${item.id}`}><button className="btn btn-background btn-sm text-light"><img src="./images/edit.png" alt="edit" /></button></Link></td>
                    <td>
                        <button className="btn btn-background btn-sm text-light" onClick={(e)=> deleteitem2(e, item.id)}>
                            <img src="./images/delete.png" alt="delete" />
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
            <Tab eventKey="touristtrip" title="Tourist">
                <div className="container-fluid mt-3">
                    <div className="row table-responsive justify-content-center">
                        <div className="col-12 text-center">
                            <h2 className="main-color mb-3">Tourist Trips</h2>
                            <div className="text-end mb-3">
                                <span className="h4">Create Tourist Trip
                                    <Link to='newtouristtrip'>
                                        <button className="btn btn-background btn-sm text-light ms-2">
                                            <img src="./images/add.png" alt="create tourist trip button" />
                                        </button>
                                    </Link>
                                </span>
                            </div>
                            <table className="table table-bordered  justify-content-center text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Trip Number</th>
                                        <th>Departure</th>
                                        <th>Destination</th>
                                        <th>Start Time</th>
                                        <th>Create Time</th>
                                        <th>Update Time</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewtouristtrip_HTMLTABLE}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="flighttrip" title="Flight">
                <div className="container-fluid mt-3">
                    <div className="row table-responsive justify-content-center">
                        <div className="col-12 text-center">
                            <h2 className="main-color mb-3">Flight Trips</h2>
                            <div className="text-end mb-3">
                                <span className="h4">Create Flight Trip
                                    <Link to='newflighttrip'>
                                        <button className="btn btn-background btn-sm text-light ms-2">
                                            <img src="./images/add.png" alt="create flight trip button" />
                                        </button>
                                    </Link>
                                </span>
                            </div>
                            <table className="table table-bordered  justify-content-center text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Trip Number</th>
                                        <th>Departure</th>
                                        <th>Destination</th>
                                        <th>Start Time</th>
                                        <th>Create Time</th>
                                        <th>Update Time</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewflighttrip_HTMLTABLE}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Tab>
        </Tabs>
    );
    }
    else{
        swal("Warning","You Must Login First","warning");
        return <Navigate replace to="/login" />;
    }
}