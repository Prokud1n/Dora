import { SafeAreaView, TextInput, View, Text } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useHistory } from 'react-router-native';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import CustomButton from '../../../components/CustomButton/CustomButton';

import styles from './AddCouponInfoAboutPurchase.style';

const AddCouponInfoAboutPurchase = () => {
    const history = useHistory();
    const [couponName, setCouponName] = useState('');
    const [shop, setShop] = useState('');
    const [type, setType] = useState('Покупка');
    const [days, setDays] = useState('100');
    const [dimension, setDimension] = useState('Месяцев');
    const handleRedirectToCategory = () => {
        history.push('./category');
    };

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <View style={styles.containerHeader}>
                    <BackStepButton />
                    <Text style={styles.text}>Новый талон</Text>
                </View>
                <Text style={styles.label}>Добавьте данные о покупке</Text>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        value={couponName}
                        onChangeText={setCouponName}
                        placeholder="Название товара"
                    />
                    <TextInput style={styles.input} value={shop} onChangeText={setShop} placeholder="Магазин покупки" />
                </View>
                <Text style={styles.label}>Срок гарантии</Text>
                <View style={styles.quaranteePeriod}>
                    <RNPickerSelect
                        style={{
                            inputIOSContainer: styles.dimension
                        }}
                        value={type}
                        onValueChange={setType}
                        items={[{ label: 'Покупка', value: 'Покупка' }]}
                    />
                    <RNPickerSelect
                        style={{
                            inputIOSContainer: styles.dimension
                        }}
                        value={days}
                        onValueChange={setDays}
                        items={[{ label: '100', value: '100' }]}
                    />
                    <RNPickerSelect
                        style={{
                            inputIOSContainer: styles.dimension
                        }}
                        value={dimension}
                        onValueChange={setDimension}
                        items={[
                            { label: 'Дней', value: 'Дней' },
                            { label: 'Месяцев', value: 'Месяцев' },
                            { label: 'Лет', value: 'Лет' }
                        ]}
                    />
                </View>
                <CustomButton title="Далее" onPress={handleRedirectToCategory} disabled />
            </View>
        </SafeAreaView>
    );
};

export default AddCouponInfoAboutPurchase;
