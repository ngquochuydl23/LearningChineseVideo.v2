import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid, Container } from '@mui/material';
import { Logo } from 'src/components/logo';


export const Layout = (props) => {
  const { children } = props;

  return (
    <Container>
      <Box>
        <Box
          component="header"
          sx={{
            left: 0,
            p: 3,
            position: 'fixed',
            top: 0,
            width: '100%'
          }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }} >
            <Logo />
          </Box>
        </Box>
        {children}
      </Box>
    </Container>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};