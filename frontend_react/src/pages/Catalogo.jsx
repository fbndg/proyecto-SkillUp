import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

function Catalogo() {
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");

  useEffect(() => {
    fetch("http://localhost:3001/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch((error) => console.error(error));
  }, []);

  // Esto va ADENTRO del componente, no afuera
  const cats = ["Todas", ...new Set(courses.map((c) => c.category || c.level || "General"))];

  const filtered = courses.filter((c) => {
    const catValue = c.category || c.level || "General";
    return (cat === "Todas" || catValue === cat) && c.title.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Cursos</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          className="input input-bordered flex-1 min-w-"
          placeholder="Buscar curso..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="select select-bordered" value={cat} onChange={(e) => setCat(e.target.value)}>
          {cats.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center py-12">No se encontraron cursos con ese filtro.</p>}
    </div>
  );
}

export default Catalogo;