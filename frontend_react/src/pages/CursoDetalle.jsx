import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CursoDetalle() {
    const { id } = useParams();

    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/courses/${id}`)
            .then((res) => res.json())
            .then((data) => setCourse(data))
            .catch((error) => console.error(error));
			then((data) => {
  console.log("Curso recibido:", data);
  setCourse(data);
})
    }, [id]);
 
    if (!course) {
  return (
    <div className="p-8">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}



    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">
                {course.title}
            </h1>

            <p className="mb-4">
                {course.description}
            </p>

            <div className="flex gap-2 mb-4">
                <span className="badge badge-primary">
                    {course.category}
                </span>

                <span className="badge badge-secondary">
                    {course.level}
                </span>
            </div>

            <p>
                Duración: {course.durationHours} horas
            </p>

            <p className="font-bold mt-4">
                Precio: ${course.price}
            </p>
        </div>
    );
}

export default CursoDetalle;