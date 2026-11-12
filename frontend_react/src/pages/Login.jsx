import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const loginDemo = () => {

    if (!email || !password) {
      setMessage("Completá todos los campos.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: "u1",
        name: "Estudiante Demo",
        role: "ESTUDIANTE",
        token: "demo-estudiante",
      })
    );

    setMessage("Sesión iniciada correctamente.");

    setTimeout(() => {
      navigate("/catalogo");
    }, 1500);
  };

  return (
    <div className="hero min-h-[85vh] bg-base-200">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">

        <div className="card-body">

          <h1 className="text-2xl font-bold text-center">
            Iniciar sesión
          </h1>

          <input
            type="email"
            placeholder="Correo electrónico"
            className="input input-bordered"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="input input-bordered"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {message && (
            <div className="alert alert-info">
              <span>{message}</span>
            </div>
          )}

          <button
            onClick={loginDemo}
            className="btn btn-primary"
          >
            Ingresar como estudiante demo
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;