import EmployeeRepository from "../repositories/employee.repository";
import Employee from "../entities/employee.entity";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async getAllEmployees (): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById (id: number): Promise<Employee> {
        return this.employeeRepository.findOneById(id);
    }

    async createEmployee (email: string, name: string): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        return this.employeeRepository.create(newEmployee);
    }

    async updateEmployee (id: number, email: string, name: string){
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if(existingEmployee)
        {
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            await this.employeeRepository.update(id, employee)
        }  

        return existingEmployee;
    }

    async deleteEmployee (id: number){
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if(existingEmployee)
        {
            this.employeeRepository.delete(id);
        } 
        return existingEmployee;
    }
}

export default EmployeeService;