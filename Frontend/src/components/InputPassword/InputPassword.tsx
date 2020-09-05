import React from 'react';
import { NativeSyntheticEvent, TextInput, TextInputEndEditingEventData } from 'react-native';

import styles from './InputPassword.style';

type Props = {
    password: string;
    onChangeText: (v: string) => void;
    onEndEditing?: (_: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
    placeholder?: string;
};

const InputPassword = ({ password, onChangeText, onEndEditing, placeholder = 'Пароль' }: Props) => {
    return (
        <TextInput
            style={styles.input}
            value={password}
            onChangeText={onChangeText}
            onEndEditing={onEndEditing}
            placeholder={placeholder}
            secureTextEntry
        />
    );
};

export default InputPassword;
