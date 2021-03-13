import { Text, TouchableOpacity, View } from 'react-native';
import React, { ReactNodeArray } from 'react';
import styles from './CustomButton.style';

type Props = {
    title: string;
    onPress: () => void;
    disabled: boolean;
    circleElements?: ReactNodeArray;
    width?: number | string;
    marginTop?: number;
    color?: string;
};

const CustomButton = ({
    title,
    onPress,
    disabled,
    width = 118,
    marginTop = 74,
    color = '#007AFF',
    circleElements
}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.containerButton, { width, marginTop }]}>
            {circleElements && <View style={styles.containerCircle}>{circleElements.map((i) => i)}</View>}
            <Text style={[styles.button, { color }, disabled && styles.buttonDisabled]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
