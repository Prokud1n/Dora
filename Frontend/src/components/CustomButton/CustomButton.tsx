import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './CustomButton.style';

type Props = {
    title: string;
    onPress: () => void;
    disabled: boolean;
    width?: number;
    marginTop?: number;
    color?: string;
};

const CustomButton = ({ title, onPress, disabled, width = 118, marginTop = 74, color = '#007AFF' }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.containerButton, { width, marginTop }]}>
            <Text style={[styles.button, { color }, disabled && styles.buttonDisabled]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
