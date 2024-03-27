import { useQuery } from 'react-query';
import { Department } from '../../model/department';
import { DEPARTMENT_KEYS } from '../constants';
import { getDepartments } from '../services/departmentsService';

export const useDepartments = () => {
  const {
    data: departments,
    isLoading,
    isError,
    refetch,
  } = useQuery<Department[]>(DEPARTMENT_KEYS.all, () => getDepartments());

  return { departments, isLoading, isError, refetch };
};
