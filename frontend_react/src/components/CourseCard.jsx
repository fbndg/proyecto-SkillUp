
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://placehold.co/600x400"
          alt={course.title}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {course.title}
        </h2>

        <p>{course.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary">
            {course.category}
          </span>

          <span className="badge badge-secondary">
            {course.level}
          </span>
        </div>

        <p>
          Duración: {course.durationHours} hs
        </p>

        <p className="font-bold">
          ${course.price}
        </p>

        <div className="card-actions justify-end">
          <Link
            to={`/curso/${course.id}`}
            className="btn btn-primary"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;