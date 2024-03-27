export type Employee = {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  managerId: number;
};

export type AssignedEmployee = {
  name: string;
  email: string;
  managerName: string;
};
