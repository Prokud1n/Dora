import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import SVG from '../../components/SVG/SVG';
import TouchableSVG from '../../components/TouchableSVG/TouchableSVG';
import ActiveCoupon from '../../components/ActiveCoupon/ActiveCoupon';

import styles from './CouponsList.style';

const coupons = [
    { name: 'Sennheiser cx-302', status: 'Товар на экспертизе', category: 'appliancesWhite', id: 1 },
    { name: 'Iphone', status: 'Осталось 7 дней', category: 'appliancesWhite', id: 2 }
];

const CouponsList = () => {
    const history = useHistory();
    const [search, setSearch] = useState('');

    const handleRedirectToSettings = () => {
        history.push('/settings');
    };

    const handleRedirectToInfoPurchase = () => {
        history.push('/category');
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
                {coupons.length === 0 ? (
                    <View style={styles.containerCoupons}>
                        <SVG svg="notFoundCoupons" height="70%" width="50%" />
                        <Text style={styles.notFoundText}>Пока здесь ничего нет. Нужно добавить талонов.</Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.header}>Активная гарантия</Text>
                        {coupons.map(({ name, status, category, id }) => (
                            <ActiveCoupon key={id} name={name} status={status} category={category} />
                        ))}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default CouponsList;
