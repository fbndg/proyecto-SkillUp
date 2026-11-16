import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // MKTG Semana 2 - Mensajes junto al dato que hay que corregir
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // [Frontend] 2. Flujo de Autenticación | Evento: login
  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setMessage("");

    if (!email) { setEmailError("Ingresá tu correo electrónico."); return; }
    if (!email.includes("@") || !email.includes(".")) { setEmailError("Revisá el correo. Por ejemplo: nombre@ejemplo.com."); return; }
    if (!password) { setPasswordError("Ingresá tu contraseña."); return; }

    setLoading(true);
    try {
      // Intento real con backend - POST /api/auth/login
      const data = await login(email.trim(), password);
      const user = data.user || { email: email.trim() };
      const role = String(user.role || "ESTUDIANTE").toUpperCase();
      const isAdmin = role === "ADMIN";
      setMessage(isAdmin ? "Sesión iniciada como administrador. Te llevamos al panel..." : "Sesión iniciada correctamente. Te llevamos al catálogo...");
      setTimeout(() => { setLoading(false); navigate(isAdmin ? "/admin-dashboard" : "/catalogo"); }, 800);
    } catch (err) {
      setLoading(false);
      // MKTG Semana 2 - Mensajes amigables con try/catch
      if (err.message === "NO_CONNECTION") {
        // Fallback demo solo si backend no está corriendo, para no romper el video del viernes
        // Si backend está corriendo, este bloque no se ejecuta
        const isAdmin = email.trim().toLowerCase() === "admin@skillup.com";
        localStorage.setItem("user", JSON.stringify({ id: isAdmin ? "admin1" : "u1", name: isAdmin ? "Admin SkillUp" : "Estudiante Demo", email: email.trim(), role: isAdmin ? "ADMIN" : "ESTUDIANTE", token: isAdmin ? "demo-admin" : "demo-estudiante" }));
        setMessage("Backend sin conexión, entrando en modo demo. Te llevamos al catálogo...");
        setTimeout(() => navigate(isAdmin ? "/admin-dashboard" : "/catalogo"), 800);
        return;
      }
      if (err.status === 401 || err.status === 400) {
        setMessage("No pudimos iniciar sesión con esos datos. Revisá el correo y la contraseña.");
      } else {
        setMessage("No pudimos iniciar sesión en este momento. Volvé a intentar en unos minutos.");
      }
    }
  };

  useEffect(() => {
    // MKTG Semana 1 - Metatítulo Login
    document.title = "Acceder al campus | SkillUp Campus";
  }, []);

  // MKTG Semana 2 - El botón NO se deshabilita por campos vacíos, solo mientras carga.
  // Si lo dejamos disabled con campos vacíos, el clic nunca llega y nunca se muestra el mensaje de error.
  const disabled = loading;

  return (
    <div className="hero min-h-[85vh] bg-base-200">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">

        <div className="card-body">

          {/* H1 MKTG Semana 2 - Único H1 */}
          <h1 className="text-2xl font-bold text-center">
            Entrá a SkillUp Campus
          </h1>

          {/* Bajada MKTG Semana 2 */}
          <p className="text-center text-sm opacity-80">
            Ingresá para seguir aprendiendo o elegir tu próximo curso.
          </p>

          <label className="text-sm font-bold mt-2" htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            placeholder="tu@correo.com"
            className={`input input-bordered w-full ${emailError ? "input-error" : ""}`}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
            onBlur={() => {
              if (!email) setEmailError("Ingresá tu correo electrónico.");
              else if (!email.includes("@") || !email.includes(".")) setEmailError("Revisá el correo. Por ejemplo: nombre@ejemplo.com.");
            }}
          />
          {emailError && <p className="text-error text-sm">{emailError}</p>}

          <label className="text-sm font-bold mt-2" htmlFor="login-password">Contraseña</label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña"
              className={`input input-bordered w-full pr-20 ${passwordError ? "input-error" : ""}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
              onBlur={() => { if (!password) setPasswordError("Ingresá tu contraseña."); }}
            />
            <button
              type="button"
              className="btn btn-ghost btn-xs absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </button>
          </div>
          {passwordError && <p className="text-error text-sm">{passwordError}</p>}

          {/* MKTG Semana 2 - Mostrar solo si la recuperación está habilitada */}
          {/* TODO Backend: habilitar recuperación de contraseña */}
          <p className="text-right text-sm">
            <Link to="/login" className="link link-primary">¿Olvidaste tu contraseña?</Link>
          </p>

          {message && (
            <div className="alert alert-info">
              <span>{message}</span>
            </div>
          )}

          <p className="text-center text-xs opacity-70">
            Demo: para entrar como admin usá <b>admin@skillup.com</b> / <b>123456</b>
          </p>

          <button
            onClick={handleLogin}
            className="btn btn-primary w-full"
            disabled={disabled}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>

          <p className="text-center text-sm mt-2">
            ¿Todavía no tenés cuenta?{" "}
            <Link to="/register" className="link link-primary">
              Creá tu cuenta
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;