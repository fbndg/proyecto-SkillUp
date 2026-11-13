import { useEffect, useState, useMemo } from "react";
import CourseCard from "../components/CourseCard";
function Catalogo(){
 const [courses,setCourses]=useState([]);
 const [q,setQ]=useState(""); const [cat,setCat]=useState("Todas");
 useEffect(()=>{ fetch("http://localhost:3001/courses").then(r=>r.json()).then(setCourses).catch(console.error); },[]);
 const cats=useMemo(()=>["Todas",...new Set(courses.map(c=>c.category).filter(Boolean))],[courses]);
 const filtered=courses.filter(c=> (cat==="Todas"||c.category===cat) && c.title.toLowerCase().includes(q.toLowerCase()));
 return (<div><h1 className="text-3xl font-bold">Catálogo de Cursos</h1><p className="mt-2 mb-6">Elegí por lo que querés lograr, no por el tema.</p><div className="flex flex-wrap gap-3 mb-8"><input className="input input-bordered flex-1 min-w-[220px]" placeholder="Buscar curso..." value={q} onChange={e=>setQ(e.target.value)}/><select className="select select-bordered" value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(c=><CourseCard key={c.id} course={c}/>)}</div>{filtered.length===0 && <p className="mt-8 text-center">No se encontraron cursos con ese filtro.</p>}</div>);
}
export default Catalogo;
