import Box from '@mui/material/Box';
import { styled } from '@mui/system';

export const Sidebar = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

export const SidebarMain = styled(Box)`
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: 50%;
`;

export const SidebarAside = styled(Box)`
  flex-grow: 1;
`;
