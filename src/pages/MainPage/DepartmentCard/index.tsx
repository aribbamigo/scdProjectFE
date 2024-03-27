import { Box, TextField, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import {
  AccordionDetailsStyled,
  AccordionStyled,
  AccordionSummaryStyled,
} from './styles';
import { AssignedEmployee } from '../../../model/employee';
import { useRenameDepartment } from '../../../api/mutations/useRenameDepartment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDeleteDepartment } from '../../../api/mutations/useDeleteDepartment';

type DepartmentCardProps = {
  departmentId: number;
  parentId: number;
  departmentDescription: string;
  assignedEmployees: AssignedEmployee[];
};

export const DepartmentCard = ({
  departmentId,
  parentId,
  departmentDescription,
  assignedEmployees,
}: DepartmentCardProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showTextfield, setShowTextField] = useState<boolean>(false);
  const [modifiedDescription, setModifiedDescription] = useState<string>(
    departmentDescription
  );
  const { deleteDepartment } = useDeleteDepartment();
  const { renameDepartment } = useRenameDepartment();

  const handleExpand = () => {
    if (showTextfield) setShowTextField(false);
    setExpanded(!expanded);
  };

  const handleToggleTextfield = () => setShowTextField(!showTextfield);

  const handleSaveDescription = () => {
    renameDepartment({
      departmentId,
      description: modifiedDescription,
      parentId,
    });
    setShowTextField(false);
  };

  return (
    <AccordionStyled expanded={expanded}>
      <AccordionSummaryStyled
        aria-controls="panel1d-content"
        id="panel1d-header"
        expandIcon={
          <KeyboardArrowDownIcon
            sx={{ fontSize: '30px' }}
            onClick={handleExpand}
          />
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CorporateFareIcon
              sx={{ fontSize: '30px' }}
              onClick={handleExpand}
            />
            {showTextfield ? (
              <TextField
                id="standard-basic"
                variant="standard"
                value={modifiedDescription}
                sx={{ marginLeft: '10px', fontSize: '18px', width: '20vw' }}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setModifiedDescription(e.target.value)}
              />
            ) : (
              <Typography
                sx={{ paddingLeft: '8px', fontSize: '18px' }}
                onClick={handleExpand}
              >
                {departmentDescription}
              </Typography>
            )}
          </Box>

          {expanded ? (
            showTextfield ? (
              <CheckIcon
                sx={{ fontSize: '20px', marginRight: '5px' }}
                onClick={handleSaveDescription}
              />
            ) : (
              <Box sx={{ marginTop: '5px' }}>
                {' '}
                <EditIcon
                  sx={{ fontSize: '20px', marginRight: '5px' }}
                  onClick={handleToggleTextfield}
                />
                <DeleteOutlineIcon
                  sx={{ fontSize: '20px', marginRight: '5px' }}
                  onClick={() => deleteDepartment({ id: departmentId })}
                />
              </Box>
            )
          ) : null}
        </Box>
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '10px',
            flexDirection: 'column',
          }}
        >
          {assignedEmployees.map((currentEmployee) => (
            <Typography sx={{ display: 'flex', gap: '30px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <AccountCircleIcon /> {currentEmployee.name}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <EmailIcon /> {currentEmployee.email}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <MoveUpIcon /> {currentEmployee.managerName}
              </Box>
            </Typography>
          ))}
        </Box>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};
