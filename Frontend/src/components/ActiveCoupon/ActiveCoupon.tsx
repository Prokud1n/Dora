import React from 'react';
import { View, Text } from 'react-native';
import TouchableSVG from '../TouchableSVG/TouchableSVG';

import styles from './ActiveCoupon.style';

type Props = {
    name: string;
    status: string;
    category: 'appliancesWhite';
};

const ActiveCoupon = ({ name, status, category }: Props) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.status}>{status}</Text>
            </View>
            <View style={styles.category}>
                <TouchableSVG svg={category} width="100%" height="100%" />
            </View>
        </View>
    );
};

export default ActiveCoupon;
