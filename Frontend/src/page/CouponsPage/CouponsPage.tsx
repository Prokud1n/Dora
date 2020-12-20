import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, View, Text, ScrollView } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import TouchableSVG from '../../components/TouchableSVG/TouchableSVG';
import AddCouponActions from '../../store/actions/addCouponActions';
import { selectors as selectorsAuthorization } from '../../store/reducers/authorizationReducer';
import { selectors as selectorsCoupon } from '../../store/reducers/addCouponReducer';
import Loader from '../../components/Loader/Loader';
import REQUEST from '../../constants/REQUEST';
import NotFoundCoupons from '../../components/NotFoundCoupons/NotFoundCoupons';
import CouponsList from '../../components/CouponsList/CouponsList';

import styles from './CouponsPage.style';

const CouponsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = useSelector(selectorsAuthorization.userId);
    const coupons = useSelector(selectorsCoupon.coupons);
    const filterCoupons = useSelector(selectorsCoupon.filterCoupons);
    const requestStatusCoupons = useSelector(selectorsCoupon.requestStatusCoupons);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(AddCouponActions.fetchCoupons(userId));
    }, [userId]);

    const handleSearch = (value) => {
        setSearch(value);
        dispatch(AddCouponActions.searchCoupons(search));
    };

    const handleRedirectToSettings = () => {
        history.push('/settings');
    };

    const handleRedirectToInfoPurchase = () => {
        history.push('/category');
    };

    const renderCouponList = () => {
        const isLoading = requestStatusCoupons === REQUEST.LOADING;
        const isNotFoundCoupon = coupons.non_archived.length === 0 && coupons.archived.length;

        if (isLoading) {
            return (
                <View style={styles.loader}>
                    <Loader />
                </View>
            );
        }

        if (isNotFoundCoupon) {
            return <NotFoundCoupons />;
        }
        return (
            <>
                <Text style={styles.header}>Активная гарантия</Text>
                <ScrollView>
                    <CouponsList coupons={search ? filterCoupons.non_archived : coupons.non_archived} userId={userId} />
                </ScrollView>
            </>
        );
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
                        onChangeText={handleSearch}
                        placeholder="Поиск по талонам"
                    />
                    <TouchableSVG svg="addCoupon" height="100%" width="100%" onPress={handleRedirectToInfoPurchase} />
                </View>
                {renderCouponList()}
            </View>
        </SafeAreaView>
    );
};

export default CouponsPage;
