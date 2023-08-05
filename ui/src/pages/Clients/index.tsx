import { memo, useContext, useEffect } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import { getClients } from '../../services/api';
import { ClientTable } from '../../components/Clients';

import './Clients.css';

const Clients = () => {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;

  useEffect(() => {
    getClients().then((clients) => {
      dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients });
    });
  }, [dispatch]);

  return (
    <Page className="Clients">
      <Typography variant="h4" sx={{ textAlign: 'start' }}>
        Clients
      </Typography>
      <Stack sx={{ marginTop: 4 }} direction="row" justifyContent="space-between">
        <OutlinedInput
          type="text"
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="search" edge="end">
                <Search />
              </IconButton>
            </InputAdornment>
          }
          sx={{ background: '#fff' }}
        />
        <Button variant="contained" disableElevation sx={{ textTransform: 'none' }}>
          Create new client
        </Button>
      </Stack>
      <Paper sx={{ margin: 'auto', marginTop: 3 }} elevation={0}>
        <ClientTable clients={clients} />
      </Paper>
    </Page>
  );
};

export default memo(Clients);
