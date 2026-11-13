import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
function CursoDetalle(){
 const {id}=useParams(); const [course,setCourse]=useState(null);
 useEffect(()=>{ fetch(`http://localhost:3001/courses/${id}`).then(r=>r.json()).then(setCourse).catch(console.error); },[id]);
 if(!course) return (<div className="p-8 text-center"><span className="loading loading-spinner loading-lg"></span></div>);
 const user=JSON.parse(localStorage.getItem("user")||"null");
 return (<div className="max-w-3xl mx-auto"><span className="text-xs uppercase tracking-widest text-secondary font-semibold">{course.category}</span><h1 className="text-4xl font-bold mt-2 mb-4">{course.title}</h1><span className="badge badge-outline">{course.level}</span>{course.result && <div className="bg-base-100 p-6 rounded-xl shadow mt-6"><h2 className="font-bold text-lg">Al terminar vas a lograr:</h2><p className="mt-2">{course.result}</p></div>}{course.description && <p className="my-4">{course.description}</p>}{course.durationHours && <p>Duración: {course.durationHours} horas</p>}{course.price!=null && <p className="font-bold mt-2">Precio: ${course.price}</p>}<div className="flex gap-3 mt-8"><Link to={user?"/dashboard":"/login"} className="btn btn-secondary text-white">Inscribirme / Empezar curso</Link><Link to="/catalogo" className="btn btn-outline">Volver al catálogo</Link></div><p className="text-sm mt-6">Ayuda de IA las 24 horas y respaldo humano.</p></div>);
}
export default CursoDetalle;
