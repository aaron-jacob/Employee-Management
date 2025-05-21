import express from "express";
import Employee from "./employee.entity";
import datasource from "./data-source";
import { Entity } from "typeorm";


const employeeRouter = express.Router();


employeeRouter.get("/", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees);

});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({id:empId})

  if (!employee) {
    res.status(404).send("Employee not found");
    return;
  }
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  console.log(req.body);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  newEmployee.createdAt = new Date();
  newEmployee.updatedAt = new Date();
  const employeeRepository = datasource.getRepository(Employee);
  await employeeRepository.save(newEmployee)
  res.status(201).send(newEmployee);
});

employeeRouter.delete("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({id:empId})
  await employeeRepository.remove(employee)
  res.status(204).send(employee);
});

employeeRouter.put("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employeeToUpdate = await employeeRepository.findOneBy({id:empId});
  employeeToUpdate.email = req.body.email;
  employeeToUpdate.name = req.body.name;
  employeeToUpdate.createdAt = req.body.createdAt;
  employeeToUpdate.updatedAt = req.body.updatedAt;
  await employeeRepository.save(employeeToUpdate)
  res.status(201).send(employeeToUpdate);
});

employeeRouter.patch("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employeeToUpdate = await employeeRepository.findOneBy({id:empId});
  if(req.body.email)
  {employeeToUpdate.email = req.body.email;}
  if(req.body.name)
  {employeeToUpdate.name = req.body.name;}
  if(req.body.createdAt)
  {employeeToUpdate.createdAt = req.body.createdAt;}
  if(req.body.updatedAt)
  {employeeToUpdate.updatedAt = req.body.updatedAt;}
  await employeeRepository.save(employeeToUpdate)
  res.status(201).send(employeeToUpdate);
});


export default employeeRouter;
