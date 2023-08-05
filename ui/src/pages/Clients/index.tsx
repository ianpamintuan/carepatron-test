import { memo, useContext, useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import { getClients } from '../../services/api';
import { ClientTable } from '../../components/Clients';

import './Clients.css';
import ClientHeader from '../../components/Clients/ClientHeader/ClientHeader';

const Clients = () => {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;
  const [searchValue, setSearchValue] = useState('');

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
      <ClientHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      <Paper sx={{ margin: 'auto', marginTop: 3 }} elevation={0}>
        <ClientTable clients={clients} />
      </Paper>
    </Page>
  );
};

export default memo(Clients);
