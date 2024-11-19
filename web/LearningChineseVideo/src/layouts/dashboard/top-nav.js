import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import CustomAvatar from 'src/components/custom-avt';
import { Logo } from 'src/components/logo';
import { useAuth } from 'src/hooks/use-auth';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const { user } = useAuth();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.6),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            // lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              minHeight: TOP_NAV_HEIGHT,
            }}
          >

            {/* <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}>
                        <IconButton onClick={onNavOpen}>
                            <SvgIcon fontSize="small">
                                <Bars3Icon />
                            </SvgIcon>
                        </IconButton>
                    </Stack> */}
            <Stack alignItems="center" direction="row">
              <Box
                component={NextLink}
                href="/"
                sx={{
                  display: "inline-flex",
                  height: 32,
                  width: 32,
                }}
              >
                <Logo />

              </Box>
              <Box
                component={NextLink}
                href="/courses"
                sx={{

                  alignItems: "center",
                  justifyContent: "center",
                  height: 32,
                  mt: '30px',
                  ml: '100px',
                  width: 130, // Adjust width as needed
                  // backgroundColor: "#1976d2", // Button background color
                  color: "gray", // Button text color
                  borderRadius: "4px", // Rounded corners
                  textDecoration: "none", // Remove underline from link
                  cursor: "pointer", // Pointer cursor on hover
                  position: "relative", // For pseudo-element positioning
                  overflow: "hidden", // Hide overflow for underline animation
                  "&:hover": {
                    color: "#1565c0", // Text color on hover
                  },
                  "&:hover::after": {
                    width: "100%", // Full width on hover
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: "2px",
                    backgroundColor: "#1565c0",
                    transition: "width 0.3s ease-in-out",
                  },
                }}
              >
                <Stack>Các khóa học</Stack>
              </Box>
            </Stack>
            <Stack direction="row" display="flex" alignItems="center" spacing={5}>
              <Box component={NextLink}
                href="/cart">
                <ShoppingCartOutlinedIcon />
              </Box>
              <Stack alignItems="center" direction="row">
                {user && (
                  <Stack direction="row">
                    <Box ref={accountPopover.anchorRef}>
                      <CustomAvatar
                        hasBorder
                        fullname={user.fullName}
                        src={user.avatar}
                        sx={{
                          cursor: "pointer",
                          height: 40,
                          width: 40,
                        }}
                        onClick={accountPopover.handleOpen}
                      />
                    </Box>
                  </ Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
