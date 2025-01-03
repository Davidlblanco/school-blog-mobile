import { StyleSheet } from 'react-native';
import React from 'react';
import Input from '../Input/Input';
interface SearchProps {
    value: string;
    set: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search(props: SearchProps) {
    const { value, set } = props;
    return (
        <Input
            type="text"
            set={set}
            value={value}
            label=""
            placeHolder="Search"
            customStyles={styles}
        ></Input>
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop: 15,
        marginBottom: 0,
    },
});
