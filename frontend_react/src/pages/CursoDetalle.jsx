import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// Fallback local: no depende de api.js
function trackEvent(event, props = {}) {
  const payload = { event, ...props, at: new Date().toISOString() };
  console.log("[SkillUp Event]", payload);
  try {
    const prev = JSON.parse(localStorage.getItem("skillup_events") || "[]");
    prev.push(payload);
    localStorage.setItem("skillup_events", JSON.stringify(prev.slice(-200)));
  } catch {}
}
async function enroll(course_id) {
  const token = localStorage.getItem("token");
  trackEvent("click_enroll", { course_id, logueado: token ? "si" : "no" });
  const res = await fetch("http://localhost:3001/api/enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ course_id, courseId: course_id }),
  });
  let data = null; try { data = await res.json(); } catch {}
  if (!res.ok) { const e = new Error(data?.message || "HTTP_" + res.status); e.status = res.status; throw e; }
  trackEvent("enroll_success", { course_id });
  return data;
}

function CursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/courses")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        const found = list.find((c) => String(c.id) === String(id));
        setCourse(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // MKTG Semana 1 - Metatítulo dinámico por curso
  useEffect(() => {
    if (course?.title) {
      document.title = `${course.title} | SkillUp Campus`;
    } else {
      document.title = "Curso | SkillUp Campus";
    }
  }, [course]);

  // [PO - Kit Data Analyst] view_course: cuando se abre el detalle y ya cargó el curso
  // Props: course_id, categoria
  useEffect(() => {
    if (course?.id) {
      trackEvent("view_course", { course_id: String(course.id), categoria: course.category || course.group || "General" });
    }
  }, [course?.id]);

  // [PO - Kit Data Analyst] click_enroll + enroll_success
  // Si NO está logueado: manda click_enroll con logueado="no" y lo lleva a /register
  // Si SÍ está logueado: manda click_enroll + enroll_success desde enroll() en api.js
  const handleEnroll = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      trackEvent("click_enroll", { course_id: String(course.id), logueado: "no" });
      navigate("/register");
      return;
    }
    setEnrolling(true);
    setEnrollMsg("");
    try {
      await enroll(course.id);
      setEnrollMsg("¡Te inscribiste! Ya podés empezar este curso.");
    } catch (err) {
      // NO hacemos navigate acá - si navegamos, el mensaje nunca se ve
      // El usuario queda en el detalle y decide si va a Login
      if (err.status === 401) {
        setEnrollMsg("Tu sesión venció. Iniciá sesión de nuevo y volvé a intentar inscribirte.");
      } else if (err.status === 400) {
        setEnrollMsg("Ya estás inscripto en este curso.");
      } else if (err.status === 404) {
        // Backend todavía no tiene POST /api/enrollments - es de Rodolfo/Mauricio, no tuyo
        setEnrollMsg("La inscripción todavía no está habilitada en el backend (404). El evento click_enroll ya quedó guardado para el PM.");
      } else {
        setEnrollMsg("No pudimos inscribirte en este momento. Volvé a intentar en unos minutos.");
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Cargando curso...</div>;
  if (!course) return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Curso no encontrado</h1>
      <p className="opacity-80 mt-2">Ese curso no existe o todavía no está publicado.</p>
      <Link to="/catalogo" className="btn btn-primary mt-4">Volver al catálogo</Link>
    </div>
  );

  const duration = course.duration || (course.durationHours ? `${course.durationHours} hs` : "");
  const category = course.category || course.level || "General";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/catalogo" className="link link-primary text-sm">← Volver al catálogo</Link>

      <span className="block text-xs uppercase tracking-widest text-secondary font-semibold mt-4">{category}</span>

      {/* H1 MKTG Semana 1 - Único H1 = título del curso */}
      <h1 className="text-4xl font-bold mt-2 mb-2">{course.title}</h1>
      {course.instructor && <p className="opacity-70">Por {course.instructor}</p>}

      {/* H2 MKTG Semana 1 - Qué vas a aprender */}
      <h2 className="text-2xl font-bold mt-8 mb-2">Qué vas a aprender</h2>
      <p className="my-2">{course.description}</p>

      {/* H2 MKTG Semana 1 - Detalles del curso */}
      <h2 className="text-2xl font-bold mt-8 mb-2">Detalles del curso</h2>
      <ul className="list-disc list-inside space-y-1 opacity-90">
        {duration && <li>Duración: {duration}</li>}
        {course.level && <li>Nivel: {course.level}</li>}
        <li>Ayuda de IA las 24 horas y respaldo humano.</li>
        <li>Acceso desde cualquier dispositivo.</li>
      </ul>

      {/* H2 MKTG Semana 1 - Para quién es */}
      <h2 className="text-2xl font-bold mt-8 mb-2">¿Para quién es este curso?</h2>
      <p className="opacity-90">Para quienes quieren aprender a su ritmo, con cursos claros y acompañamiento real.</p>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button onClick={handleEnroll} disabled={enrolling} className="btn btn-primary flex-1">
          {enrolling ? (<><span className="loading loading-spinner loading-sm"></span> Inscribiéndote...</>) : "Inscribirme"}
        </button>
        <Link to="/catalogo" className="btn btn-outline flex-1">Volver al catálogo</Link>
      </div>
      {enrollMsg && (<div className="alert alert-info mt-4"><span>{enrollMsg}</span>{enrollMsg.includes("sesión") && (<Link to="/login" className="link link-primary ml-2">Ir a Login</Link>)}</div>)}
      <p className="text-sm mt-4 opacity-70">Creá tu cuenta para inscribirte y empezar a aprender.</p>
    </div>
  );
}

export default CursoDetalle;
