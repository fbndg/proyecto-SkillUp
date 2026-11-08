
SkillUp Campus.

SkillUp Campus es una plataforma educativa colaborativa desarrollada en 8 semanas.
Este repositorio contiene tanto el backend simulado como el frontend SPA.

🚀 Decisiones técnicas.

Frontend: React + Vite + TailwindCSS + DaisyUI
Backend: Node.js + Express (con mocks en JSON)
Autenticación: JWT (JSON Web Token)
Base de datos: MongoDB Atlas (previsto) / JSON local para pruebas.

📂 Estructura.

/backend: API REST con usuarios, cursos e inscripciones.
/frontend: SPA en React (Catálogo, Login, Dashboard).

▶️ Comandos de inicio.

Backend.

cd backend
npm install
node server.js

Frontend.

cd frontend_react
npm install
npm run dev

📊 Endpoints iniciales.

Autenticación.

POST /login → valida credenciales y devuelve token JWT.
Cursos
GET /courses → lista todos los cursos.
POST /courses → crea curso (solo Admin).
PUT /courses/:id → actualiza curso (solo Admin).
DELETE /courses/:id → elimina curso (solo Admin).

Inscripciones.

POST /inscripciones → inscribe al alumno en un curso.

###################################################################

Backend - SkillUp
API temporal desarrollada para cubrir la ausencia del rol Backend.

Tecnologías
Node.js
Express
JWT
CORS
Endpoints
Auth
POST /login

Courses
GET /courses GET /courses/:id

POST /courses PUT /courses/:id DELETE /courses/:id

Users
GET /users

Enrollments
GET /inscripciones POST /inscripciones

Ejecutar
npm install

npm start

Servidor:

http://localhost:3001

#####################################################################

👥 Integrantes.

Backend Developer: (pendiente).
Frontend Developer: Fabián.
UX/UI Designer: Paula.
Project Manager: Mayra.
QA Tester: (pendiente)
Data Analyst: Claudia.
Marketing: Marina.
Diseñador Gráfico: (pendiente).

📊 Gestión.

Tablero Kanban: Trello https://trello.com/invite/b/6ad93f2fc78633b210e4fe1f/ATTI227531f5aae2441ab641b47079e289a1B947827D/tareas-del-equipo


