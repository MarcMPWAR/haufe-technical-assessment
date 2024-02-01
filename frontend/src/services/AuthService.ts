import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

interface UserData {
  id: string;
  email: string;
}

const API_BASE_URL = 'http://localhost:3001';

const AuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/auth/login`, { email, password });
      const { message, token } = response.data;

      if (message === 'Login successful' && token) {
        Cookies.set('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
        return { success: true, message: 'Login successful', token };
      } else {
        return { success: false, message: 'Login failed. Invalid credentials.' };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Handle authentication failure
        return { success: false, message: 'Login failed. Invalid credentials.' };
      } else {
        // Handle other types of errors
        console.error('Error during login:', error);
        return { success: false, message: 'An error occurred during login' };
      }
    }
  },

  logout: () => {
    Cookies.remove('token');
  },

  register: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/auth/register`, { email, password });
      const { message, token } = response.data;

      if (message === 'Registration successful' && token) {
        Cookies.set('token', token, { expires: 1 / 24 });
        return { success: true, message: 'Registration successful', token };
      } else {
        return { success: false, message: 'Registration failed. Invalid token.' };
      }
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: 'An error occurred during registration' };
    }
  },

  getUserData: async (): Promise<UserData | null> => {
    try {
      const token = Cookies.get('token');

      if (!token) {
        return null;
      }

      const response = await axios.get<UserData>(`${API_BASE_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  },

  getToken: (): string | undefined => {
    // Retrieve the token from the cookie
    return Cookies.get('token');
  },
};

export default AuthService;
