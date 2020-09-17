import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import SVG from '../../components/SVG/SVG';
import TouchableSVG from '../../components/TouchableSVG/TouchableSVG';

import styles from './CouponsList.style';

const CouponsList = () => {
    const history = useHistory();
    const [search, setSearch] = useState('');

    const handleRedirectToSettings = () => {
        history.push('/settings');
    };

    const handleRedirectToInfoPurchase = () => {
        history.push('/info-purchase');
    };

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton />
                <View style={styles.containerHeader}>
                    <TouchableSVG svg="settings" height="100%" width="100%" onPress={handleRedirectToSettings} />
                    <TextInput
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Поиск по талонам"
                    />
                    <TouchableSVG svg="addCoupon" height="100%" width="100%" onPress={handleRedirectToInfoPurchase} />
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
