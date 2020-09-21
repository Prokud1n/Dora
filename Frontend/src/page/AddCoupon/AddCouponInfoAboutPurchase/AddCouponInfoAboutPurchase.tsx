import { SafeAreaView, TextInput, View, Text, Platform, Button } from 'react-native';
import React, { useMemo, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useHistory } from 'react-router-native';
import CustomButton from '../../../components/CustomButton/CustomButton';
import DatePurchase from '../../../components/DatePurchase/DatePurchase';
import getFormatDate from '../../../utils/getFormatDate';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';

import styles from './AddCouponInfoAboutPurchase.style';

const AddCouponInfoAboutPurchase = () => {
    const history = useHistory();
    const [couponName, setCouponName] = useState('');
    const [shop, setShop] = useState('');
    const [days, setDays] = useState('100');
    const [date, setDate] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dimension, setDimension] = useState('месяцев');

    const disabledNextButton =
        couponName.length === 0 && shop.length === 0 && days.length === 0 && date === null && dimension.length === 0;

    const handleRedirectToPhoto = () => {
        history.push('/photo');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const hideDatePicker = () => {
        setShow(false);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const getDateTitle = () => {
        if (date === null) {
            return 'Дата покупки';
        }
        return getFormatDate(date);
    };

    const dateTitle = useMemo(() => getDateTitle(), [date]);

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <HeaderAddCoupon />
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
                <View style={styles.term}>
                    <DatePurchase onPress={showDatepicker} title={dateTitle} />
                    <View style={styles.quaranteePeriod}>
                        <TextInput
                            style={[styles.dimension, styles.colorInputDays, days.length !== 0 && styles.inputDays]}
                            value={days}
                            onChangeText={setDays}
                            placeholder={`Кол-во ${dimension}`}
                        />
                        <RNPickerSelect
                            style={{
                                inputIOSContainer: styles.dimension
                            }}
                            value={dimension}
                            onValueChange={setDimension}
                            items={[
                                { label: 'дней', value: 'дней' },
                                { label: 'месяцев', value: 'месяцев' },
                                { label: 'лет', value: 'лет' }
                            ]}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <CustomButton title="Далее" onPress={handleRedirectToPhoto} disabled={disabledNextButton} />
                </View>
                {show && (
                    <>
                        <View style={styles.containerHidePicker}>
                            <Button title="Done" onPress={hideDatePicker} />
                        </View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date || new Date()}
                            mode={mode}
                            is24Hour
                            display="default"
                            onChange={onChange}
                        />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default AddCouponInfoAboutPurchase;
