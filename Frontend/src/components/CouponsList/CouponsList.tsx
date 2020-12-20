import React from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import getWordShape from '../../utils/getWordShape';
import TouchableSVG from '../TouchableSVG/TouchableSVG';
import ActiveCoupon from '../ActiveCoupon/ActiveCoupon';
import { Coupon } from '../../store/reducers/addCouponReducer';

import styles from './CouponsList.style';
import AddCouponActions from '../../store/actions/addCouponActions';
import { DICTIONARY_CATEGORIES } from '../../page/AddCoupon/AddCouponCategory/AddCouponCategory';

type Props = {
    coupons: Coupon[];
    userId: string;
};

const CouponsList = ({ coupons, userId }: Props) => {
    const dispatch = useDispatch();

    return coupons.map(({ name, category_id, id, shop_name, days_end_warranty, files }) => {
        const categoryIcon = DICTIONARY_CATEGORIES.find(({ categoryId }) => categoryId === category_id)?.icon;
        const status = `Осталось ${days_end_warranty} ${getWordShape(days_end_warranty, 'день', 'дня', 'дней')}`;

        const handleDeleteCoupon = () => {
            dispatch(AddCouponActions.deleteCoupon(userId, id));
            dispatch(AddCouponActions.fetchCoupons(userId));
        };

        return (
            <SwipeRow rightOpenValue={-130} key={id}>
                <View style={styles.containerSVG}>
                    <TouchableSVG svg="delete" height="100%" width="100%" onPress={handleDeleteCoupon} />
                    <TouchableSVG svg="edit" height="100%" width="100%" />
                </View>
                <ActiveCoupon
                    name={name}
                    status={status}
                    category={`${categoryIcon}White`}
                    shop={shop_name}
                    files={files}
                />
            </SwipeRow>
        );
    });
};

export default CouponsList;
