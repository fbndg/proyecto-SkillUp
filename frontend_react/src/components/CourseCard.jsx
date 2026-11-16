import { Link } from "react-router-dom";

function CourseCard({ course }) {
  if (!course) return null;

  const title = course.title || "Curso sin título";
  // MKTG Semana 1: descripción de la tarjeta, no inventar
  const description = course.description || course.result || "Sin descripción";
  // MKTG Semana 1: Grupo + Nivel
  // Rodolfo manda level / category / group -> usamos lo que venga
  const group = course.group || course.category || "General";
  const level = course.level || "";
  // MKTG Semana 1: Requisito tiene que quedar VISIBLE en la tarjeta
  // Ej: Asistente con Python e IA -> "Variables, condiciones, listas, funciones y archivos en Python"
  // Ej: Excel -> "Uso básico de computadora"
  const requisito = course.requirement || course.requisito || course.prerequisite || course.requirements || "";
  // Rodolfo manda instructor, puente no
  const instructor = course.instructor ? `Por ${course.instructor}` : "";
  // MKTG Semana 1: Precios, duraciones y modalidad se incorporan cuando estén definidos -> NO inventar
  // Solo mostrar duración si viene de la API
  const duration = course.duration || (course.durationHours ? `${course.durationHours} hs` : "");
  // Solo mostrar precio si viene de la API
  const price = course.price != null ? `$${course.price}` : "";

  return (
    <div className="card bg-base-100 shadow-xl h-full flex flex-col">
      <figure>
        {/* Imagen genérica por ahora - MKTG/DG Semana 2-3 traerán imágenes reales */}
        <img src="https://placehold.co/600x400" alt={title} />
      </figure>
      <div className="card-body flex flex-col flex-1">
        {/* MKTG Semana 1: usar títulos completos y permitir que ocupen más de una línea */}
        {/* No truncar, no line-clamp. UXUI Semana 5: la Card no debe romperse con título de 3 renglones */}
        <h2 className="card-title leading-snug min-h-[3.5rem] items-start">{title}</h2>

        <div className="flex flex-wrap gap-2 mb-2">
          {/* Grupo MKTG: Ofimática / Inicio en programación / Programación orientada a la IA */}
          <span className="badge badge-primary">{group}</span>
          {level && (
            <span className="badge badge-secondary">Nivel {level}</span>
          )}
        </div>

        <p className="flex-1">{description}</p>

        {/* Requisito MKTG Semana 1 - VISIBLE, no escondido */}
        {requisito && (
          <p className="text-sm mt-3 bg-base-200 p-2 rounded">
            <span className="font-bold">Requisito: </span>
            {requisito}
          </p>
        )}

        {instructor && <p className="text-sm opacity-70 mt-2">{instructor}</p>}
        {duration && <p className="text-sm mt-1">Duración: {duration}</p>}
        {price && <p className="font-bold mt-1">{price}</p>}

        <div className="card-actions justify-end mt-4">
          {/* MKTG Semana 1: botón es "Ver curso", no "Ver más" -> lleva al detalle */}
          <Link to={`/curso/${course.id}`} className="btn btn-primary">
            Ver curso
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;