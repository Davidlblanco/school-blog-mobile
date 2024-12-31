import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import Input from '../Input/Input';
import { apiUrl } from '../../../utils/variables';
import { useMainContext } from '../../../contexts/useMainContext';
import { JwtPayload } from '../../../typings/projectTypes';
import { Button, GestureResponderEvent, Text, View } from 'react-native';

export default function Login() {
    const { setJwtToken } = useMainContext();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const handleSubmit = async (e: GestureResponderEvent) => {
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
        }
        const accessToken = loginRes.access_token;
        setJwtToken(accessToken);

        const decoded: JwtPayload = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = decoded.exp - currentTime;
        //save to local storage
        saveJwtToken(accessToken);
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
        // <div className="flex items-center justify-center min-h-screen bg-gray-800">
        //     <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        //         <h2 className="text-2xl font-bold text-center text-gray-800">
        //             Blog
        //         </h2>
        //         <form onSubmit={handleSubmit} className="space-y-4">
        //             <Input
        //                 label="User name"
        //                 type="text"
        //                 set={setUserName}
        //                 value={userName}
        //                 required
        //             />
        //             <Input
        //                 label="Password"
        //                 type="password"
        //                 set={setPassword}
        //                 value={password}
        //                 required
        //             />
        //             <div className="flex justify-end">
        //                 <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        //                     Login
        //                 </button>
        //             </div>
        //         </form>
        //         {errorMessage ? <p>{errorMessage}</p> : null}
        //     </div>
        // </div>
    );
}
