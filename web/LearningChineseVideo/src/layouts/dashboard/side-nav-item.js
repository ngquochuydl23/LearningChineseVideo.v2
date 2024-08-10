import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Typography } from '@mui/material';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '10px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: '#06AED4'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: '#fff'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: '#fff'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          <Typography
            textTransform="capitalize"
            variant='button'>
            {title}
          </Typography>
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
