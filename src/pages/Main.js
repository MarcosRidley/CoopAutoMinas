import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';

export default function Main() {
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
        } 
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);
  return (
    <Dashboard />
  )
}