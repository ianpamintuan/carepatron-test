import { Search } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, OutlinedInput, Stack } from '@mui/material';

interface ClientHeaderProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setShowCreateModal: (open: boolean) => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({
  searchValue,
  setSearchValue,
  setShowCreateModal
}) => {
  const handleOpenCreateClientModal = () => {
    setShowCreateModal(true);
  };

  return (
    <Stack sx={{ marginTop: 4 }} direction="row" justifyContent="space-between">
      <OutlinedInput
        type="text"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="search" edge="end" sx={{ pointerEvents: 'none' }}>
              <Search />
            </IconButton>
          </InputAdornment>
        }
        sx={{ background: '#fff' }}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <Button
        variant="contained"
        disableElevation
        sx={{ textTransform: 'none' }}
        onClick={handleOpenCreateClientModal}
      >
        Create new client
      </Button>
    </Stack>
  );
};

export default ClientHeader;
