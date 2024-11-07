import { v4 as uuid4 } from "uuid";

import students from "./data/students.js";

const Student = {};

Student.create = function (studentData) {
  const newStudent = {
    ...studentData,
    grade: Number(studentData.grade),
    yearOfBirth: Number(studentData.yearOfBirth),
    id: uuid4(),
  };
  students.push(newStudent);
  return newStudent;
};

Student.find = function (where) {
  return students;
};

Student.findById = function (studentId) {
  return students.find((student) => student.id === studentId);
};

Student.delete = function (studentId) {
  const deleteIndex = students.findIndex((student) => student.id === studentId);
  if (deleteIndex !== -1) students.splice(deleteIndex, 1);
};

export default Student;
