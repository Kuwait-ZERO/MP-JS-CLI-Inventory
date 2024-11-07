import inquirer from "inquirer";
import {
  addstudent,
  deleteStudent,
  updateStudent,
  viewStudents,
  searchStudent, // Import the new search function
} from "./controllers.js";

function showMenu() {
  console.log("\n");
  const choices = [
    { name: "Add a student", value: "add" },
    { name: "Update a student", value: "update" },
    { name: "Delete a student", value: "delete" },
    { name: "View all students", value: "list" },
    { name: "Search for a student", value: "search" }, // Add new search option
    { name: "Exit", value: "exit" },
  ];
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices,
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "add":
          addstudent();
          break;
        case "update":
          updateStudent();
          break;
        case "delete":
          deleteStudent();
          break;
        case "list":
          viewStudents();
          break;
        case "search":
          searchStudent();
          break;
        case "exit":
          console.log("Exiting the program.");
          break;
      }
    });
}

export default showMenu;
