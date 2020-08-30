import { TextInput } from 'react-native';
import React from 'react';

import styles from './InputEmail.style';

type Props = {
    email: string;
    onChangeText: (v: string) => void;
};

const InputEmail = ({ email, onChangeText }: Props) => {
    return <TextInput style={styles.input} value={email} onChangeText={onChangeText} placeholder="Электропочта" />;
};

export default InputEmail;
