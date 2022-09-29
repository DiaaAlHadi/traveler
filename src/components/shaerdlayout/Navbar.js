
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
export default function Navbar() {
    const Navigation = useNavigate();
    
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://tourism-agency.ddns.net/api/logout`).then(res => {
            swal("Success", "Loged Out Successfully", "success");
            localStorage.removeItem('auth_token', res.data.token);
            localStorage.removeItem('auth_Admin');
            localStorage.removeItem('auth_id');
            localStorage.removeItem("username");
            Navigation("/login");
            
        })
        
    }

    let role;
    if (localStorage.getItem('auth_token')) {
        role = parseInt(localStorage.getItem('auth_Admin'));
    }
    return (
        <nav className="navbar navbar-expand-lg bg-nav">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/images/Traveler.png" alt="HR logo" width="80px" height="60px" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <Link className="nav-link active text-light" aria-current="page" to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="flights">Flights</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="reservations">Reservations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="customers">Customers</Link>
                        </li>
                        {
                            role !== 0 && <li className="nav-item">
                                <Link className="nav-link text-light" to="employees">Employees</Link>
                            </li>
                        }
                        <li className="nav-item mt-1 ms-md-1">
                            <button className="btn btn-sm me-2 bg-out" onClick={logoutSubmit}>Log out</button>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}
