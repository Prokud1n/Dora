import React from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import { View } from 'react-native';
import getWordShape from '../../utils/getWordShape';
import TouchableSVG from '../TouchableSVG/TouchableSVG';
import ActiveCoupon from '../ActiveCoupon/ActiveCoupon';
import { Coupon } from '../../store/reducers/addCouponReducer';

import styles from './CouponsList.style';

type Props = {
    coupons: Coupon[];
};

const CouponsList = ({ coupons }: Props) => {
    return coupons.map(({ name, category_id, id, shop_name, days_end_warranty, files }) => {
        // const categoryIcon = DICTIONARY_CATEGORIES.find(
        //     ({ categoryId }) => categoryId === category_id
        // )?.icon;
        const status = `Осталось ${days_end_warranty} ${getWordShape(days_end_warranty, 'день', 'дня', 'дней')}`;

        return (
            <SwipeRow rightOpenValue={-130} key={id}>
                <View style={styles.containerSVG}>
                    <TouchableSVG svg="delete" height="100%" width="100%" />
                    <TouchableSVG svg="edit" height="100%" width="100%" />
                </View>
                <ActiveCoupon name={name} status={status} category="appliancesWhite" shop={shop_name} files={files} />
            </SwipeRow>
        );
    });
};

export default CouponsList;
