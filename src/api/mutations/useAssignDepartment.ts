import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import {DEPARTMENT_KEYS, EMPLOYEE_KEYS} from '../constants';
import {updateEmployee} from "../services/employeesService";

export type UseAddDepartmentPayload = {
    id: number;
    name: string;
    email: string;
    departmentId: number;
    managerId: number;
};

export const useAssignDepartment = () => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation<
        string,
        AxiosError,
        UseAddDepartmentPayload
    >(
        ({ id, name, email, departmentId , managerId }) => updateEmployee(id, name, email, departmentId, managerId),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(DEPARTMENT_KEYS.all)
                void queryClient.invalidateQueries(EMPLOYEE_KEYS.all)
            },
        }
    );

    return {
        assignDepartment: mutate,
        isLoading,
    };
};
