import { useState } from "react";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [message, setMessage] = useState("");

  const handleRegister = () => {

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    if (!terms) {
      setMessage(
        "Debes aceptar los términos y condiciones."
      );
      return;
    }

    setMessage(
      "Cuenta creada correctamente (modo demostración)."
    );

  };

  return (
    <div className="hero min-h-[85vh] bg-base-200">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">

        <div className="card-body">

          <h1 className="text-2xl font-bold text-center">
            Crear cuenta
          </h1>

          <input
            type="text"
            placeholder="Nombre"
            className="input input-bordered"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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

          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="input input-bordered"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <label className="label cursor-pointer">
            <span className="label-text">
              Acepto términos y condiciones
            </span>

            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={terms}
              onChange={(e) =>
                setTerms(e.target.checked)
              }
            />
          </label>

          {message && (
            <div className="alert alert-info">
              <span>{message}</span>
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={handleRegister}
          >
            Registrarme
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;