const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

let employeeData = [
  { id: 1, name: "Maharshi",age: '22' },
  { id: 2, name: "Maharshi 2",age: '30' },
  { id: 3, name: "Maharshi 3",age: '40' },
];

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/get-employees", (req, res) => {
  res.send(employeeData);
});
app.post("/create-employee", (req, res) => {
  employeeData = [
    ...employeeData,
    {
      name: req.body.name,
      age: req.body.age,
      id: Math.random(),
    },
  ];
  res.send("Updated Data: " + JSON.stringify(employeeData));
});
app.delete("/delete-employee", (req, res) => {
  let id = req.query.id;
  employeeData = employeeData.filter((employee) => {
    if (employee.id != id) {
      return employee;
    }
  });
  res.send("Data Deleted Successfully");
});
app.put("/edit-employee", (req, res) => {
  let id = req.query.id;
  let updatedName = req.query.name;
  let updatedAge = req.query.age;
  employeeData = [
    ...employeeData.map((employee) => {
      if (employee.id == id) {
        return {
          ...employee,
          name: updatedName,
          age: updatedAge
        };
      } else {
        return {
          ...employee,
        };
      }
    }),
  ];

  res.send("Data Updated Successfully" + JSON.stringify(employeeData));
});
app.listen(3100, () => {
  console.log("Server listening on port 3100");
});
