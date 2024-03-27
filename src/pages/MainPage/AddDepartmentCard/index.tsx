import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
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

type AddDepartmentProps = {
  cancelAdd: () => void;
};

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

export const AddDepartment = ({ cancelAdd }: AddDepartmentProps) => {
  const { departments } = useDepartments();
  const { addDepartment } = useAddDepartment();
  const [description, setDescription] = useState<string>('');
  const [parentId, setParentId] = useState<number>(
    departments ? departments[0].id : 0
  );

  const handleChangeDepartment = (event: SelectChangeEvent) => {
    setParentId(Number(event.target.value));
  };

  const handleCancelAddDepartment = () => {
    setDescription('');
    setParentId(departments ? departments[0].id : 0);
    cancelAdd();
  };

  const handleAddDepartment = () => {
    addDepartment({
      id: -1,
      description,
      parentId: Number(parentId),
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
              onClick={handleAddDepartment}
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
              id="standard-basic"
              variant="standard"
              value={description}
              sx={{ marginLeft: '10px', fontSize: '18px', width: '20vw' }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setDescription(e.target.value)}
            />
            <FormControl
              variant="standard"
              sx={{ width: '20vw', marginLeft: '2vw' }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Parent Department
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={String(parentId)}
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
                    <Typography sx={{display: 'flex', justifyContent: 'flex-start'}}>
                      {department.description}
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
