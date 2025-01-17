// import Login from './components/Login/Login';
// import { useMainContext } from '../contexts/useMainContext';
// import List from './components/List/List';

// export default function IsLoggedIn() {
//     const { isLoggedIn } = useMainContext();
//     console.log('isLoggedIn', isLoggedIn);
//     return isLoggedIn ? <List /> : <Login />;
// }

import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { useMainContext } from '../contexts/useMainContext';

export default function IsLoggedIn() {
    const { isLoggedIn } = useMainContext();
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn === undefined) return;
        if (isLoggedIn === false) {
            router.replace('/components/Login/Login');
        } else if (isLoggedIn) {
            router.replace('/components/List/List');
        }
    }, [isLoggedIn, router]);

    return <Text>Pre loader screen</Text>;
}
