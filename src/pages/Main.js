import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';

export default function Main() {
  const [authorized, setAuthorized] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://cooperativadarhaissa.herokuapp.com/', {
      headers: { 
        token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(res => {
        if(res.authorized !== true) {
          throw new Error('Not Authorized');
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);
  return (
    <div>
      {authorized ? <Dashboard /> : <h3>Aguardando autorização...</h3>}
    </div>
  )
}