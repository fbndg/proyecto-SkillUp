import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DashboardUsuario() {
    useEffect(() => {
        // MKTG Semana 1 - Metatítulo Dashboard Alumno
        document.title = "Mi campus | SkillUp Campus";
    }, []);

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch { user = null; }

    // UXUI Semana 3 - Empty State
    // Demo: 0 = muestra Empty State. Cambiá a 3 para ver la vista con cursos.
    // TODO Semana 5 Backend: este número tiene que venir de GET /api/enrollments/me
    // Si viene 0 -> mostrar Empty State. Si viene >0 -> mostrar Mis cursos.
    const [enrolledCount] = useState(0);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* H1 MKTG Semana 1 - Único H1 */}
            <h1 className="text-3xl font-bold">
                Tu espacio de aprendizaje
            </h1>
            <p className="opacity-80 mt-2">
                Hola {user?.name || "Estudiante"}, acá ves tus cursos y seguís aprendiendo a tu ritmo.
            </p>

            {enrolledCount === 0 ? (
              /* UXUI Semana 3 - Empty State: alumno sin inscripciones */
              <div className="card bg-base-100 shadow p-8 mt-6 text-center max-w-2xl mx-auto">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold">Todavía no te inscribiste a ningún curso</h2>
                <p className="opacity-80 mt-2">
                  Explorá el catálogo y elegí qué querés aprender a hacer.
                </p>
                <Link to="/catalogo" className="btn btn-primary mt-6">
                  Explorar el catálogo
                </Link>
              </div>
            ) : (
              <>
                <div className="stats shadow mt-6 w-full">
                    <div className="stat">
                        <div className="stat-title">Cursos Inscriptos</div>
                        <div className="stat-value">{enrolledCount}</div>
                        <div className="stat-desc">
                            Dato demo Semana 4. En Semana 5 viene de GET /api/enrollments/me.
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Link to="/catalogo" className="card bg-base-100 shadow p-6 hover:shadow-lg">
                        <h2 className="text-xl font-bold">Explorar cursos</h2>
                        <p className="opacity-80 text-sm mt-1">Descubrí cursos y habilidades que te impulsan.</p>
                    </Link>
                    <div className="card bg-base-100 shadow p-6">
                        <h2 className="text-xl font-bold">Mis cursos</h2>
                        <p className="opacity-80 text-sm mt-1">Próximamente: tus inscripciones reales desde el backend.</p>
                    </div>
                </div>
              </>
            )}
        </div>
    );
}

export default DashboardUsuario;