import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import Input from '../Input/Input';
import { apiUrl } from '../../../utils/variables';
import { useMainContext } from '../../../contexts/useMainContext';
import {
    GestureResponderEvent,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
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
            } else {
                router.replace('/components/List/List');
            }
            const accessToken = loginRes.access_token;
            setJwtToken(accessToken);

            saveJwtToken(accessToken);
        } catch (e) {
            console.log(e);
        }
    };

    async function saveJwtToken(jwt: string) {
        await AsyncStorage.setItem('school-blog-jwt', jwt);
    }
    return (
        <ImageBackground
            source={require('../../../assets/images/gradient.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Blog</Text>
                <Input
                    label="User name"
                    type="text"
                    set={setUserName}
                    value={userName}
                    required
                    customStyles={styles}
                />
                <Input
                    label="Password"
                    type="password"
                    set={setPassword}
                    value={password}
                    required
                    customStyles={styles}
                />
                {/* <Button
                    onPress={handleSubmit}
                    title="Login"
                    color="#fff"
                    accessibilityLabel="Login button"
                /> */}
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
                {errorMessage && (
                    <Text style={styles.error}>{errorMessage}</Text>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fff',
    },
    error: {
        marginTop: 16,
        color: '#fff',
    },
    label: {
        color: '#fff',
    },

    input: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minWidth: '90%',
        maxWidth: 400,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#fff',
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        color: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 4,
        minWidth: '90%',
        maxWidth: 400,
        textAlign: 'center',
        marginTop: 20,
        // alignSelf: 'flex-end',
    },
    message: { color: '#fff' },
    errorMessage: { color: '#fff' },
});
