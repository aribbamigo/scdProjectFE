import {Department} from '../../model/department';
import {Employee} from '../../model/employee';
import {Http} from '../http';

const EMPLOYEES_ROUTES = {
    employees: '/getAllEmployees',
    createEmployee: '/createEmployee',
    assignEmployee: (employeeId: string) => `/updateEmployee/${employeeId}`
};

export const getEmployees = (): Promise<Employee[]> => {
    return Http.employees
        .get<Employee[]>(EMPLOYEES_ROUTES.employees)
        .then((response) => response.data);
};

export const createEmployee = (
    id: number,
    name: string,
    email: string,
    departmentId: number,
    managerId: number
): Promise<string> => {
    return Http.employees
        .post<string>(EMPLOYEES_ROUTES.createEmployee, {
            id,
            name,
            email,
            departmentId,
            managerId,
        })
        .then((response) => response.data);
};

export const updateEmployee = (
    id: number,
    name: string,
    email: string,
    departmentId: number,
    managerId: number
): Promise<string> => {
    return Http.employees
        .put<string>(EMPLOYEES_ROUTES.assignEmployee(String(id)), {
            id,
            name,
            email,
            departmentId,
            managerId,
        })
        .then((response) => response.data);
};
