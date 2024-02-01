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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const { login } = useAuth();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is "Enter"
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const { success, message } = await login(email, password);

    if (success) {
      // Redirect or perform other actions after successful login
      console.log('Login successful');
    } else {
      // Handle failed login
      console.error('Login failed:', message);
    }
  };

  return (
    <div className="auth-form">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={handleEmailChange} />

      <label htmlFor="password">Password:</label>
      <input 
        type="password" 
        id="password" 
        value={password} 
        onChange={handlePasswordChange}         
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthForm;
