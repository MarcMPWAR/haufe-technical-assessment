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
        return { success: true, message, token };
      } else {
        return { success: false, message };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'An error occurred during login' };
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
