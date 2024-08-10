import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { Box, Container } from '@mui/material';
import HayugoFooter from 'src/components/footer';

const SIDE_NAV_WIDTH = 280;


export const Layout = withAuthGuard((props) => {
    const { children, hideHeader } = props;
    const pathname = usePathname();
    const [openNav, setOpenNav] = useState(false);

    const handlePathnameChange = useCallback(
        () => {
            if (openNav) {
                setOpenNav(false);
            }
        },
        [openNav]
    );

    useEffect(() => {
        handlePathnameChange();
    }, [pathname]);

    return (
        <>
            {!hideHeader && <TopNav onNavOpen={() => setOpenNav(true)} />}
            {/* <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
            /> */}
            <Container maxWidth='xl'>
                {children}
            </Container>
            <HayugoFooter />
        </>
    );
});
