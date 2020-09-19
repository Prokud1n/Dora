import { Text, View } from 'react-native';
import React from 'react';
import BackStepButton from '../BackStepButton/BackStepButton';
import styles from './HeaderAddCoupon.style';

const HeaderAddCoupon = () => {
    return (
        <View style={styles.containerHeader}>
            <BackStepButton />
            <Text style={styles.text}>Новый талон</Text>
        </View>
    );
};

export default HeaderAddCoupon;
