import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, View, Text, ScrollView } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import SVG from '../../components/SVG/SVG';
import TouchableSVG from '../../components/TouchableSVG/TouchableSVG';
import ActiveCoupon from '../../components/ActiveCoupon/ActiveCoupon';

import styles from './CouponsList.style';
import AddCouponActions from '../../store/actions/addCouponActions';
import { selectors } from '../../store/reducers/authorizationReducer';

const coupons = [
    { name: 'Sennheiser cx-302', status: 'Товар на экспертизе', category: 'appliancesWhite', id: 1, shop: 'DNS shop' },
    { name: 'Iphone', status: 'Осталось 7 дней', category: 'appliancesWhite', id: 2, shop: 'DNS shop' }
];

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
                {coupons.length === 0 ? (
                    <View style={styles.containerCoupons}>
                        <SVG svg="notFoundCoupons" height="70%" width="50%" />
                        <Text style={styles.notFoundText}>Пока здесь ничего нет. Нужно добавить талонов.</Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.header}>Активная гарантия</Text>
                        <ScrollView>
                            {coupons.map(({ name, status, category, id, shop }) => (
                                <SwipeRow rightOpenValue={-130} key={id}>
                                    <View style={styles.containerSVG}>
                                        <TouchableSVG svg="delete" height="100%" width="100%" />
                                        <TouchableSVG svg="edit" height="100%" width="100%" />
                                    </View>
                                    <ActiveCoupon name={name} status={status} category={category} shop={shop} />
                                </SwipeRow>
                            ))}
                        </ScrollView>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default CouponsList;
