import { useMainContext } from '@/contexts/useMainContext';
import { View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';

export default function Header() {
    const { setJwtToken, role, setIsLoggedIn } = useMainContext();
    const [openMenu, setOpenMenu] = useState(false);
    const router = useRouter();
    function handleLogOut() {
        removeJwtToken();
        setJwtToken(undefined);
        setIsLoggedIn(false);
        router.replace('/components/Login/Login');
    }
    function toggleMenu() {
        setOpenMenu(!openMenu);
    }
    async function removeJwtToken() {
        await AsyncStorage.removeItem('school-blog-jwt');
    }
    return (
        <View>
            <Link href="/components/List/List">Blog</Link>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                <Icon
                    name={openMenu ? 'close' : 'menu'}
                    size={30}
                    color="#000"
                />
            </TouchableOpacity>
            {openMenu && (
                <View>
                    <Link href="/components/List/List">List of Articles</Link>
                    {role === 'ADMIN' ? (
                        <Link href="/components/ListUsers/ListUsers">
                            Admin
                        </Link>
                    ) : null}

                    <Link href="/components/MyAccount/MyAccount">
                        My account
                    </Link>
                    <Button onPress={handleLogOut} title="LogOut" />
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    menuButton: {
        padding: 10,
    },
});
