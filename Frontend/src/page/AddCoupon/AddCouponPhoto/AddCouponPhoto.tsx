import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';
import Camera from '../../Camera/Camera';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';

import styles from './AddCouponPhoto.style';

const AddCouponPhoto = () => {
    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <HeaderAddCoupon />
                <Text style={styles.label}>Добавьте фото документов</Text>
                <Camera width="100%" height={100} />
            </View>
        </SafeAreaView>
    );
};

export default AddCouponPhoto;
