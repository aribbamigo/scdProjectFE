import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from '@mui/material';

export const AccordionStyled = styled(Accordion)`
   border: '1px solid black',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  }
  width: 50vw
`;

export const AccordionSummaryStyled = styled(AccordionSummary)`
  backgroundColor: white;
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
`;

export const AccordionDetailsStyled = styled(AccordionDetails)`
  padding: theme.spacing(2),
  borderTop: '1px solid white,
`;
