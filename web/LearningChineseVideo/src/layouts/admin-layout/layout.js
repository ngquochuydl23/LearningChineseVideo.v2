import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'next/router';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: SIDE_NAV_WIDTH
    }
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
});

export const Layout = withAuthGuard((props) => {
    const router = useRouter();
    const { children, hideHeader } = props;
    const pathname = usePathname();
    const [openNav, setOpenNav] = useState(false);
    const auth = useAuth();
    const { user } = auth;

    const handlePathnameChange = useCallback(
        () => {
            if (openNav) {
                setOpenNav(false);
            }
        },
        [openNav]
    );

    useEffect(() => {
        if (user) {
            if (user.role === "Administrator") {
                handlePathnameChange();
            } else {

            }
        } else {
            router.push('/auth/login');
        }

    }, [pathname]);

    return (
        <>
            {!hideHeader && <TopNav onNavOpen={() => setOpenNav(true)} />}
            <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
            />
            <LayoutRoot>
                <LayoutContainer>
                    {children}
                </LayoutContainer>
            </LayoutRoot>
        </>
    );
});