import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { renameDepartment } from '../services/departmentsService';
import { DEPARTMENT_KEYS } from '../constants';

export type UseRenameDepartmentPayload = {
  departmentId: number;
  description: string;
  parentId: number;
};

export const useRenameDepartment = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, mutate, isSuccess } = useMutation<
    string,
    AxiosError,
    UseRenameDepartmentPayload
  >(
    ({ departmentId, description, parentId }) =>
      renameDepartment(departmentId, description, parentId),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(DEPARTMENT_KEYS.all);
      },
    }
  );

  return {
    isLoading,
    isError,
    isSuccess,
    renameDepartment: mutate,
  };
};
