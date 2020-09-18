import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './DatePurchase.style';

type Props = {
    title: string;
    onPress: () => void;
};

const DatePurchase = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.containerButton}>
            <Text style={styles.button}>{title}</Text>
        </TouchableOpacity>
    );
};

export default DatePurchase;
