import React from 'react';
import { View, Text } from 'react-native';

import styles from './ErrorIndicator.style';

export default ({ message = 'Неопознанная ошибка' }: { message?: string }) => (
    <View style={styles.container}>
        <View style={styles.message}>
            <Text>{message}</Text>
        </View>
    </View>
);
