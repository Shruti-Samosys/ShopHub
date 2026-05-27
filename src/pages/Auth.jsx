import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState('signup');

  const { signup, user, logout, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      if (mode === 'signup') {
        await signup(data.email, data.password);
        alert('Signup successful! You are now logged in.');
      } else {
        await login(data.email, data.password);
        alert('Login successful!');
      }

      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">

          {user ? (
            <div>
              <h1>Welcome, {user.email}!</h1>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <h1 className="page-title">
                {mode === 'signup' ? 'Sign Up' : 'Login'}
              </h1>

              <form
                className="auth-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group">
                  <label htmlFor="email">Email</label>

                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    {...register('email', {
                      required: 'Email is required',
                    })}
                  />

                  {errors.email && (
                    <span className="error-message">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>

                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message:
                          'Password must be at least 6 characters',
                      },
                      maxLength: {
                        value: 20,
                        message:
                          'Password must be less than 20 characters',
                      },
                    })}
                  />

                  {errors.password && (
                    <span className="error-message">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                >
                  {mode === 'signup' ? 'Sign Up' : 'Login'}
                </button>
              </form>

              <div className="auth-switch">
                {mode === 'signup' ? (
                  <p>
                    Already have an account?{' '}
                    <span
                      className="auth-link"
                      onClick={() => setMode('login')}
                    >
                      Login
                    </span>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{' '}
                    <span
                      className="auth-link"
                      onClick={() => setMode('signup')}
                    >
                      Sign Up
                    </span>
                  </p>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}