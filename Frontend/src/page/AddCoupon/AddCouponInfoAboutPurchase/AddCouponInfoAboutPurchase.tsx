import { SafeAreaView, TextInput, View, Text, Platform, Button, Keyboard } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../components/CustomButton/CustomButton';
import DatePurchase from '../../../components/DatePurchase/DatePurchase';
import getFormatDate from '../../../utils/getFormatDate';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';

import styles from './AddCouponInfoAboutPurchase.style';
import AddCouponActions from '../../../store/actions/addCouponActions';
import { selectors } from '../../../store/reducers/addCouponReducer';

const TYPE_WARRANTY_PERIOD = {
    M: 'месяцев',
    Y: 'лет',
    D: 'дней'
};

const AddCouponInfoAboutPurchase = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const infoPurchase = useSelector(selectors.infoPurchase);
    const infoCategory = useSelector(selectors.infoCategory);
    const [couponName, setCouponName] = useState(infoPurchase.couponName);
    const [shop, setShop] = useState(infoPurchase.shopName);
    const [warrantyPeriod, setWarrantyPeriod] = useState(String(infoCategory?.warranty_period));
    const [date, setDate] = useState(infoPurchase.dateOfPurchase);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [typeWarrantyPeriod, setTypeWarrantyPeriod] = useState(
        TYPE_WARRANTY_PERIOD[infoCategory?.type_warranty_period]
    );

    useEffect(() => {
        setWarrantyPeriod(String(infoCategory?.warranty_period));
        setTypeWarrantyPeriod(TYPE_WARRANTY_PERIOD[infoCategory?.type_warranty_period]);
    }, [infoCategory]);

    const disabledNextButton =
        couponName.length === 0 ||
        shop.length === 0 ||
        warrantyPeriod.length === 0 ||
        date === null ||
        typeWarrantyPeriod.length === 0;

    const handleRedirectToPhoto = () => {
        const typePeriod = Object.keys(TYPE_WARRANTY_PERIOD).find(
            (key) => TYPE_WARRANTY_PERIOD[key] === typeWarrantyPeriod
        );

        dispatch(
            AddCouponActions.saveInfoAboutPurchase({
                couponName,
                shopName: shop,
                dateOfPurchase: date,
                typeWarrantyPeriod: typePeriod,
                warrantyPeriod
            })
        );
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
        Keyboard.dismiss();
        showMode('date');
    };

    const dateTitle = useMemo(() => getFormatDate(date), [date]);

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
                            style={[
                                styles.dimension,
                                styles.colorInputDays,
                                warrantyPeriod.length !== 0 && styles.inputDays
                            ]}
                            value={warrantyPeriod}
                            onChangeText={setWarrantyPeriod}
                            placeholder={`Кол-во ${typeWarrantyPeriod}`}
                        />
                        <RNPickerSelect
                            style={{
                                inputIOSContainer: styles.dimension
                            }}
                            value={typeWarrantyPeriod}
                            onValueChange={setTypeWarrantyPeriod}
                            items={[
                                { label: 'дней', value: TYPE_WARRANTY_PERIOD.D },
                                { label: 'месяцев', value: TYPE_WARRANTY_PERIOD.M },
                                { label: 'лет', value: TYPE_WARRANTY_PERIOD.Y }
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
                            value={date || Date.now()}
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
