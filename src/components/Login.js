import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Login() {

  const Navigation = useNavigate();
  const refreshPage = () => {
    Navigation(0);
  }
  const [LogInInput, setLogInInput] = useState({
    email: "",
    password: "",
    error: "",
    error_list: ""
  })



  function handleInput(event) {
    event.persist();
    setLogInInput(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: LogInInput.email,
      password: LogInInput.password
    }
    axios.post(`http://tourism-agency.ddns.net/api/login`, data).then(res => {
      if (res.data.error !== 0) {
        setLogInInput({ ...LogInInput, error: res.data.msg });
      } else {
        swal("Success","loged in successfully!","success");
        localStorage.setItem('auth_token', res.data.token);
        localStorage.setItem('auth_Admin', res.data.user.isAdmin)
        localStorage.setItem('auth_id', res.data.user.id)
        localStorage.setItem('username',res.data.user.name)
        
        Navigation("/");
        refreshPage("/");
      }
    }).catch(err => {
      if (err.response.data.errors.email || err.response.data.errors.password) {
        setLogInInput({ ...LogInInput, error_list: err.response.data.errors })
      }
    });
  }
  return (
    <section className=" gradient-custom">
      <div className="container py-1 vh-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white opacity-75">
              <div className="card-body px-5 py-2 text-center">
                <div className="mb-md-4 mt-md-3 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-2">Please enter your Email and Password!</p>
                  <p className="mb-3 error_list rounded-2 blockquote">{LogInInput.error}</p>
                  <div className="form-outline form-white mb-5">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleInput}
                      value={LogInInput.email}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="email">Email</label><br />
                    <span className='error_color'>{LogInInput.error_list.email}</span>
                  </div>
                  <div className="form-outline form-white mb-5">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleInput}
                      value={LogInInput.password}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="password">Password</label><br />
                    <span className='error_color'>{LogInInput.error_list.password}</span>
                  </div>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}