import MasterLayout from './shaerdlayout/MasterLayout';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Dashboard';
import Flights from './flight/Flights';
import Login from './Login';
import Employees from './employees/Employees';
import Customers from './clients/Customers'
import NewCustomer from './clients/NewCustomer';
import NewEmployee from './employees/NewEmployee';
import Reservations from './reservations/Reservations';
import EditEmployee from './employees/EditEmployee';
import EditCustomer from './clients/EditCustomer';
import FlightTripReservation from './reservations/FlightTripReservation'
import TouristReservation from './reservations/TouristReservation';
import NewFlightTrip from './flight/NewFlightTrip'
import NewTouristTrip from './flight/NewTouristTrip';
import Editflight from './flight/Editflight';
import Edittrouist from './flight/Edittourist';
import EditFlightReservation from './reservations/EditFlightReservation';
import EditTouristReservation from './reservations/EditTouristReservation'

export default function Routing() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Navigate replace to="/dashboard" />} />
        <Route path="" element={<MasterLayout />} >
          <Route index element={<Dashboard />} />

          {/* flight routes */}
          <Route path="flights" element={<Flights />} />
          <Route path="flights/editflighttrip/:id" element={<Editflight />} />
          <Route path="flights/newflighttrip" element={<NewFlightTrip />} />
          <Route path="flights/newtouristtrip" element={<NewTouristTrip />} />
          <Route path="flights/edittouristtrip/:id" element={<Edittrouist />} />

          {/* reservations routes */}
          <Route path="reservations" element={<Reservations />} />
          <Route path="reservations/flighttripreservation" element={<FlightTripReservation />} />
          <Route path="reservations/touristreservation" element={<TouristReservation />} />
          <Route path="reservations/editflightreservation/:id" element={<EditFlightReservation />}/>
          <Route path="reservations/edittouristreservation/:id" element={<EditTouristReservation/> }/>
          {/* employees routes */}
          <Route path="employees" element={<Employees />} />
          <Route path="employees/editemployee/:id" element={<EditEmployee />} />
          <Route path="employees/newemployee" element={<NewEmployee />} />

          {/* customers routes */}
          <Route path="customers" element={<Customers />} />
          <Route path="customers/newcustomer" element={<NewCustomer />} />
          <Route path="customers/editcustomer/:id" element={<EditCustomer />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}