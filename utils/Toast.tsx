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

// import { useEffect } from 'react';
// import { useMainContext } from '../contexts/useMainContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// export default function Toast() {
//     const { contextError, setContextError, contextSuccess, setContextSuccess } =
//         useMainContext();
//     useEffect(() => {
//         if (contextError) {
//             toast.error(contextError, {
//                 position: 'bottom-right',
//                 autoClose: false,
//                 closeOnClick: true,
//                 draggable: true,
//             });
//             setContextError(undefined);
//         }
//         if (contextSuccess) {
//             toast.success(contextSuccess, {
//                 position: 'bottom-right',
//                 // autoClose: false,
//                 closeOnClick: true,
//                 draggable: true,
//             });
//             setContextSuccess(undefined);
//         }
//     }, [contextSuccess, contextError]);
//     return <ToastContainer />;
// }
