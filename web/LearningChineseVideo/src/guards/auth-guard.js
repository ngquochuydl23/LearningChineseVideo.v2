import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';

export const AuthGuard = (props) => {
    const { children } = props;
    const router = useRouter();
    const auth = useAuthContext();
    const ignore = useRef(false);
    const [checked, setChecked] = useState(false);

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            if (ignore.current) {
                return;
            }

            ignore.current = true;
            console.log(auth)
            if (!auth.isAuthenticated) {
                console.log('Not authenticated, redirecting');
                router
                    .replace({
                        pathname: '/auth/login',
                        query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
                    })
                    .catch(console.error);
            } else {
                setChecked(true);
            }
        },
        [router.isReady, auth]
    );

    if (!checked) {
        return null;
    }

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};
