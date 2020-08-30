import React from 'react';
import { TextInput } from 'react-native';

import styles from './InputPassword.style';

type Props = {
    password: string;
    onChangeText: (v: string) => void;
};

const InputPassword = ({ password, onChangeText }: Props) => {
    return (
        <TextInput
            style={styles.input}
            value={password}
            onChangeText={onChangeText}
            placeholder="Пароль"
            secureTextEntry
        />
    );
};

export default InputPassword;
