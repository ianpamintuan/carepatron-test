import { TableCell, TableRow } from '@mui/material';

export interface IProps {
  client: IClient;
}

export const ClientRow = ({ client }: IProps) => {
  const { id, firstName, lastName, email, phoneNumber } = client;

  return (
    <TableRow
      key={id}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5'
        }
      }}
    >
      <TableCell component="th" scope="row" sx={{ color: 'var(--blue)', fontWeight: 600 }}>
        {firstName} {lastName}
      </TableCell>
      <TableCell>{phoneNumber}</TableCell>
      <TableCell>{email}</TableCell>
    </TableRow>
  );
};

export default ClientRow;
