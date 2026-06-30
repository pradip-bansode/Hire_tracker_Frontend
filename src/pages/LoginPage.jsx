import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../service/ApplicationService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await AuthService.login(formData);
      login(res.data);        // Token + user info save karo
      navigate('/dashboard'); // Dashboard pe bhejo
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800"> Hire Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">Apne account mai login karo</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input name="email" type="email" value={formData.email}
              onChange={handleChange} required className={inputClass}
              placeholder="rahul@gmail.com" />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input name="password" type="password" value={formData.password}
              onChange={handleChange} required className={inputClass}
              placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
            {loading ? 'Logging in...' : 'Login Karo'}
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Account nahi hai?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Signup karo
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;