import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, View, Text, ScrollView } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import TouchableSVG from '../../components/TouchableSVG/TouchableSVG';
import AddCouponActions from '../../store/actions/addCouponActions';
import { selectors as selectorsAuthorization } from '../../store/reducers/authorizationReducer';
import { selectors as selectorsCoupon } from '../../store/reducers/addCouponReducer';
import Loader from '../../components/Loader/Loader';
import REQUEST from '../../constants/REQUEST';
import NotFoundCoupons from '../../components/NotFoundCoupons/NotFoundCoupons';
import CouponsList from '../../components/CouponsList/CouponsList';

import styles from './CouponsPage.style';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';

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
        const isNotFoundCoupon = coupons.non_archived.length === 0 && coupons.archived.length === 0;

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
            <ScrollView>
                {coupons.non_archived.length ? (
                    <>
                        <Text style={styles.header}>Активная гарантия</Text>
                        <CouponsList
                            coupons={search ? filterCoupons.non_archived : coupons.non_archived}
                            userId={userId}
                        />
                    </>
                ) : null}
                {coupons.archived.length ? (
                    <>
                        <Text style={styles.header}>Архив талонов</Text>
                        <CouponsList
                            coupons={search ? filterCoupons.archived : coupons.archived}
                            userId={userId}
                            isArchived
                        />
                    </>
                ) : null}
            </ScrollView>
        );
    };

    return (
        <DismissKeyboard>
            <SafeAreaView>
                <View style={styles.containerPage}>
                    <View style={styles.containerHeader}>
                        <TouchableSVG svg="settings" height="100%" width="100%" onPress={handleRedirectToSettings} />
                        <TextInput
                            style={styles.input}
                            value={search}
                            onChangeText={handleSearch}
                            placeholder="Поиск по талонам"
                        />
                        <TouchableSVG
                            svg="addCoupon"
                            height="100%"
                            width="100%"
                            onPress={handleRedirectToInfoPurchase}
                        />
                    </View>
                    {renderCouponList()}
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
};

export default CouponsPage;
