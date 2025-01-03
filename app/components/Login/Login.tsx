import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import Input from '../Input/Input';
import { apiUrl } from '../../../utils/variables';
import { useMainContext } from '../../../contexts/useMainContext';
import { Button, GestureResponderEvent, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
    const { setJwtToken } = useMainContext();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const router = useRouter();
    const handleSubmit = async (e: GestureResponderEvent) => {
        try {
            setErrorMessage(undefined);
            e.preventDefault();
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            const login = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    userName,
                    password,
                }),
                redirect: 'follow',
            });

            const loginRes = await login.json();

            if (!login.ok) {
                setErrorMessage(loginRes.message);
                console.log('error:', loginRes.message);
            }
            const accessToken = loginRes.access_token;
            setJwtToken(accessToken);

            saveJwtToken(accessToken);

            router.replace('/components/List/List');
        } catch (e) {
            console.log(e);
        }
    };

    async function saveJwtToken(jwt: string) {
        await AsyncStorage.setItem('school-blog-jwt', jwt);
    }
    return (
        <View>
            <Input
                label="User name"
                type="text"
                set={setUserName}
                value={userName}
                required
            />
            <Input
                label="Password"
                type="password"
                set={setPassword}
                value={password}
                required
            />
            <Button
                onPress={handleSubmit}
                title="Login"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
        </View>
    );
}
