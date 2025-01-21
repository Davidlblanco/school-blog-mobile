import { colors } from '@/utils/variables';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TextStyle,
    ViewStyle,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
interface InputProps {
    label: string;
    type: string;
    value: any;
    set: React.Dispatch<React.SetStateAction<any>>;
    required?: boolean;
    message?: string;
    errorMessage?: string;
    placeHolder?: string;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    onlyNumbers?: boolean;
    customStyles?: {
        label?: TextStyle;
        input?: TextStyle;
        message?: TextStyle;
        errorMessage?: TextStyle;
    };
}

export default function Input(props: InputProps) {
    const {
        label,
        type,
        message,
        errorMessage,
        placeHolder,
        required,
        set,
        value,
        disabled,
        maxLength,
        minLength,
        customStyles,
        // onlyNumbers,
    } = props;
    const [error, setError] = useState(false);
    const handleChange = (finalValue: string | boolean) => {
        try {
            set(finalValue);
        } catch (e) {
            console.log(e);
            setError(true);
        }
    };
    return (
        <View style={styles.container}>
            {label !== '' && (
                <Text style={(styles.label, customStyles?.label)}>
                    {label}
                    {required ? '*' : null}
                </Text>
            )}

            {type === 'checkbox' ? (
                <BouncyCheckbox
                    size={25}
                    isChecked={value}
                    textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                    onPress={handleChange}
                />
            ) : (
                <TextInput
                    style={[styles.input, customStyles?.input]}
                    placeholder={placeHolder}
                    // required={required}
                    onChangeText={handleChange}
                    value={value}
                    editable={!disabled}
                    maxLength={maxLength}
                    // minLength={minLength}
                    secureTextEntry={type === 'password'}
                />
            )}
            {message ? (
                <Text style={(styles.message, customStyles?.message)}>
                    message
                    {message}
                </Text>
            ) : null}
            {errorMessage && error ? (
                <Text style={(styles.errorMessage, customStyles?.errorMessage)}>
                    error
                    {errorMessage}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#4A5568',
    },
    input: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    fullWidth: {
        width: '100%',
    },
    message: {
        marginTop: 8,
        fontSize: 14,
        color: '#A0AEC0',
    },
    errorMessage: {
        marginTop: 8,
        fontSize: 14,
        color: '#E53E3E',
    },
});
