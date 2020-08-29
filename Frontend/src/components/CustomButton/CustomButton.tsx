import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './CustomButton.style';

type Props = {
    title: string;
    onPress: () => void;
    disabled: boolean;
};

const CustomButton = ({ title, onPress, disabled }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.containerButton}>
            <Text style={[styles.button, disabled && styles.buttonDisabled]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
