import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './CustomButton.style';

type Props = {
    title: string;
    onPress: () => void;
    disabled: boolean;
    width?: number;
    marginTop?: number;
};

const CustomButton = ({ title, onPress, disabled, width = 118, marginTop = 74 }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.containerButton, { width, marginTop }]}>
            <Text style={[styles.button, disabled && styles.buttonDisabled]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
