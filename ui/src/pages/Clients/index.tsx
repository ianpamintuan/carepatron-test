import { memo, useCallback, useContext, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import { ClientTable } from '../../components/Clients';

import './Clients.css';
import ClientHeader from '../../components/Clients/ClientHeader/ClientHeader';
import ClientCreateModal from '../../components/Modal/ClientCreateModal/ClientCreateModal';
import { useDebounce } from 'use-debounce';

const Clients = () => {
  const { state } = useContext(StateContext);
  const { clients } = state;
  const [searchValue, setSearchValue] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [search] = useDebounce(searchValue, 500);

  const filteredClients = useCallback(
    () =>
      clients.filter((item) => {
        return (
          item.firstName.toLowerCase().includes(search.toLowerCase()) ||
          item.lastName.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [search, clients]
  );

  return (
    <Page className="Clients">
      {showCreateModal && (
        <ClientCreateModal isOpen={showCreateModal} setIsOpen={setShowCreateModal} />
      )}
      <Typography variant="h4" sx={{ textAlign: 'start' }}>
        Clients
      </Typography>
      <ClientHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setShowCreateModal={setShowCreateModal}
      />
      <Paper sx={{ margin: 'auto', marginTop: 3, borderRadius: '8px' }} elevation={0}>
        <ClientTable clients={filteredClients()} />
      </Paper>
    </Page>
  );
};

export default memo(Clients);
