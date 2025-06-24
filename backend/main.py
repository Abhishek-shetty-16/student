from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# ✅ Correct CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 👈 This matches your frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Student(BaseModel):
    id: int
    name: str
    roll: str
    marks: int

students = []

@app.get("/")
def read_root():
    return {"message": "Welcome to the Student API"}

@app.get("/students")
def get_students():
    return students

@app.post("/students")
def add_student(student: Student):
    students.append(student)
    return {"message": "Student added"}

@app.put("/students/{student_id}")
def update_student(student_id: int, updated: Student):
    for i, s in enumerate(students):
        if s.id == student_id:
            students[i] = updated
            return {"message": "Student updated"}
    raise HTTPException(status_code=404, detail="Student not found")

@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    global students
    students = [s for s in students if s.id != student_id]
    return {"message": "Student deleted"}
