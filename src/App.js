import './App.css';
import Routing from './components/Routing'
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
axios.defaults.headers.put['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
axios.defaults.headers.delete['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routing/>
  );
}
export default App;