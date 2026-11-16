import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

const CURSOS_MKTG = [
  {
    id: "mktg-excel",
    title: "Excel desde cero para el trabajo",
    description: "Armá una planilla de ingresos y gastos con fórmulas y gráficos. Empezá desde cero.",
    group: "Ofimática y primeros pasos en datos",
    category: "Ofimática y primeros pasos en datos",
    level: "Inicial",
    requirement: "Uso básico de computadora",
  },
  {
    id: "mktg-python",
    title: "Python desde cero para resolver tareas",
    description: "Creá un programa de gastos y aprendé las bases de Python paso a paso.",
    group: "Inicio en programación",
    category: "Inicio en programación",
    level: "Inicial",
    requirement: "",
  },
  {
    id: "mktg-html",
    title: "Tu primera página web con HTML y CSS",
    description: "Diseñá una página de presentación que se vea en celular y computadora",
    group: "Inicio en programación",
    category: "Inicio en programación",
    level: "Inicial",
    requirement: "",
  },
  {
    id: "mktg-asistente",
    title: "Tu primer asistente con Python e IA",
    description: "Conectá Python con IA y creá un asistente para resumir textos e identificar pendientes.",
    group: "Programación orientada a la IA",
    category: "Programación orientada a la IA",
    level: "Inicial con base de Python",
    requirement: "Variables, condiciones, listas, funciones y archivos en Python",
  },
];

// Deduplicar por ID - Si la API devuelve el mismo curso 100 veces, mostrarlo 1 vez
function dedupById(list) {
  const seen = new Set();
  return list.filter((c) => {
    const id = c.id ?? c.title;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

// Asignar grupo exacto, no por substring "ia" que matchea todo
function grupoDe(c) {
  const g = `${c.group || ""} ${c.category || ""}`.toLowerCase();
  const t = (c.title || "").toLowerCase();
  if (g.includes("ofim") || t.includes("excel") || t.includes("sql")) return "ofimatica";
  if (g.includes("orientada a la ia") || g === "programación orientada a la ia" || t.includes("asistente") || t.includes("con ayuda de ia")) return "ia";
  if (g.includes("inicio") || t.includes("python") || t.includes("html") || t.includes("página") || t.includes("pagina")) return "inicio";
  return "otros";
}

function Catalogo() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");

  useEffect(() => {
    document.title = "Catálogo de cursos prácticos | SkillUp Campus";

    fetch("http://localhost:3001/api/courses")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        const clean = dedupById(list);
        console.log("Cursos desde API:", list.length, "Únicos:", clean.length);
        setCourses(clean.length > 0 ? clean : CURSOS_MKTG);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setCourses(CURSOS_MKTG);
        setLoading(false);
      });
  }, []); // Solo 1 vez, no en loop

  const cats = ["Todas", ...new Set(courses.map((c) => c.category || c.group || c.level || "General"))];

  const filtered = courses.filter((c) => {
    const catValue = c.category || c.group || c.level || "General";
    const title = (c.title || "").toLowerCase();
    return (cat === "Todas" || catValue === cat) && title.includes(q.toLowerCase());
  });

  const grupoOfimatica = filtered.filter((c) => grupoDe(c) === "ofimatica");
  const grupoInicio = filtered.filter((c) => grupoDe(c) === "inicio");
  const grupoIA = filtered.filter((c) => grupoDe(c) === "ia");
  const grupoOtros = filtered.filter((c) => grupoDe(c) === "otros");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Elegí qué querés aprender a hacer</h1>
      <p className="opacity-80 mb-6">
        Organizá tus tareas de oficina con Excel y SQL, empezá a programar con Python o creá tu primera página web con HTML y CSS. Si ya tenés una base de Python, avanzá hacia tus primeros proyectos con IA.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <input
          className="input input-bordered flex-1 min-w-[220px]"
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

      {loading ? (
        <p className="text-center py-12">Cargando cursos...</p>
      ) : cat === "Todas" && q === "" ? (
        <>
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Ofimática y primeros pasos en datos</h2>
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
              {grupoOfimatica.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Inicio en programación</h2>
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
              {grupoInicio.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Programación orientada a la IA</h2>
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
              {grupoIA.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          {grupoOtros.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Otros cursos</h2>
              <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                {grupoOtros.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center py-12">No se encontraron cursos con ese filtro.</p>}
        </>
      )}

      <p className="text-center text-sm opacity-70 mt-8">
        Ayuda de IA las 24 horas en todos los cursos y el campus. Si no resuelve tu consulta, una persona te responde dentro de las 24 horas desde la derivación.
      </p>
    </div>
  );
}

export default Catalogo;