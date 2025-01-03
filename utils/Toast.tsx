import React, { useEffect } from 'react';
import { useMainContext } from '../contexts/useMainContext';
import Toast from 'react-native-toast-message';

export default function ToastComponent() {
    const { contextError, setContextError, contextSuccess, setContextSuccess } =
        useMainContext();

    useEffect(() => {
        if (contextError) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: contextError,
                position: 'bottom',
            });
            setContextError(undefined);
        }
        if (contextSuccess) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: contextSuccess,
                position: 'bottom',
            });
            setContextSuccess(undefined);
        }
    }, [contextSuccess, contextError]);

    return <Toast />;
}
