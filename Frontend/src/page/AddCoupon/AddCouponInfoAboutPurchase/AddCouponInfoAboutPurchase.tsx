import { SafeAreaView, TextInput, View, Text, Platform, Button } from 'react-native';
import React, { useMemo, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useHistory } from 'react-router-native';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import CustomButton from '../../../components/CustomButton/CustomButton';

import styles from './AddCouponInfoAboutPurchase.style';
import DatePurchase from '../../../components/DatePurchase/DatePurchase';
import getFormatDate from '../../../utils/getFormatDate';

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

    const handleRedirectToCategory = () => {
        history.push('/category');
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
                <CustomButton title="Далее" onPress={handleRedirectToCategory} disabled={disabledNextButton} />
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
