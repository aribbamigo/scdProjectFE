import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { DEPARTMENT_KEYS } from '../constants';
import { addDepartment } from '../services/departmentsService';

export type UseAddDepartmentPayload = {
  id: number;
  description: string;
  parentId: number;
};

export const useAddDepartment = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    string,
    AxiosError,
    UseAddDepartmentPayload
  >(
    ({ id, description, parentId }) => addDepartment(id, description, parentId),
    {
      onSuccess: () => void queryClient.invalidateQueries(DEPARTMENT_KEYS.all),
    }
  );

  return {
    addDepartment: mutate,
    isLoading,
  };
};
