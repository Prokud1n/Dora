import { SafeAreaView, TextInput, View, Text, Platform, Button, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
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
import getWordShape from '../../../utils/getWordShape';

const AddCouponInfoAboutPurchase = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const infoPurchase = useSelector(selectors.infoPurchase);
    const infoCategory = useSelector(selectors.infoCategory);
    const [couponName, setCouponName] = useState(infoPurchase.couponName);
    const [shop, setShop] = useState(infoPurchase.shopName);
    const [warrantyPeriod, setWarrantyPeriod] = useState(String(infoCategory?.warranty_period));
    const monthWordShape = getWordShape(Number(warrantyPeriod), 'месяц', 'месяца', 'месяцев');
    const dayWordShape = getWordShape(Number(warrantyPeriod), 'день', 'дня', 'дней');
    const yearWordShape = getWordShape(Number(warrantyPeriod), 'год', 'года', 'лет');
    const TYPE_WARRANTY_PERIOD = {
        M: monthWordShape,
        Y: yearWordShape,
        D: dayWordShape
    };
    const [date, setDate] = useState(infoPurchase.dateOfPurchase);
    const [mode, setMode] = useState('date');
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
    const [isOpenPicker, setIsOpenPicker] = useState(false);
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

        setIsOpenDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setIsOpenDatePicker(true);
        setMode(currentMode);
    };

    const hideDatePicker = () => {
        setIsOpenDatePicker(false);
    };

    const showDatepicker = () => {
        Keyboard.dismiss();
        showMode('date');
    };

    const handleShowPicker = () => {
        Keyboard.dismiss();
        setIsOpenPicker(true);
    };

    const hidePicker = () => {
        setIsOpenPicker(false);
    };

    const dateTitle = useMemo(() => (date ? getFormatDate(date) : 'Выберите дату покупки'), [date]);

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
                        <TouchableOpacity onPress={handleShowPicker} style={styles.typePeriod}>
                            <View style={styles.typePeriod}>
                                <Text>{typeWarrantyPeriod}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {isOpenPicker && (
                        <>
                            <View style={styles.containerHidePicker}>
                                <Button title="Done" onPress={hidePicker} />
                            </View>
                            <Picker
                                selectedValue={typeWarrantyPeriod}
                                style={{ width: '100%' }}
                                onValueChange={setTypeWarrantyPeriod}>
                                <Picker.Item label={dayWordShape} value={TYPE_WARRANTY_PERIOD.D} />
                                <Picker.Item label={monthWordShape} value={TYPE_WARRANTY_PERIOD.M} />
                                <Picker.Item label={yearWordShape} value={TYPE_WARRANTY_PERIOD.Y} />
                            </Picker>
                        </>
                    )}
                </View>
                <View style={styles.footer}>
                    <CustomButton title="Далее" onPress={handleRedirectToPhoto} disabled={disabledNextButton} />
                </View>
                {isOpenDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date || new Date()}
                        mode={mode}
                        is24Hour
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default AddCouponInfoAboutPurchase;
