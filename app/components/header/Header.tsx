import { useMainContext } from '@/contexts/useMainContext';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
    const { setJwtToken, role, setIsLoggedIn } = useMainContext();

    function handleLogOut() {
        removeJwtToken();
        setJwtToken(undefined);
        setIsLoggedIn(false);
    }

    async function removeJwtToken() {
        await AsyncStorage.removeItem('school-blog-jwt');
    }
    return (
        <View>
            <Text>Blog</Text>
            <View>
                {role === 'ADMIN' ? <Link href="/#">Admin</Link> : null}

                <Link href="/#">My account</Link>
                <Button onPress={handleLogOut} title="LogOut" />
            </View>
        </View>
    );
}
