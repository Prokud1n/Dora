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
import { getDateWithMonthName } from '../../utils/getFormatDate';

type Props = {
    coupons: Coupon[];
    userId: string;
    isArchived?: boolean;
};

const CouponsList = ({ coupons, userId, isArchived = false }: Props) => {
    const dispatch = useDispatch();

    return coupons.map(
        ({
            name,
            category_id,
            id,
            shop_name,
            days_end_warranty,
            date_end_warranty,
            files,
            expertise,
            item_replaced,
            money_returned,
            date_end_expertise
        }) => {
            const categoryIcon = DICTIONARY_CATEGORIES.find(({ categoryId }) => categoryId === category_id)?.icon;
            const status = isArchived
                ? `Истек ${getDateWithMonthName(new Date(date_end_warranty))}`
                : `Осталось ${days_end_warranty} ${getWordShape(days_end_warranty, 'день', 'дня', 'дней')}`;
            const isSoonEndWarranty = days_end_warranty <= 14;

            const handleDeleteCoupon = async () => {
                await dispatch(AddCouponActions.deleteCoupon(userId, id));
                await dispatch(AddCouponActions.fetchCoupons(userId));
            };

            return (
                <SwipeRow rightOpenValue={-70} key={id}>
                    <View style={styles.containerSVG}>
                        <TouchableSVG svg="delete" height="100%" width="100%" onPress={handleDeleteCoupon} />
                    </View>
                    <ActiveCoupon
                        userId={userId}
                        warrnatyId={id}
                        name={name}
                        status={status}
                        category={`${categoryIcon}White`}
                        shop={shop_name}
                        files={files}
                        expertise={expertise}
                        item_replaced={item_replaced}
                        money_returned={money_returned}
                        isArchived={isArchived}
                        isSoonEndWarranty={isSoonEndWarranty}
                        date_end_expertise={date_end_expertise}
                    />
                </SwipeRow>
            );
        }
    );
};

export default CouponsList;
