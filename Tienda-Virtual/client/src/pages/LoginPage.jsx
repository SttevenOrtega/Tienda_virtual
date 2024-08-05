import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "../styles/styles.css";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, successMessage } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="login-container bg-zinc-800 max-w-md w-full p-10 rounded-md">
          {successMessage && (
            <div className="bg-green-500 p-2 text-white mb-4">
              {successMessage}
            </div>
          )}
          {signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
              {error}
            </div>
          ))}

          <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>

          <form onSubmit={onSubmit} className="login-form">
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">Se requiere un Email</p>
            )}

            <input
              type={showPassword ? 'text' : 'password'}
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500">Se requiere una contraseña</p>
            )}
            <div className="form-group show-password-login">
              <input
                type="checkbox"
                id="showPasswordLogin"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label htmlFor="showPasswordLogin">Mostrar Contraseña</label>
            </div>

            <button type="submit" className="login-button">Iniciar Sesión</button>
          </form>

          <p className="flex gap-x-2 justify-between mt-4">
            No tienes una cuenta? <Link to="/register" className="text-sky-500">Regístrate</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
