import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
function Home(){
 const [courses,setCourses]=useState([]);
 const [loading,setLoading]=useState(true);
 useEffect(()=>{ fetch("http://localhost:3001/courses").then(r=>r.json()).then(d=>setCourses(d.slice(0,4))).catch(e=>console.error(e)).finally(()=>setLoading(false)); },[]);
 return (<><div className="hero min-h-[70vh] bg-base-200 rounded-2xl"><div className="hero-content text-center"><div className="max-w-2xl"><h1 className="text-5xl font-bold leading-tight">Aprendé algo que puedas usar</h1><p className="py-6 text-lg">Herramientas para la oficina, tus primeros programas y proyectos con IA.</p><div className="flex flex-wrap justify-center gap-4"><Link to="/catalogo" className="btn btn-secondary text-white">Ver cursos</Link><Link to="/login" className="btn btn-primary">Entrar al campus</Link></div><p className="mt-4 text-sm font-semibold">Ayuda de IA las 24 horas y respaldo humano.</p></div></div></div><section className="py-12"><h2 className="text-3xl font-bold text-center mb-2">Cursos destacados</h2><p className="text-center mb-8">Elegí por lo que querés lograr, no por el tema.</p>{loading ? <p className="text-center">Cargando cursos...</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{courses.map(c=><CourseCard key={c.id} course={c}/>)}</div>}</section></>);
}
export default Home;
