import { useMainContext } from '@/contexts/useMainContext';
import {
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { colors } from '@/utils/variables';

export default function Header() {
    const { setJwtToken, role, setIsLoggedIn } = useMainContext();
    const [openMenu, setOpenMenu] = useState(false);
    const router = useRouter();
    const [drawerWidth] = useState(new Animated.Value(0));

    function handleLogOut() {
        removeJwtToken();
        setJwtToken(undefined);
        setIsLoggedIn(false);
        router.replace('/components/Login/Login');
    }
    function toggleMenu() {
        if (openMenu) {
            Animated.timing(drawerWidth, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setOpenMenu(false));
        } else {
            setOpenMenu(true);
            Animated.timing(drawerWidth, {
                toValue: 200,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }
    async function removeJwtToken() {
        await AsyncStorage.removeItem('school-blog-jwt');
    }
    return (
        <View style={styles.container}>
            <Link href="/components/List/List" style={styles.logo}>
                Blog
            </Link>
            <View>
                <TouchableOpacity
                    onPress={toggleMenu}
                    style={styles.menuButton}
                >
                    <Icon
                        name={openMenu ? 'close' : 'menu'}
                        size={30}
                        color={colors.mainColor}
                    />
                </TouchableOpacity>
                {openMenu && (
                    <Animated.View
                        style={[styles.drawer, { width: drawerWidth }]}
                    >
                        <View style={styles.innetContent}>
                            <Link
                                href="/components/List/List"
                                style={styles.link}
                            >
                                List of Articles
                            </Link>
                            {role === 'ADMIN' ? (
                                <Link
                                    href="/components/ListUsers/ListUsers"
                                    style={styles.link}
                                >
                                    Admin
                                </Link>
                            ) : null}

                            <Link
                                href="/components/MyAccount/MyAccount"
                                style={(styles.link, styles.lastLink)}
                            >
                                My account
                            </Link>
                            <Button
                                onPress={handleLogOut}
                                title="LogOut"
                                color="#ffa384"
                            />
                        </View>
                    </Animated.View>
                )}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: '100%',
        borderBottomColor: colors.greyShadow,
        borderBottomWidth: 1,
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
        marginLeft: 10,
        color: colors.mainColor,
    },
    menuButton: {
        padding: 10,
    },

    drawer: {
        position: 'absolute',
        backgroundColor: colors.easyGrey,
        top: 52,
        right: 0,
        zIndex: 1,
        padding: 20,
        minHeight: Dimensions.get('window').height,
        overflow: 'hidden',
        borderLeftColor: colors.greyShadow,
        borderLeftWidth: 1,
    },
    innetContent: {
        width: 160,
    },
    link: {
        marginBottom: 15,
        color: colors.darkText,
    },
    lastLink: {
        marginBottom: 20,
        color: colors.darkText,
    },
});
