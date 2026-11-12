import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import fs from "fs";

const app = express();
const PORT = 3001;
const SECRET = "skillup-secret"; // clave para JWT

app.use(cors());
app.use(express.json());

// Mock data (podés reemplazar con MongoDB o JSON Server)
let users = JSON.parse(fs.readFileSync("./data/users.json"));
let courses = JSON.parse(fs.readFileSync("./data/courses.json"));
let inscripciones = [];

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

// Middleware de autenticación
function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(403).json({ message: "Token requerido" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Token inválido" });
  }
}

// CRUD de cursos
app.get("/courses", (req, res) => res.json(courses));

app.get("/courses/:id", (req, res) => {
  const course = courses.find(
    c => c.id == req.params.id
  );

  if (!course) {
    return res.status(404).json({
      message: "Curso no encontrado"
    });
  }

  res.json(course);
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find(
    c => c.id == req.params.id
  );

  if (!course) {
    return res.status(404).json({
      message: "Curso no encontrado"
    });
  }

  res.json(course);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/courses", auth, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "No autorizado" });
  const newCourse = { id: Date.now(), ...req.body };
  courses.push(newCourse);
  res.json(newCourse);
});

app.put("/courses/:id", auth, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "No autorizado" });
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ message: "Curso no encontrado" });
  Object.assign(course, req.body);
  res.json(course);
});

app.delete("/courses/:id", auth, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "No autorizado" });
  courses = courses.filter(c => c.id != req.params.id);
  res.json({ message: "Curso eliminado" });
});

// Inscripción
app.post("/inscripciones", auth, (req, res) => {
  const { courseId } = req.body;
  const course = courses.find(c => c.id == courseId);
  if (!course) return res.status(404).json({ message: "Curso no encontrado" });

  inscripciones.push({ userId: req.user.id, courseId });
  res.json({ message: "Inscripción exitosa", course });
});

app.get("/inscripciones", auth, (req, res) => {

  const misInscripciones =
    inscripciones.filter(
      i => i.userId == req.user.id
    );

  res.json(misInscripciones);

});

app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));