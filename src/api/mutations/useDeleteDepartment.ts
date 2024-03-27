import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { DEPARTMENT_KEYS } from '../constants';
import { deleteDepartment } from '../services/departmentsService';

export type UseDeleteDepartmentPayload = {
  id: number;
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    string,
    AxiosError,
    UseDeleteDepartmentPayload
  >(({ id }) => deleteDepartment(id), {
    onSuccess: () => void queryClient.invalidateQueries(DEPARTMENT_KEYS.all),
  });

  return {
    deleteDepartment: mutate,
    isLoading,
  };
};
