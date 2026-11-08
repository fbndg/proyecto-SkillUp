function Register() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">
            Crear cuenta
          </h1>

          <input
            type="text"
            placeholder="Nombre"
            className="input input-bordered"
            required
          />

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

          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="input input-bordered"
            required
          />

          <button className="btn btn-primary">
            Registrarme
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;