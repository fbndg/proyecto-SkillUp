import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
function DashboardUsuario(){
 const user=JSON.parse(localStorage.getItem("user")||'{"name":"Estudiante Demo"}');
 const [courses,setCourses]=useState([]);
 useEffect(()=>{ fetch("http://localhost:3001/courses").then(r=>r.json()).then(setCourses).catch(()=>{}); },[]);
 return (<div><h1 className="text-3xl font-bold">Hola, {user.name}</h1><p className="mt-1">Seguí donde quedaste. Este es tu Campus.</p><div className="tabs tabs-boxed mt-6 w-fit"><a className="tab tab-active">Inicio</a><a className="tab">Mis cursos</a><a className="tab">Perfil</a><a className="tab">Certificados</a></div><div className="stats shadow mt-6"><div className="stat"><div className="stat-title">Cursos inscriptos</div><div className="stat-value">{courses.length}</div></div><div className="stat"><div className="stat-title">Certificados</div><div className="stat-value">0</div></div></div><h2 className="text-2xl font-bold mt-10 mb-4">Mis cursos</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{courses.slice(0,3).map(c=><CourseCard key={c.id} course={c}/>)}</div><p className="mt-6"><Link to="/catalogo" className="link link-primary">Explorar más cursos →</Link></p></div>);
}
export default DashboardUsuario;
