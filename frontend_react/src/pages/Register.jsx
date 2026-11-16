import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sign_up } from "../api/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // MKTG Semana 2 - Mensajes junto al dato que hay que corregir
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // MKTG Semana 1 - Metatítulo Registro
    document.title = "Crear cuenta | SkillUp Campus";
  }, []);

  // [Frontend] 2. Flujo de Autenticación | Evento: sign_up
  const handleRegister = async () => {
    setNameError(""); setEmailError(""); setPasswordError(""); setConfirmError(""); setTermsError(""); setMessage("");

    if (!name) { setNameError("Escribí tu nombre."); return; }
    if (!email) { setEmailError("Ingresá tu correo electrónico."); return; }
    if (!email.includes("@") || !email.includes(".")) { setEmailError("Revisá el correo. Por ejemplo: nombre@ejemplo.com."); return; }
    if (!password) { setPasswordError("Creá una contraseña."); return; }
    if (!confirmPassword) { setConfirmError("Repetí tu contraseña."); return; }
    if (password !== confirmPassword) { setConfirmError("Las contraseñas no coinciden. Revisalas e intentá de nuevo."); return; }
    if (!terms) { setTermsError("Aceptá los términos y condiciones para seguir."); return; }

    setLoading(true);
    try {
      // Intento real - POST /api/auth/register - Evento sign_up
      await sign_up(name.trim(), email.trim(), password);
      setLoading(false);
      setSuccess(true);
      setMessage("Tu cuenta ya está lista. Elegí qué querés aprender a hacer.");
    } catch (err) {
      setLoading(false);
      if (err.message === "NO_CONNECTION") {
        // Fallback demo solo si backend no está corriendo
        setSuccess(true);
        setMessage("Tu cuenta ya está lista. Elegí qué querés aprender a hacer. (Modo demo: backend sin conexión)");
        return;
      }
      if (err.status === 400) {
        setEmailError("Ese correo ya está en uso. Iniciá sesión o usá otro correo.");
        setMessage("Ese correo ya está en uso. Iniciá sesión o usá otro correo.");
      } else {
        setMessage("No pudimos crear tu cuenta en este momento. Volvé a intentar en unos minutos.");
      }
    }
  };

  // MKTG Semana 2 - Igual que Login: botón solo disabled mientras carga, para que el clic muestre los errores
  const disabled = loading;

  return (
    <div className="hero min-h-[85vh] bg-base-200">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">

        <div className="card-body">

          {/* H1 MKTG Semana 2 - Único H1, igual que Semana 1 */}
          <h1 className="text-2xl font-bold text-center">
            Creá tu cuenta en SkillUp Campus
          </h1>

          {/* Bajada MKTG Semana 2 */}
          <p className="text-center text-sm opacity-80">
            Elegí un curso y practicá con un proyecto que puedas usar en tu trabajo o en una tarea propia.
          </p>

          <label className="text-sm font-bold mt-2" htmlFor="reg-name">Nombre</label>
          <input
            id="reg-name"
            type="text"
            placeholder="Tu nombre"
            className={`input input-bordered w-full text-left ${nameError ? "input-error" : ""}`}
            value={name}
            onChange={(e) => { setName(e.target.value); setNameError(""); }}
          />
          {nameError && <p className="text-error text-sm">{nameError}</p>}

          <label className="text-sm font-bold mt-2" htmlFor="reg-email">Correo electrónico</label>
          <input
            id="reg-email"
            type="email"
            placeholder="tu@correo.com"
            className={`input input-bordered w-full text-left ${emailError ? "input-error" : ""}`}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
          />
          {emailError && <p className="text-error text-sm">{emailError}</p>}

          <label className="text-sm font-bold mt-2" htmlFor="reg-password">Contraseña</label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña"
              className={`input input-bordered w-full text-left pr-20 ${passwordError ? "input-error" : ""}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
            />
            <button type="button" className="btn btn-ghost btn-xs absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </button>
          </div>
          {passwordError && <p className="text-error text-sm">{passwordError}</p>}

          <label className="text-sm font-bold mt-2" htmlFor="reg-confirm">Confirmar contraseña</label>
          <div className="relative">
            <input
              id="reg-confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Repetí tu contraseña"
              className={`input input-bordered w-full text-left pr-20 ${confirmError ? "input-error" : ""}`}
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setConfirmError(""); }}
            />
            <button type="button" className="btn btn-ghost btn-xs absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
            </button>
          </div>
          {confirmError && <p className="text-error text-sm">{confirmError}</p>}

          <label className="label cursor-pointer justify-start gap-3">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={terms}
              onChange={(e) => { setTerms(e.target.checked); setTermsError(""); }}
            />
            <span className="label-text">
              Acepto términos y condiciones
            </span>
          </label>
          {termsError && <p className="text-error text-sm">{termsError}</p>}

          {message && (
            <div className={`alert ${success ? "alert-success" : "alert-info"}`}>
              <span>{message}</span>
            </div>
          )}

          {success ? (
            <button className="btn btn-primary w-full" onClick={() => navigate("/catalogo")}>
              Ver cursos
            </button>
          ) : (
            <button
              className="btn btn-primary w-full"
              onClick={handleRegister}
              disabled={disabled}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creando tu cuenta...
                </>
              ) : (
                "Crear mi cuenta"
              )}
            </button>
          )}

          <p className="text-center text-sm mt-2">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="link link-primary">
              Ingresá
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;