import React, { PropsWithChildren } from 'react';

import Container, { ContainerProps } from '@mui/material/Container';

import { Header } from './Header';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

class PageProps {
  title;
}

export const Page = ({
  title,
  children,
  ...containerProps
}) => (
  // <Container maxWidth="sm" {...containerProps} sx={{ gap: 2, ...containerProps.sx }}>
  //   <Header title={title} />
  //   {children}
  // </Container>
  <div className="" {...containerProps}>
      <Header />
      {children}
    </div>
);

const FullscreenContainer = styled(Box)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const FullscreenPage = ({
  title,
  children,
}) => (
  <div className="">
    <Header title={title} />
    {children}
  </div>
);
