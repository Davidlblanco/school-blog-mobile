import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { JwtPayload } from '../typings/projectTypes';
import { jwtDecode } from 'jwt-decode';

type FormProviderType = {
    children: React.ReactNode;
};
export type MainContextType = {
    jwtToken: string | undefined;
    setJwtToken: React.Dispatch<React.SetStateAction<string | undefined>>;

    isLoggedIn: boolean | undefined;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>;

    contextError: string | undefined;
    setContextError: React.Dispatch<React.SetStateAction<string | undefined>>;

    contextSuccess: string | undefined;
    setContextSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;

    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;

    searchUser: string;
    setSearchUser: React.Dispatch<React.SetStateAction<string>>;

    openModalId: string;
    setOpenModalId: React.Dispatch<React.SetStateAction<string>>;

    role: string;
};

async function getJwtToken(): Promise<string | null> {
    return await AsyncStorage.getItem('school-blog-jwt');
}

async function removeJwtToken() {
    await AsyncStorage.removeItem('school-blog-jwt');
}

const ProvideMainContext = () => {
    const [jwtToken, setJwtToken] = useState<string | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(
        undefined,
    );
    const [contextError, setContextError] = useState<string | undefined>();
    const [contextSuccess, setContextSuccess] = useState<string | undefined>();
    const [search, setSearch] = useState<string>('');
    const [searchUser, setSearchUser] = useState<string>('');
    const [openModalId, setOpenModalId] = useState<string>('');
    const [role, setRole] = useState<string>('');

    async function setJwt() {
        const jwt = await getJwtToken();
        if (!jwt) {
            setIsLoggedIn(false);
            return;
        }
        const decoded: JwtPayload = jwtDecode(jwt);

        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = decoded.exp - currentTime;
        if (timeUntilExpiration > 0) {
            setJwtToken(jwt);
            setIsLoggedIn(true);
        } else {
            await removeJwtToken();
            setIsLoggedIn(false);
        }
        getRoleFromJwt(jwt);
    }
    useEffect(() => {
        setJwt();
    }, [jwtToken]);

    const getRoleFromJwt = (jwt: string) => {
        const decoded: any = jwtDecode(jwt);
        setRole(decoded.role);
    };
    return {
        jwtToken,
        setJwtToken,
        isLoggedIn,
        setIsLoggedIn,
        contextError,
        setContextError,
        contextSuccess,
        setContextSuccess,
        search,
        setSearch,
        searchUser,
        setSearchUser,
        openModalId,
        setOpenModalId,
        role,
    };
};

const MainContext = createContext<MainContextType>({} as MainContextType);

const MainProvider = ({ children }: FormProviderType) => {
    const value: MainContextType = ProvideMainContext();

    return (
        <MainContext.Provider value={value}>{children}</MainContext.Provider>
    );
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
