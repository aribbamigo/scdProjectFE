import { Department } from '../../model/department';
import { Http } from '../http';

const DEPARTMENTS_ROUTES = {
  departments: '/getAllDepartments',
  renameDepartment: (id: string) => `/updateDepartment/${id}`,
  addDepartment: '/createDepartment',
  deleteDepartment: (id: string) => `/deleteDepartment/${id}`,
};

export const getDepartments = (): Promise<Department[]> => {
  return Http.departments
    .get<Department[]>(DEPARTMENTS_ROUTES.departments)
    .then((response) => response.data);
};

export const renameDepartment = (
  id: number,
  description: string,
  parentId: number
): Promise<string> => {
  return Http.departments
    .put<string>(DEPARTMENTS_ROUTES.renameDepartment(String(id)), {
      description,
      parentId,
    })
    .then((response) => response.data);
};

export const addDepartment = (
  id: number,
  description: string,
  parentId: number
): Promise<string> => {
  return Http.departments
    .post<string>(DEPARTMENTS_ROUTES.addDepartment, {
      id,
      description,
      parentId,
    })
    .then((response) => response.data);
};

export const deleteDepartment = (id: number): Promise<string> => {
  return Http.departments
    .delete<string>(DEPARTMENTS_ROUTES.deleteDepartment(String(id)))
    .then((response) => response.data);
};
