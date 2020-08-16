import React from 'react';
import { Text, View } from 'react-native';

import styles from './AboutUs.style';

const AboutUs = () => {
    return (
        <View>
            <Text style={styles.header}>Ничего не потеряйте</Text>
            <Text style={styles.info}>
                Приложение позволит сохранять свои гарантийные талоны и всегда иметь к ним полный доступ
            </Text>
        </View>
    );
};

export default AboutUs;
