import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CategoryIcon from '../../../components/CategoryIcon/CategoryIcon';

import styles from './AddCouponCategory.style';
import AddCouponActions from '../../../store/actions/addCouponActions';
import { selectors } from '../../../store/reducers/addCouponReducer';

export const DICTIONARY_CATEGORIES = [
    { categoryId: 1, icon: 'householdProducts' },
    { categoryId: 2, icon: 'appliances' },
    { categoryId: 3, icon: 'goodsForAuto' },
    { categoryId: 4, icon: 'clothesAndShoes' },
    { categoryId: 5, icon: 'otherGoods' }
];

const AddCouponCategory = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const categories = useSelector(selectors.categories);
    const infoCategory = useSelector(selectors.infoCategory);
    const initialIconActiveCategory = DICTIONARY_CATEGORIES.find(
        ({ categoryId }) => categoryId === infoCategory.category_id
    )?.icon;
    const [iconActiveCategory, setActiveCategory] = useState(initialIconActiveCategory || '');

    useEffect(() => {
        if (!categories.length) {
            dispatch(AddCouponActions.fetchCategory());
        }
    }, []);

    useEffect(() => {
        return () => {
            const activeCategoryId = DICTIONARY_CATEGORIES.find(({ icon }) => icon === iconActiveCategory)?.categoryId;
            const infoCategory = categories.find(({ category_id }) => category_id === activeCategoryId);

            if (infoCategory) {
                dispatch(AddCouponActions.saveInfoAboutCategory(infoCategory));
            }
        };
    }, [categories, iconActiveCategory]);

    const handleRedirectToInfoPurchase = () => {
        history.push('/info-purchase');
    };

    const handlePressCategory = (icon) => {
        setActiveCategory(icon);
    };

    const getIcon = (icon) => {
        if (iconActiveCategory === icon) {
            return `${icon}Active`;
        }

        return icon;
    };

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <HeaderAddCoupon />
                <Text style={styles.label}>Выберите категорию покупки</Text>
                <View style={styles.groupCategory}>
                    <CategoryIcon
                        icon={getIcon('householdProducts')}
                        title="Товары"
                        subTitle="для дома"
                        onPress={handlePressCategory}
                    />
                    <CategoryIcon
                        icon={getIcon('appliances')}
                        title="Бытовая"
                        subTitle="техника"
                        onPress={handlePressCategory}
                    />
                    <CategoryIcon
                        icon={getIcon('goodsForAuto')}
                        title="Товары"
                        subTitle="для авто"
                        onPress={handlePressCategory}
                    />
                </View>
                <View style={styles.groupCategory}>
                    <CategoryIcon
                        icon={getIcon('clothesAndShoes')}
                        title="Одежда"
                        subTitle="и обувь"
                        onPress={handlePressCategory}
                    />
                    <CategoryIcon
                        icon={getIcon('otherGoods')}
                        title="Другие"
                        subTitle="товары"
                        onPress={handlePressCategory}
                    />
                </View>
                <View style={styles.footer}>
                    <CustomButton
                        title="Далее"
                        onPress={handleRedirectToInfoPurchase}
                        disabled={iconActiveCategory.length === 0}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddCouponCategory;
