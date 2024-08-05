// RegisterPage.jsx
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/styles.css"; // Asegúrate de importar los estilos adicionales

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, errors: registerErrors, successMessage } = useAuth();

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <>
            <div className="flex h-[calc(100vh-100px)] items-center justify-center">
                <div className="login-container bg-zinc-800 max-w-md w-full p-10 rounded-md">
                    {successMessage && (
                        <div className="bg-green-500 p-2 text-white mb-4">
                            {successMessage}
                        </div>
                    )}
                    {registerErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white mb-4" key={i}>
                            {error}
                        </div>
                    ))}
                    <h1 className="text-3xl font-bold mb-6">Registrar</h1>
                    <form onSubmit={onSubmit} className="login-form">
                        <input
                            type="text"
                            {...register("username", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
                            placeholder="Nombre de usuario"
                        />
                        {errors.username && (
                            <p className="text-red-500">Se requiere nombre de usuario</p>
                        )}

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
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
                            placeholder="Contraseña"
                        />
                        {errors.password && (
                            <p className="text-red-500">Se requiere una contraseña</p>
                        )}
                        <button type="submit" className="login-button">Registrar</button>
                    </form>

                    <p className="flex gap-x-2 justify-between mt-4">
                        Ya tienes una cuenta? <Link to="/login" className="text-sky-500">Iniciar Sesión</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
