import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { DEPARTMENT_KEYS, EMPLOYEE_KEYS } from '../constants';
import { createEmployee } from '../services/employeesService';

export type UseAddEmployeePayload = {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  managerId: number;
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    string,
    AxiosError,
    UseAddEmployeePayload
  >(
    ({ id, name, email, departmentId, managerId }) =>
      createEmployee(id, name, email, departmentId, managerId),
    {
      onSuccess: () => void queryClient.invalidateQueries(EMPLOYEE_KEYS.all),
    }
  );

  return {
    addEmployee: mutate,
    isLoading,
  };
};
