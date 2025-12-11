import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        bgcolor="#FFFFFF"
      >
        <Header />

        <Box
          component="main"
          flex={1}
          px={6}
          py={4}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
