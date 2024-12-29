import React, { useState } from 'react';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const [form,setForm]=useState([]);
    const handleGenerateOTP = (e) => {
        e.preventDefault();
        fetch('https://otp-1-sede.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network err da sunni');
                }
                return response.json();
            })
            .then((data) => {
                console.log('OTP response:', data);
                if (data.otp) {
                    setOtp(data.otp);
                    alert('annupite da punda');
                } else {
                    alert('otp pogala da thayoli');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to fetch OTP');
            });
    };

    const validate = (e) => {
        e.preventDefault();
        console.log(enteredOtp);
        console.log('otp', otp);
        if (enteredOtp === otp) {
            alert('Otp validated da thayoli');
        } else {
            alert('Paathu olungu pundaya podu junni');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>
                
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <button className="login-button" onClick={handleGenerateOTP}>
                    Generate OTP
                </button>
                <div className="form-group">
                    <label>Enter OTP:</label>
                    <input
                        type="text"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        required
                        placeholder="Enter the OTP"
                    />
                </div>
                <button className="login-button" onClick={validate}>
                    Validate OTP
                </button>
                
            </form>
        </div>
    );
}

export default Login;
