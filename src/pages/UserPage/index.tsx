import { Box, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEmployees } from '../../api/queries/useEmployees';
import { EmployeeCard } from './EmployeeCard';
import { useCallback, useState } from 'react';
import { useDepartments } from '../../api/queries/useDepartments';
import { AddEmployeeCard } from './AddEmployeeCard';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const UsersPage = () => {
  const navigate = useNavigate();
  const { departments } = useDepartments();
  const [showAddIcon, setShowAddIcon] = useState<boolean>(true);
  const { employees } = useEmployees();

  const findAssociatedManagerName = useCallback(
    (employeeId: number) => {
      return (
        employees?.find((employee) => employee.id === employeeId)?.name ?? ''
      );
    },
    [employees]
  );

  const findAssociatedDepartmentName = useCallback(
    (departmentId: number) => {
      return (
        departments?.find((department) => department.id === departmentId)
          ?.description ?? ''
      );
    },
    [departments]
  );

  return (
    <Box>
      <Button
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          margin: '2vw',
          background: 'black',
          '&:hover': {
            background: 'black',
          },
        }}
        variant="contained"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate('/')}
      >
        Departments
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '10vh',
        }}
      >
        <AccountCircleIcon sx={{ fontSize: '125px' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2vh',
            marginTop: '5vh',
          }}
        >
          {employees?.map((employee) => (
            <EmployeeCard
              name={employee.name}
              email={employee.email}
              departmentName={findAssociatedDepartmentName(
                employee.departmentId
              )}
              managerId={String(employee.managerId)}
              id={String(employee.id)}
              departmentId={String(employee.departmentId)}
              managerName={findAssociatedManagerName(employee.managerId)}
            />
          ))}
          {!showAddIcon && (
            <AddEmployeeCard cancelAdd={() => setShowAddIcon(true)} />
          )}
          {showAddIcon && (
            <AddCircleOutlineOutlinedIcon
              sx={{
                fontSize: '50px',
                marginTop: '2vh',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => setShowAddIcon(false)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
