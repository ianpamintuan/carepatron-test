import { memo, useContext, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import { getClients } from '../../services/api';
import { ClientTable } from '../../components/Clients';

const Clients = () => {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;

  useEffect(() => {
    getClients().then((clients) => {
      dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients });
    });
  }, [dispatch]);

  return (
    <Page>
      <Typography variant="h4" sx={{ textAlign: 'start' }}>
        Clients
      </Typography>
      <Paper sx={{ margin: 'auto', marginTop: 3 }}>
        <ClientTable clients={clients} />
      </Paper>
    </Page>
  );
};

export default memo(Clients);
