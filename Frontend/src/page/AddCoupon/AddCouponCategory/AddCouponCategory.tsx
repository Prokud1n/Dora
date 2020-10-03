import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CategoryIcon from '../../../components/CategoryIcon/CategoryIcon';

import styles from './AddCouponCategory.style';

const AddCouponCategory = () => {
    const history = useHistory();
    const [activeCategory, setActiveCategory] = useState('');

    const handleRedirectToInfoPurchase = () => {
        history.push('/info-purchase');
    };

    const handlePressCategory = (icon) => {
        setActiveCategory(icon);
    };

    const getIcon = (icon) => {
        if (activeCategory === icon) {
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
                        disabled={activeCategory.length === 0}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddCouponCategory;
