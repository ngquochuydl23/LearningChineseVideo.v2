import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import Link from 'next/link';

export const AccountPopover = (props) => {
    const { anchorEl, onClose, open } = props;
    const router = useRouter();
    const auth = useAuth();
    const { user } = auth;

    const handleSignOut = useCallback(
        () => {
            onClose?.();
            auth.signOut();
            router.push('/auth/login');
        },
        [onClose, auth, router]
    );

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: 250 } }}>
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '10px',
                    '& > *': {
                        fontSize: '15px',
                        fontWeight: '500',
                        borderRadius: 1
                    }
                }}>
                <MenuItem
                    onClick={() => {
                        onClose?.();
                        router.push('/account')
                    }}
                    href="/account"
                    LinkComponent={<Link href="/account" />}>
                    Tài khoản
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        onClose?.();
                        router.push('/saved')
                    }}
                    href="/saved"
                    LinkComponent={<Link href="/saved" />}>
                    Từ vựng đã lưu
                </MenuItem>
                {user?.role === "Administrator" &&
                    <>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                onClose?.();
                                router.push('/admin/videos')
                            }}>
                            Đến trang quản trị
                        </MenuItem>
                    </>
                }
                <Divider />
                <MenuItem onClick={handleSignOut}>
                    Đăng xuất
                </MenuItem>
            </MenuList>
        </Popover>
    );
};

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired
};
