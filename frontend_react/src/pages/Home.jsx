import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

function Home() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data.slice(0, 3)))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <div className="hero min-h-[70vh] bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-bold">
                            Aprendé algo que puedas usar
                        </h1>

                        <p className="py-6">
                            Capacitate con cursos prácticos orientados al mundo laboral.
                        </p>

                        <div className="flex justify-center gap-4">
                            <Link
                                to="/catalogo"
                                className="btn btn-primary"
                            >
                                Explorar cursos
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-outline"
                            >
                                Crear cuenta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cursos destacados */}

            <section className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Cursos destacados
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default Home;