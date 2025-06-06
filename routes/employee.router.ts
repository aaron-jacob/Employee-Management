import express from "express";
import Employee from "../entities/employee.entity";
import datasource from "../db/data-source";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeController from "../controllers/employee.controller";
import EmployeeService from "../services/employee.service";

const employeeRouter = express.Router ();

const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService, employeeRouter);

export default employeeRouter;