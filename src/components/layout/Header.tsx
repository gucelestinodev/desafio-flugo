// src/components/layout/Header.tsx
import { Avatar, Box, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box
      height={72}
      bgcolor="#ffffff"
      borderBottom="1px solid #e5e7eb"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      px={4}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ width: 32, height: 32 }}>G</Avatar>
      </Box>
    </Box>
  );
}
