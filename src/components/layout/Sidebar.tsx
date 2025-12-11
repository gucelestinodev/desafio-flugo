import { Box, Typography } from '@mui/material';

import flugoLogo from '../../assets/flugo-logo.svg';
import userIcon from '../../assets/user.svg';
import arrowIcon from '../../assets/arrow.svg';

export default function Sidebar() {
  return (
    <Box
      width={240}
      bgcolor="#ffffff"
      borderRight="1px solid #e5e7eb"
      p={3}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={flugoLogo}
          alt="Flugo"
          sx={{ width: 75, height: 'auto' }}
        />
      </Box>

      <Box
        onClick={() => console.log('Colaboradores clicado')}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={1.5}
        borderRadius={2}
        sx={{
          cursor: 'pointer',
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            component="img"
            src={userIcon}
            alt="Ícone usuários"
            sx={{ width: 20, height: 20 }}
          />

          <Typography
            sx={{
              fontFamily: '"Public Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '22px',
            }}
          >
            Colaboradores
          </Typography>
        </Box>

        <Box
          component="img"
          src={arrowIcon}
          alt="Abrir"
          sx={{ width: 14, height: 14 }}
        />
      </Box>
    </Box>
  );
}
