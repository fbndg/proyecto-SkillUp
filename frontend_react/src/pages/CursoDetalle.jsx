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

  if (loading) return <div className="p-6 text-center">Cargando curso...</div>;
  if (!course) return (
    <div className="p-6 text-center">
      <p>Curso no encontrado.</p>
      <Link to="/catalogo" className="btn btn-primary mt-4">Volver al catálogo</Link>
    </div>
  );

  const duration = course.duration || (course.durationHours ? `${course.durationHours} hs` : "");
  const category = course.category || course.level || "General";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <span className="text-xs uppercase tracking-widest text-secondary font-semibold">{category}</span>
      <h1 className="text-4xl font-bold mt-2 mb-4">{course.title}</h1>
      {course.instructor && <p className="opacity-70">Por {course.instructor}</p>}
      <p className="my-4">{course.description}</p>
      {duration && <p>Duración: {duration}</p>}
      {course.level && <p>Nivel: {course.level}</p>}
      <div className="flex gap-3 mt-6">
        <Link to="/catalogo" className="btn btn-outline">Volver al catálogo</Link>
      </div>
      <p className="text-sm mt-6">Ayuda de IA las 24 horas y respaldo humano.</p>
    </div>
  );
}

export default CursoDetalle;