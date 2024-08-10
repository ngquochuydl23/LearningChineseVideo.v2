import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { login, persistLogin } from 'src/services/api/user-api';
import { useRouter } from 'next/router';
import { Token } from '@mui/icons-material';

const HANDLERS = {
    INITIALIZE: 'INITIALIZE',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
};

const handlers = {
    [HANDLERS.INITIALIZE]: (state, action) => {
        const user = action.payload;
        return {
            ...state,
            ...(
                user
                    ? ({
                        isAuthenticated: true,
                        isLoading: false,
                        user
                    })
                    : ({
                        isLoading: false
                    })
            )
        };
    },
    [HANDLERS.SIGN_IN]: (state, action) => {
        const user = action.payload;
        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    [HANDLERS.SIGN_OUT]: (state) => {
        return {
            ...state,
            isAuthenticated: false,
            user: null
        };
    }
};

const reducer = (state, action) => (
    handlers[action.type] ? handlers[action.type](state, action) : state
);


export const AuthContext = createContext({ undefined });
export const AuthProvider = (props) => {

    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const initialized = useRef(false);
    const router = useRouter();

    const initialize = async () => {
        if (initialized.current) {
            return;
        }

        initialized.current = true;

        let isAuthenticated = false;
        try {
            isAuthenticated = Boolean(localStorage.getItem('accessToken'));

            console.log(localStorage.getItem('accessToken'));
        } catch (err) {
            console.error(err);
        }

        if (isAuthenticated) {
            const user = await persistLogin();
            dispatch({
                type: HANDLERS.INITIALIZE,
                payload: user
            });
        } else {
            dispatch({
                type: HANDLERS.INITIALIZE
            });
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    const persistSignIn = async () => {
        const { user } = await persistLogin();

        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });
    };

    const signIn = async (phoneNumber, password) => {
        const { user, token } = await login(phoneNumber, password);
        if (user && user.role === "Administrator") {
            router.push('/');
        }

        try {
            localStorage.setItem('accessToken', token);
        } catch (err) {
            console.error(err);
        }

        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });
    };

    const signOut = () => {
        dispatch({
            type: HANDLERS.SIGN_OUT
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                persistSignIn,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
