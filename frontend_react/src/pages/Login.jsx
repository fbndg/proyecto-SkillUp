function Login() {

  const loginDemo = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: "u1",
        name: "Estudiante Demo",
        role: "ESTUDIANTE",
        token: "demo-estudiante",
      })
    );

    alert("Sesión iniciada correctamente");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">
            Iniciar sesión
          </h1>

          <input
            type="email"
            placeholder="Correo electrónico"
            className="input input-bordered"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="input input-bordered"
            required
          />

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