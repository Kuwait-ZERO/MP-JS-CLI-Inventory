import inquirer from "inquirer";

import Student from "./Student.js";
import showMenu from "./menu.js";

export function addstudent() {
  inquirer
    .prompt([
      { name: "firstName", message: "Enter student first name:" },
      { name: "lastName", message: "Enter the student last name:" },
      {
        name: "grade",
        message: "Enter the grade:",
        validate: (grade) => {
          const gradeNum = parseInt(grade, 10);
          if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 120) {
            return "Please enter a valid grade between 0 and 120.";
          }
          return true;
        },
      },
      {
        name: "yearOfBirth",
        type: "input",
        message: "Enter the year of birth:",
        validate: (year) => {
          const yearNum = parseInt(year, 10);
          if (isNaN(yearNum) || yearNum < 1900) {
            return "Please enter a year of birth.";
          }
          return (
            yearNum <= new Date().getFullYear() ||
            "This studnent was born in the future??"
          );
        },
      },
    ])
    .then((student) => {
      Student.create(student);
      console.log(`${student.firstName} ${student.lastName} was added.`);
      showMenu();
    });
}

export function updateStudent() {
  const students = Student.find();
  if (students.length === 0) {
    console.log("No students available to update.");
    return showMenu();
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "studentId",
        message: "Choose a student to update:",
        choices: students.map((student) => ({
          name: student.firstName,
          value: student.id,
        })),
      },
    ])
    .then(({ studentId }) => {
      const student = Student.findById(studentId);
      inquirer
        .prompt([
          {
            name: "firstName",
            message: "Enter new firstName (leave blank to keep current):",
          },
          {
            name: "lastName",
            message: "Enter new lastName (leave blank to keep current):",
          },
          {
            name: "grade",
            message: "Enter new grade (leave blank to keep current):",
          },
          {
            name: "yearOfBirth",
            type: "input",
            message:
              "Enter new yearOfBirth year (leave blank to keep current):",
            validate: (year) => {
              const yearNum = parseInt(year, 10);
              if (isNaN(yearNum)) {
                return "Please enter a valid number for the publishing year.";
              }
              return (
                yearNum <= new Date().getFullYear() ||
                "This student was yearOfBirth in the future??"
              );
            },
          },
        ])
        .then((updates) => {
          const { firstName, lastName, grade, yearOfBirth } = updates;
          if (firstName) student.firstName = firstName;
          if (lastName) student.lastName = lastName;
          if (grade) student.grade = grade;
          if (yearOfBirth) student.yearOfBirth = yearOfBirth;
          console.log(`Updated ${student.firstName}.`);
          showMenu();
        });
    });
}

export function deleteStudent() {
  const students = Student.find();
  if (students === 0) {
    console.log("No students available to delete.");
    return showMenu();
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "studentId",
        message: "Choose a student to delete:",
        choices: students.map((student) => ({
          name: student.firstName,
          value: student.id,
        })),
      },
    ])
    .then(({ studentId }) => {
      Student.delete(studentId);
      console.log(`Deleted student: "${studentId}".`);
      showMenu();
    });
}

export function viewStudents() {
  const students = Student.find();

  console.log("\nCurrent Student Catalgoue:");
  if (students.length === 0) {
    console.log("No students in the catalgoue.");
  } else {
    console.table(students, ["firstName", "lastName", "grade", "yearOfBirth"]);
  }
  showMenu();
}
export function searchStudent() {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "Enter the student's first name to search:",
      },
    ])
    .then(({ firstName }) => {
      const students = Student.find();
      const results = students.filter(
        (student) => student.firstName.toLowerCase() === firstName.toLowerCase()
      );

      if (results.length === 0) {
        console.log("No students found with that first name.");
      } else {
        console.log("\nSearch Results:");
        console.table(results, [
          "firstName",
          "lastName",
          "grade",
          "yearOfBirth",
        ]);
      }
      showMenu();
    });
}
