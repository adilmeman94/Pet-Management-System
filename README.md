Pet Adoption Management System (MERN Stack)

A full-stack Pet Adoption Management System built using the MERN stack, where users can browse pets, apply for adoption, and admins can manage pets and adoption requests.

🚀 Tech Stack

Frontend

React 18
Material UI (MUI)
TanStack React Query v5
Fetch API
Context API
React Router

Backend

Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Role-based Authorization (Admin / User)

👥 User Roles & Permissions

Visitor

Browse pets
Search pets
View pet status
Paginated admin dashboard

User

Register / Login
Apply for pet adoption
View adoption status (Pending / Approved / Rejected)
Cannot re-apply for the same pet

Admin

Create / Edit / Delete pets
View all adoption requests
Approve or reject adoptions
Pet status updates automatically on approval

How to Run the Project

1️⃣ Backend
cd pet-management-system-backend
npm install
npm run dev

Backend runs on:

http://localhost:5000

2️⃣ Frontend
cd pet-management-system-frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

sample pet Data
{
"name": "Buddy",
"species": "Dog",
"breed": "Golden Retriever",
"age": 3,
"status": "available"
}
