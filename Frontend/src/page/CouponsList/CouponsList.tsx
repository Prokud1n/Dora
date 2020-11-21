import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import SVG from '../../components/SVG/SVG';
import TouchableSVG from '../../components/TouchableSVG/TouchableSVG';

import styles from './CouponsList.style';
import AddCouponActions from '../../store/actions/addCouponActions';
import { selectors } from '../../store/reducers/authorizationReducer';

const CouponsList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = useSelector(selectors.userId);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(AddCouponActions.fetchCoupons(userId));
    }, []);

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
                <View style={styles.containerCoupons}>
                    <SVG svg="notFoundCoupons" height="70%" width="50%" />
                    <Text style={styles.notFoundText}>Пока здесь ничего нет. Нужно добавить талонов.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CouponsList;
