import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = isLogin
      ? `${apiUrl}/api/auth/login`
      : `${apiUrl}/api/auth/register`;

    const payload = isLogin
      ? { email: form.email, password: form.password }
      : form;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data)
    if (res.ok) {
      setMessage(isLogin ? 'Login successful!' : 'User registered!');
      if (isLogin) {
        localStorage.setItem('token', data.token); // optional
      }
      navigate('/')
    } else {
      setMessage(data.message || 'Something went wrong');
    }
  };

  const [loggedIn,setLoggedIn] = useState("");
  useEffect(()=>{
    setIsLogin
  })
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-blue-600">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button
                onClick={toggleMode}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={toggleMode}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
