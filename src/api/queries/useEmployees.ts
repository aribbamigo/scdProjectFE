import { useQuery } from 'react-query';
import { EMPLOYEE_KEYS } from '../constants';
import { Employee } from '../../model/employee';
import { getEmployees } from '../services/employeesService';

export const useEmployees = () => {
  const {
    data: employees,
    isLoading,
    isError,
    refetch,
  } = useQuery<Employee[]>(EMPLOYEE_KEYS.all, () => getEmployees());

  return { employees, isLoading, isError, refetch };
};
