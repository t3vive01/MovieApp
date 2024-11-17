import React from 'react';
import './App.css';
import Authentication, { AuthenticationMode } from '../screens/Authentication.js';
import { useUser } from '../context/UseUser.js';
import { useNavigate } from 'react-router-dom';

function App() {
  const { user, signOut } = useUser();
  const navigate = useNavigate();

  //welcome after login. idk change it later
  if (user?.token) {
    return (
      <div className="welcome-container">
        <h2>Welcome to XXXXX app {user.email}!</h2>
        <button onClick={() => {
          signOut();
          navigate('/signin');
        }}>
          Log Out
        </button>
      </div>
    );
  }

  //this is for homepage when the user isnt logged in. Like the default page
  return (
    <div className="auth-section">
      <Authentication authenticationMode={AuthenticationMode.Login} />
    </div>
  );
}

export default App;
