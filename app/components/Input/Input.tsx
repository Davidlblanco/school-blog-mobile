import { ChangeEvent, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
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
                <Text style={styles.label}>
                    {label}
                    {required ? '*' : null}
                </Text>
            )}

            {type === 'checkbox' ? (
                <BouncyCheckbox
                    size={25}
                    // fillColor="red"
                    // unFillColor="#FFFFFF"
                    // text="Custom Checkbox"
                    // iconStyle={{ borderColor: 'red' }}
                    // innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                    onPress={handleChange}
                />
            ) : (
                <TextInput
                    style={[
                        styles.input,
                        type !== 'checkbox' ? styles.fullWidth : null,
                    ]}
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
            {message ? <Text style={styles.message}>{message}</Text> : null}
            {errorMessage && error ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
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
        borderWidth: 1,
        borderColor: '#CBD5E0',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
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
