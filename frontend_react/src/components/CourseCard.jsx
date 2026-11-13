import { Link } from "react-router-dom";

function CourseCard({ course }) {
  if (!course) return null;

  const title = course.title || "Curso sin título";
  const description = course.description || course.result || "Sin descripción";
  // Rodolfo manda level, puente mandaba category -> usamos lo que venga
  const category = course.category || course.level || "General";
  // Rodolfo manda instructor, puente no
  const instructor = course.instructor ? `Por ${course.instructor}` : "";
  // Rodolfo manda duration: "8 semanas" (texto), puente mandaba durationHours: 20 (número)
  const duration = course.duration || (course.durationHours ? `${course.durationHours} hs` : "");
  // Rodolfo no manda price, puente sí -> solo mostrar si existe
  const price = course.price != null ? `$${course.price}` : "";

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src="https://placehold.co/600x400" alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        {instructor && <p className="text-sm opacity-70">{instructor}</p>}
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary">{category}</span>
          {course.level && course.category && (
            <span className="badge badge-secondary">{course.level}</span>
          )}
        </div>
        {duration && <p>Duración: {duration}</p>}
        {price && <p className="font-bold">{price}</p>}
        <div className="card-actions justify-end">
          <Link to={`/curso/${course.id}`} className="btn btn-primary">
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;