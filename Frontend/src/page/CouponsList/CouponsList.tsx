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
import { selectors as selectorsAuthorization } from '../../store/reducers/authorizationReducer';
import { selectors as selectorsCoupon } from '../../store/reducers/addCouponReducer';
import Loader from '../../components/Loader/Loader';
import REQUEST from '../../constants/REQUEST';

export const pluralForm = (num: number, form1: string, form2: string, form3: string): string => {
    const n = Math.abs(num) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) {
        return form3;
    }

    if (n1 > 1 && n1 < 5) {
        return form2;
    }

    if (n1 === 1) {
        return form1;
    }

    return form3;
};

const CouponsList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = useSelector(selectorsAuthorization.userId);
    const coupons = useSelector(selectorsCoupon.coupons);
    const requestStatusCoupons = useSelector(selectorsCoupon.requestStatusCoupons);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(AddCouponActions.fetchCoupons(userId));
    }, [userId]);

    const handleRedirectToSettings = () => {
        history.push('/settings');
    };

    const handleRedirectToInfoPurchase = () => {
        history.push('/category');
    };

    if (requestStatusCoupons === REQUEST.LOADING) {
        return <Loader />;
    }

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
                {coupons.non_archived.length === 0 ? (
                    <View style={styles.containerCoupons}>
                        <SVG svg="notFoundCoupons" height="70%" width="50%" />
                        <Text style={styles.notFoundText}>Пока здесь ничего нет. Нужно добавить талонов.</Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.header}>Активная гарантия</Text>
                        <ScrollView>
                            {coupons.non_archived.map(
                                ({ name, category_id, id, shop_name, days_end_warranty, files }) => {
                                    // const categoryIcon = DICTIONARY_CATEGORIES.find(
                                    //     ({ categoryId }) => categoryId === category_id
                                    // )?.icon;
                                    const status = `Осталось ${days_end_warranty} ${pluralForm(
                                        days_end_warranty,
                                        'день',
                                        'дня',
                                        'дней'
                                    )}`;

                                    return (
                                        <SwipeRow rightOpenValue={-130} key={id}>
                                            <View style={styles.containerSVG}>
                                                <TouchableSVG svg="delete" height="100%" width="100%" />
                                                <TouchableSVG svg="edit" height="100%" width="100%" />
                                            </View>
                                            <ActiveCoupon
                                                name={name}
                                                status={status}
                                                category="appliancesWhite"
                                                shop={shop_name}
                                                files={files}
                                            />
                                        </SwipeRow>
                                    );
                                }
                            )}
                        </ScrollView>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default CouponsList;
