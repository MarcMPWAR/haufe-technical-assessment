// AuthForm.tsx
import React, { useState } from 'react';
import '../styles/AuthForm.css';
import AuthService from '../services/AuthService';
import { useAuth } from '../contexts/AuthContext';

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const { login, register } = useAuth();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is "Enter"
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const { success, message } = await login(email, password);

      if (!success) {
        console.error('Login failed:', message);
        setError(message);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleRegister = async () => {
    try {
      const { success, message } = await register(email, password);

      if (success) {
        // Clear form fields on successful registration
        setEmail('');
        setPassword('');
        setRegistrationSuccess(true);
        setRegistrationMessage('Registration successful. Fill your details and click login');
      } else {
        setError(message);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="auth-form">
      {isRegistering && !registrationSuccess ? (
        // Registration form
        <div>
          <h2>Register</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />

        </div>
      ) : (
        // Login form
        <div>
          <h2>Login</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} onKeyDown={handleKeyPress}/>

        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {registrationSuccess && (
        <div className="success-message">
          {registrationMessage}
        </div>
      )}

        <div>
          <div className="button-container">
            <button onClick={isRegistering ? handleRegister : handleLogin}>
              {isRegistering && !registrationSuccess ? 'Save' : 'Login'}
            </button>
            <button onClick={() => { 
              setIsRegistering((prev) => !prev);
              setError(null);
            }}>
              {isRegistering && !registrationSuccess ? 'Back' : 'Register'}
            </button>
          </div>
        </div>

      
    </div>
  );
};

export default AuthForm;
