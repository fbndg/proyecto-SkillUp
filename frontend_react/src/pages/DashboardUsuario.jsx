function DashboardUsuario() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">
                Mi Panel
            </h1>

            <div className="stats shadow mt-6">
                <div className="stat">
                    <div className="stat-title">
                        Cursos Inscriptos
                    </div>

                    <div className="stat-value">
                        3
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardUsuario;