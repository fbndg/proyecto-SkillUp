import { Link } from "react-router-dom";
function CourseCard({ course }){
 const title = course.title || "";
 const result = course.result || course.description || "";
 const category = course.category || "";
 const level = course.level || "";
 return (<div className="card bg-base-100 shadow-xl overflow-hidden"><figure className="bg-accent h-44 flex items-center justify-center p-4"><div className="text-center"><p className="text-xs uppercase tracking-widest font-semibold">{category}</p><h3 className="font-title font-bold text-xl mt-2 leading-tight">{(course.lines || [title]).join(" ")}</h3></div></figure><div className="card-body"><span className="text-xs uppercase tracking-widest text-secondary font-semibold">{category}</span><h2 className="card-title font-title">{title}</h2>{result && <p className="text-sm"><span className="font-semibold">Al terminar vas a lograr:</span> {result}</p>}<div className="flex flex-wrap gap-2"><span className="badge badge-outline">{level}</span>{course.durationHours && <span className="badge badge-ghost">Duración: {course.durationHours} hs</span>}</div>{course.price != null && <p className="font-bold">${course.price}</p>}<div className="card-actions justify-end mt-2"><Link to={`/curso/${course.id}`} className="btn btn-primary">Ver curso</Link></div></div></div>);
}
export default CourseCard;
