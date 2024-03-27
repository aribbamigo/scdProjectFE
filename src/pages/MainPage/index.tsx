import { useDepartments } from '../../api/queries/useDepartments';
import { useEmployees } from '../../api/queries/useEmployees';
import { Box, Button } from '@mui/material';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { DepartmentCard } from './DepartmentCard';
import { AssignedEmployee } from '../../model/employee';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { AddDepartment } from './AddDepartmentCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const MainPage = () => {
  const { departments } = useDepartments();
  const { employees } = useEmployees();
  const [showAddIcon, setShowAddIcon] = useState<boolean>(true);
  const navigate = useNavigate();

  const computeAssignedEmployees = (
    departmentId: number
  ): AssignedEmployee[] => {
    const filteredEmployees = employees?.filter(
      (employee) => employee.departmentId === departmentId
    );
    if (!filteredEmployees || !employees) return [];
    return filteredEmployees.map((filteredEmployee) => ({
      email: filteredEmployee.email,
      name: filteredEmployee.name,
      managerName:
        employees.find((employee) => employee.id === filteredEmployee.managerId)
          ?.name || '',
    }));
  };

  return (
    <Box>
      <Button
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          margin: '2vw',
          background: 'black',
          '&:hover': {
            background: 'black',
          },
        }}
        variant="contained"
        endIcon={<ArrowForwardIosIcon />}
        onClick={() => navigate('/users')}
      >
        Users
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
        <WysiwygIcon sx={{ fontSize: '125px' }} />
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
          {departments?.map((department) => (
            <DepartmentCard
              departmentId={department.id}
              parentId={department.parentId}
              departmentDescription={department.description}
              assignedEmployees={computeAssignedEmployees(department.id)}
            />
          ))}
          {!showAddIcon && (
            <AddDepartment cancelAdd={() => setShowAddIcon(true)} />
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
