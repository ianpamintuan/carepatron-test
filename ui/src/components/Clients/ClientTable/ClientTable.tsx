import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ClientRow } from '../ClientRow';

interface ClientTableProps {
  clients: IClient[];
}

export const ClientTable: React.FC<ClientTableProps> = ({ clients = [] }) => {
  return (
    <TableContainer sx={{ maxWidth: '100%' }}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone number</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client, key) => (
            <ClientRow key={`client-${key}`} client={client} />
          ))}
          {clients.length === 0 && (
            <TableRow sx={{ padding: 3 }}>
              <TableCell component="th" scope="row" colSpan={3} sx={{ textAlign: 'center' }}>
                No clients
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientTable;
