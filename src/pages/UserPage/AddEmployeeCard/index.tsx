import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  PopoverOrigin,
  Select,
  SelectChangeEvent,
  SelectProps,
  TextField,
  Typography,
} from '@mui/material';
import { AccordionStyled, AccordionSummaryStyled } from './styles';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from 'react';
import { useDepartments } from '../../../api/queries/useDepartments';
import { useAddDepartment } from '../../../api/mutations/useAddDepartment';
import { useEmployees } from '../../../api/queries/useEmployees';
import { useAddEmployee } from '../../../api/mutations/useAddEmployee';

const MenuProps: SelectProps['MenuProps'] = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
};

type AddEmployeeCardProps = {
  cancelAdd: () => void;
};

export const AddEmployeeCard = ({ cancelAdd }: AddEmployeeCardProps) => {
  const { employees } = useEmployees();
  const { departments } = useDepartments();
  const { addDepartment } = useAddDepartment();
  const { addEmployee } = useAddEmployee();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [departmentId, setDepartmentId] = useState<number>(
    departments ? departments[0].id : 0
  );

  const [managerId, setManagerId] = useState<number>(
    employees ? employees[0].id : 0
  );

  const handleChangeDepartment = (event: SelectChangeEvent) => {
    setDepartmentId(Number(event.target.value));
  };

  const handleChangeManager = (event: SelectChangeEvent) => {
    setManagerId(Number(event.target.value));
  };

  const handleCancelAddDepartment = () => {
    setName('');
    setEmail('');
    setDepartmentId(departments ? departments[0].id : 0);
    setManagerId(employees ? employees[0].id : 0);
    cancelAdd();
  };

  const handleAddEmployee = () => {
    addEmployee({
      id: -1,
      name: name,
      email: email,
      departmentId,
      managerId,
    });
    handleCancelAddDepartment();
  };

  return (
    <AccordionStyled expanded={false}>
      <AccordionSummaryStyled
        aria-controls="panel1d-content"
        id="panel1d-header"
        expandIcon={
          <Box>
            <CheckIcon
              sx={{ fontSize: '20px', marginRight: '5px' }}
              onClick={handleAddEmployee}
            />{' '}
            <CancelOutlinedIcon
              sx={{ fontSize: '20px', marginRight: '5px' }}
              onClick={handleCancelAddDepartment}
            />
          </Box>
        }
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CorporateFareIcon sx={{ fontSize: '30px' }} />
            <TextField
              id="name"
              variant="standard"
              label="Name"
              value={name}
              sx={{
                marginLeft: '10px',
                marginBottom: '15px',
                fontSize: '18px',
                width: '9vw',
              }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setName(e.target.value)}
            />{' '}
            <TextField
              id="email"
              variant="standard"
              value={email}
              label="Email"
              sx={{
                marginLeft: '10px',
                marginBottom: '15px',
                fontSize: '18px',
                width: '9vw',
              }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setEmail(e.target.value)}
            />
            <FormControl
              variant="standard"
              sx={{ width: '9vw', marginLeft: '2vw' }}
            >
              <InputLabel id="select-department">Department</InputLabel>
              <Select
                labelId="select-department"
                id="select-department"
                value={String(departmentId)}
                MenuProps={MenuProps}
                onChange={handleChangeDepartment}
                label="Department"
                sx={{ marginBottom: '16px' }}
              >
                {departments?.map((department) => (
                  <MenuItem
                    value={String(department.id)}
                    key={String(department.id)}
                  >
                    <Typography sx={{ marginRight: '12vw' }}>
                      {department.description}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: '9vw', marginLeft: '2vw' }}
            >
              <InputLabel id="select-manager">Manager</InputLabel>
              <Select
                labelId="select-manager"
                id="select-manager"
                value={String(managerId)}
                MenuProps={MenuProps}
                onChange={handleChangeManager}
                label="Manager"
                sx={{ marginBottom: '16px' }}
              >
                {employees?.map((employee) => (
                  <MenuItem
                    value={String(employee.id)}
                    key={String(employee.id)}
                  >
                    <Typography sx={{ marginRight: '12vw' }}>
                      {employee.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </AccordionSummaryStyled>
    </AccordionStyled>
  );
};
