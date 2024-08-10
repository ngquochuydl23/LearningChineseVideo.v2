import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            px: 2,
            py: 3,
          }}
        >
          <Stack direction="row">
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}>
              <Logo />
            </Box>
          </Stack>
        </Box>
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#fff',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
