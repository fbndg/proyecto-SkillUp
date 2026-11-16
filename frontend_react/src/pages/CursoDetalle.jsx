import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CursoDetalle() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/courses")
      .then((res) => res.json())
      .then((data) => {
        const found = (Array.isArray(data) ? data : []).find((c) => String(c.id) === String(id));
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
        <Link to="/register" className="btn btn-primary flex-1">Inscribirme</Link>
        <Link to="/catalogo" className="btn btn-outline flex-1">Volver al catálogo</Link>
      </div>
      <p className="text-sm mt-4 opacity-70">Creá tu cuenta para inscribirte y empezar a aprender.</p>
    </div>
  );
}

export default CursoDetalle;