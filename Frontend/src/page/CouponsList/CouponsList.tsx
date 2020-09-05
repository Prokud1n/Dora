import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import SVG from '../../components/SVG/SVG';

import styles from './CouponsList.style';

const CouponsList = () => {
    const [search, setSearch] = useState('');

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton />
                <View style={styles.containerHeader}>
                    <SVG svg="settings" height="70%" width="50%" />
                    <TextInput
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Поиск по талонам"
                    />
                    <SVG svg="addCoupon" height="70%" width="50%" />
                </View>
                <View style={styles.containerCoupons}>
                    <SVG svg="notFoundCoupons" height="70%" width="50%" />
                    <Text style={styles.notFoundText}>Пока здесь ничего нет. Нужно добавить талонов.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CouponsList;
