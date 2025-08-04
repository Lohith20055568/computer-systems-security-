// import './Auth.css';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert("❌ Passwords don't match");
//       return;
//     }

//     try {
//       // ✅ Create new user only
//       await axios.post('http://localhost:5000/api/auth/signup', {
//         username: form.username,
//         email: form.email,
//         password: form.password,
//       });

//       alert('✅ Signup successful! Please login.');
//       navigate('/signin');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-box" onSubmit={handleSubmit}>
//         <h2>Signup</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Sign Up</button>
//         <p>
//           Already have an account?{' '}
//           <span onClick={() => navigate('/signin')}>Sign in</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignUp;
// import './Auth.css';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const navigate = useNavigate();

//   // Handle form field changes
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert("❌ Passwords don't match");
//       return;
//     }

//     try {
//       // Dynamically set the backend URL based on environment
//       // const backendUrl = import.meta.env.VITE_BACKEND_URL;
//        const rawUrl = import.meta.env.VITE_BACKEND_URL;
//        const backendUrl = rawUrl.replace(/\/+$/, '');
//       // Send POST request to backend to create new user
//       await axios.post(`${backendUrl}/api/auth/signup`, {
//         username: form.username,
//         email: form.email,
//         password: form.password,
//       });

//       alert('✅ Signup successful! Please login.');
//       navigate('/signin');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-box" onSubmit={handleSubmit}>
//         <h2>Signup</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Sign Up</button>
//         <p>
//           Already have an account?{' '}
//           <span onClick={() => navigate('/signin')}>Sign in</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import './Auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  // ✅ Clean backend URL (no trailing slash)
  const rawUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl = rawUrl.replace(/\/+$/, '');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords don't match");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/auth/signup`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      alert('✅ Signup successful! Please login.');
      navigate('/signin');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate('/signin')}>Sign in</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

