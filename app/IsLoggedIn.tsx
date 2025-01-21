import { useEffect } from 'react';
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
            router.replace('/(tabs)/List');
        }
    }, [isLoggedIn, router]);

    return <Text>Pre loader screen</Text>;
}
