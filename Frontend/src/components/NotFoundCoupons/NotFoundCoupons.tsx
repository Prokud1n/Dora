import React from 'react';
import { Text, View } from 'react-native';
import SVG from '../SVG/SVG';
import styles from './NotFoundCoupons.style';

const NotFoundCoupons = () => (
    <View style={styles.containerCoupons}>
        <SVG svg="notFoundCoupons" height="70%" width="50%" />
        <Text style={styles.notFoundText}>Пока здесь ничего нет. Нужно добавить талонов.</Text>
    </View>
);

export default NotFoundCoupons;
