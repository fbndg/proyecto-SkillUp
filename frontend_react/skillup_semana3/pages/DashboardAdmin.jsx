import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function DashboardAdmin(){
 const [courses,setCourses]=useState([]);
 useEffect(()=>{ fetch("http://localhost:3001/courses").then(r=>r.json()).then(setCourses).catch(()=>{}); },[]);
 return (<div><h1 className="text-3xl font-bold">Dashboard Administrador</h1><div className="stats shadow mt-6"><div className="stat"><div className="stat-title">Cursos publicados</div><div className="stat-value">{courses.length}</div></div><div className="stat"><div className="stat-title">Usuarios registrados</div><div className="stat-value">—</div></div></div><div className="flex justify-between items-center mt-10 mb-4"><h2 className="text-2xl font-bold">Cursos</h2><button className="btn btn-secondary text-white">+ Nuevo curso</button></div><div className="overflow-x-auto bg-base-100 rounded-xl shadow"><table className="table"><thead><tr><th>Título</th><th>Categoría</th><th>Nivel</th><th>Acción</th></tr></thead><tbody>{courses.map(c=><tr key={c.id}><td>{c.title}</td><td>{c.category}</td><td>{c.level}</td><td><Link to={`/curso/${c.id}`} className="btn btn-sm btn-primary">Ver</Link></td></tr>)}</tbody></table></div></div>);
}
export default DashboardAdmin;
