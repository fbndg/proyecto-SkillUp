import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

function Home() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // MKTG Semana 1 - Metatítulo Inicio
        document.title = "Cursos de Excel, programación e IA | SkillUp Campus";

        // CORREGIDO: Rodolfo backend es /api/courses, no /courses
        // Antes: http://localhost:3001/courses -> daba 404 / vacío
        fetch("http://localhost:3001/api/courses")
            .then((res) => res.json())
            .then((data) => {
                // Rodolfo puede devolver array directo o { data: [...] }
                const list = Array.isArray(data) ? data : data.data || [];
                setCourses(list.slice(0, 3));
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            {/* HERO - MKTG Semana 2/3 - Texto izquierda + foto WebP derecha, como en index.html de Marina */}
            <div className="hero min-h-[70vh] bg-base-100">
                {/* MKTG Mobile: en celular Texto primero, Foto después. En desktop Texto izquierda, Foto derecha. */}
                <div className="hero-content flex-col lg:flex-row gap-8 max-w-6xl mx-auto w-full">
                    <div className="w-full lg:w-1/2 text-left order-1">
                        {/* En mobile el H1 va primero, como en el diseño de Marina */}

                        {/* H1 MKTG - Único H1 de la página */}
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Aprendé algo<br />que puedas usar
                        </h1>

                        {/* Bajada MKTG - Textos Inicio */}
                        <p className="py-6 opacity-90">
                            Organizá tus tareas de oficina con Excel y SQL, empezá a programar con Python o creá tu primera web con HTML y CSS. Si ya tenés una base de Python, avanzá hacia tus primeros proyectos con IA.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            {/* Botón principal MKTG: Ver cursos -> /catalogo */}
                            <Link to="/catalogo" className="btn btn-primary w-full sm:w-auto">
                                Ver cursos →
                            </Link>
                            {/* Botón secundario MKTG: Encontrá por dónde empezar -> 3 grupos abajo */}
                            <a href="#por-donde-empezar" className="btn btn-outline w-full sm:w-auto">
                                Encontrá por dónde empezar
                            </a>
                        </div>

                        {/* Texto apoyo MKTG */}
                        <p className="text-sm opacity-80 mt-5">
                            🟠 Ayuda de IA las 24 horas en todos los cursos y el campus.
                        </p>
                    </div>
                    {/* Foto hero - WebP con fallback JPG - En mobile va ABAJO, como en el diseño de Marina */}
                    <picture className="w-full lg:w-1/2 order-2">
                        <source srcSet="/foto_estudio.webp" type="image/webp" />
                        <img
                            src="/foto_estudio.jpg"
                            alt="Estudiante aprendiendo en SkillUp Campus con su laptop y cuaderno"
                            className="w-full rounded-3xl shadow-xl"
                            loading="eager"
                            fetchPriority="high"
                        />
                    </picture>
                </div>
            </div>

            {/* GRUPOS - MKTG Semana 1 - H2s de Inicio */}
            <section id="por-donde-empezar" className="p-8 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Qué querés aprender a hacer
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="card bg-base-100 shadow p-6">
                        <h3 className="text-xl font-bold mb-2">Para tus tareas de oficina</h3>
                        <p className="opacity-80">Excel y SQL para organizar tu trabajo día a día.</p>
                        <Link to="/catalogo" className="btn btn-ghost mt-4">Ver cursos</Link>
                    </div>
                    <div className="card bg-base-100 shadow p-6">
                        <h3 className="text-xl font-bold mb-2">Para empezar a programar</h3>
                        <p className="opacity-80">Python y HTML / CSS desde cero, paso a paso.</p>
                        <Link to="/catalogo" className="btn btn-ghost mt-4">Ver cursos</Link>
                    </div>
                    <div className="card bg-base-100 shadow p-6">
                        <h3 className="text-xl font-bold mb-2">Para crear tus primeros proyectos con IA</h3>
                        <p className="opacity-80">Si ya tenés base de Python, avanzá hacia tus primeros proyectos con IA.</p>
                        <Link to="/catalogo" className="btn btn-ghost mt-4">Ver cursos</Link>
                    </div>
                </div>
            </section>

            {/* AYUDA IA - MKTG Semana 1 */}
            <section className="p-8 bg-base-200">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ayuda de IA las 24 horas y respaldo humano
                    </h2>
                    <p className="opacity-90">
                        Tenés ayuda de IA las 24 horas en todos los cursos y el campus. Si no resuelve tu consulta, una persona te responde dentro de las 24 horas desde la derivación.
                    </p>
                </div>
            </section>

            {/* Cursos destacados - MKTG Semana 1: títulos completos, permitir más de una línea */}
            <section className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Cursos destacados
                </h2>

                {courses.length === 0 ? (
                    <p className="text-center opacity-70">Cargando cursos...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* CIERRE - MKTG Semana 1 */}
            <section className="p-8 text-center bg-base-200">
                <h2 className="text-3xl font-bold mb-4">
                    Elegí qué querés aprender a hacer.
                </h2>
                <Link to="/catalogo" className="btn btn-primary w-full sm:w-auto">
                    Ver cursos
                </Link>
            </section>
        </>
    );
}

export default Home;