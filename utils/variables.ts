import { StyleSheet } from 'react-native';

export const apiUrl = __DEV__
    ? 'http://10.0.2.2:3000' // Development (Android emulator)
    : 'https://school-blog-back-1727553447.onrender.com'; // Production

export const colors = {
    mainColor: '#ffa384',
    easyGrey: '#f9f9f9',
    darkText: '#464646',
    greyShadow: '#f1f1f1',
    greyDarkShadow: '#e5e5e5',
    lightBg: '#ffebe2',
    message: '#A0AEC0',
    errorMessage: '#E53E3E',
};

export const formContainerStyles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.lightBg,
        height: '100%',
    },
    innerContainer: {
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#fff',
    },
});

export const listStyles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: colors.lightBg,
    },
    list: {
        flex: 1,
        marginTop: 0,
    },
    button: {
        marginBottom: 16,
    },
});

export const listItemStyles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderColor: colors.greyShadow,
        marginBottom: 16,
    },
    item: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        minWidth: '100%',
    },
    title: {
        fontSize: 32,
        color: colors.darkText,
    },
    userInfo: {
        fontSize: 15,
        color: colors.darkText,
        marginLeft: 50,
        lineHeight: 30,
    },

    icon: {
        marginTop: 12,
        marginRight: 10,
    },
    updatingSection: {
        paddingTop: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
    },
});
