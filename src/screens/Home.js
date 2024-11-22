import './Home.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UseUser';

const url = process.env.REACT_APP_API_URL

function Home() {
  const { user } = useUser()

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTasks(response.data)
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }, [])

}

export default Home
