import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate()


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        setLoading(true)
      const response = await fetch('https://job-api-rosy.vercel.app/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast(data?.message)

        // Store the token (user ID in this case) somewhere safe
        localStorage.setItem('token', data.token);
        navigate("/action")
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error('Error during login:', error);
    }
    setLoading(false)
  };

  return (
    <div style={styles.container}>
        
      <form onSubmit={handleLogin} style={{
       boxShadow:" rgba(0, 0, 0, 0.1) 0px 10px 50px",
        display:"flex",
        flexDirection:"column",
        gap:"20px",
        padding:"20px",
        background:"white",
        borderRadius:"30px"
      }}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            border:"2px solid grey",
            width:"70vw",
            maxWidth:"500px",
            height:"50px",
            padding:"10px",
            borderRadius:"10px"
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            border:"2px solid grey",
            width:"70vw",
            maxWidth:"500px",
            height:"50px",
            padding:"10px",
            borderRadius:"10px"
          }}
          required
        />
        {
            loading ?  <button style={styles.button}>Loading...</button> :  <button type="submit" style={styles.button}>Login</button>
        }
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  
    backgroundColor: '#f0f0f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth:'500px',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'red',
    textAlign: 'center',
  },
};

export default Admin;
