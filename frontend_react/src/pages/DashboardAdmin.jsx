import { useEffect } from "react";
import { Link } from "react-router-dom";

function DashboardAdmin() {
    useEffect(() => {
        // MKTG Semana 1 - Metatítulo Panel Admin
        document.title = "Administración | SkillUp Campus";
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* H1 MKTG Semana 1 - Único H1 */}
            <h1 className="text-3xl font-bold">
                Administración del campus
            </h1>
            <p className="opacity-80 mt-2">
                Gestioná los cursos, los usuarios y las inscripciones de SkillUp Campus.
            </p>

            <div className="stats shadow mt-6 w-full">
                <div className="stat">
                    <div className="stat-title">
                        Cursos Publicados
                    </div>

                    <div className="stat-value">
                        7
                    </div>
                    <div className="stat-desc">
                        {/* MKTG Semana 1: catálogo tiene 6 cursos + 1 de prueba / borrador */}
                        Según MKTG Semana 1, el catálogo tiene 6 cursos. Este 7 es el dato que viene de tu API / mock.
                    </div>
                </div>
            </div>

            {/* Acciones rápidas - Para que el Admin no tenga que buscar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Link to="/catalogo" className="card bg-base-100 shadow p-6 hover:shadow-lg">
                    <h2 className="text-xl font-bold">Ver catálogo</h2>
                    <p className="opacity-80 text-sm mt-1">Revisá cómo se ven los cursos publicados.</p>
                </Link>
                <div className="card bg-base-100 shadow p-6">
                    <h2 className="text-xl font-bold">Crear curso</h2>
                    <p className="opacity-80 text-sm mt-1">Próximamente: POST /api/courses (admin) - Semana 4 Backend.</p>
                </div>
                <div className="card bg-base-100 shadow p-6">
                    <h2 className="text-xl font-bold">Usuarios</h2>
                    <p className="opacity-80 text-sm mt-1">Próximamente: GET /api/admin/users (admin) - Semana 5 Backend.</p>
                </div>
            </div>

            <p className="text-sm opacity-70 mt-6">
                Nota MKTG Semana 1: Esta página no se indexa en Google (noindex). Solo la ve el administrador.
            </p>
        </div>
    );
}

export default DashboardAdmin;