import { ActivityIndicator, View } from 'react-native';
import React from 'react';

import styles from './Loader.style';

export default () => (
    <View style={styles.loader}>
        <ActivityIndicator />
    </View>
);
