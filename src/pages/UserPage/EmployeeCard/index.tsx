import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    SelectProps,
    Typography
} from '@mui/material';
import {AccordionStyled, AccordionSummaryStyled} from './styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import EditIcon from "@mui/icons-material/Edit";
import {useCallback, useState} from "react";
import CheckIcon from "@mui/icons-material/Check";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import {useDepartments} from "../../../api/queries/useDepartments";
import {useAssignDepartment} from "../../../api/mutations/useAssignDepartment";

type EmployeeCardProps = {
    id: string
    name: string;
    email: string;
    managerName: string;
    managerId: string
    departmentName: string;
    departmentId: string
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

export const EmployeeCard = ({
                                 id,
                                 name,
                                 email,
                                 managerName,
                                 managerId,
                                 departmentName,
                                 departmentId
                             }: EmployeeCardProps): JSX.Element => {
    const {assignDepartment} = useAssignDepartment()
    const {departments} = useDepartments();
    const [showDropdown, setDropdown] = useState<boolean>(false);
    const [dropdownDepartmentId, setDropdownDepartmentId] = useState<number>(
        departmentId ? Number(departmentId) : departments ? departments[0].id : 0
    );
    const handleToggleTextfield = () => setDropdown(!showDropdown);

    const handleChangeDepartment = (event: SelectChangeEvent) => {
        setDropdownDepartmentId(Number(event.target.value));
    };

    const handleAssignDepartment = useCallback(() => {
        console.log(dropdownDepartmentId)
        assignDepartment({id: Number(id), name, email, managerId: Number(managerId), departmentId: dropdownDepartmentId});
        setDropdown(false);
    }, [showDropdown, dropdownDepartmentId])

    return (
        <AccordionStyled expanded={false}>
            <AccordionSummaryStyled aria-controls="panel1d-content" id="panel1d-header">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Typography
                        sx={{display: 'flex', gap: '30px', justifyContent: 'space-evenly'}}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '5px',
                            }}
                        >
                            <AccountCircleIcon/> {name}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '5px',
                            }}
                        >
                            <EmailIcon/> {email}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '5px',
                            }}
                        >
                            <MoveUpIcon/> {managerName}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '5px',
                            }}
                        >
                            {showDropdown ? <FormControl
                                variant="standard"
                                sx={{width: '20vw', marginLeft: '2vw'}}
                            >
                                <InputLabel id="demo-simple-select-standard-label">
                                    Department
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={String(dropdownDepartmentId)}
                                    MenuProps={MenuProps}
                                    onChange={handleChangeDepartment}
                                    label="Department"
                                    sx={{marginBottom: '16px', width: '250px'}}
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
                            </FormControl> : <><CorporateFareIcon/> {departmentName}</>}
                        </Box>
                    </Typography>
                    <Box>
                        {showDropdown ? <CheckIcon
                            sx={{fontSize: '20px', marginRight: '5px'}}
                            onClick={handleAssignDepartment}
                        /> : <EditIcon
                            sx={{fontSize: '20px', marginRight: '5px'}}
                            onClick={handleToggleTextfield}
                        />}
                    </Box>
                </Box>
            </AccordionSummaryStyled>
        </AccordionStyled>
    )
}
