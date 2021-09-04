import { SafeAreaView, TextInput, View, Text, Button, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../components/CustomButton/CustomButton';
import DatePurchase from '../../../components/DatePurchase/DatePurchase';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';

import styles from './AddCouponInfoAboutPurchase.style';
import AddCouponActions from '../../../store/actions/addCouponActions';
import { selectors } from '../../../store/reducers/addCouponReducer';
import getWordShape from '../../../utils/getWordShape';
import DatePicker from '../../../components/DatePicker/DatePicker';
import { getCurrentDate, getDateForPicker, getDateWithDot, getDateWithSplit } from '../../../utils/getFormatDate';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import { couponActions } from '../../../ducks/coupon';

const MONTH_SHAPE = {
    first: 'месяц',
    second: 'месяца',
    third: 'месяцев'
};

const DAY_SHAPE = {
    first: 'день',
    second: 'дня',
    third: 'дней'
};

const YEAR_SHAPE = {
    first: 'год',
    second: 'года',
    third: 'лет'
};

const { currentYear, currentMonth, currentDay } = getCurrentDate();
const AddCouponInfoAboutPurchase = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const infoPurchase = useSelector(selectors.infoPurchase);
    const infoCategory = useSelector(selectors.infoCategory);
    const [couponName, setCouponName] = useState(infoPurchase.couponName);
    const [shop, setShop] = useState(infoPurchase.shopName);
    const [warrantyPeriod, setWarrantyPeriod] = useState(String(infoCategory?.warranty_period));
    const [date, setDate] = useState(
        infoPurchase.dateOfPurchase ? getDateForPicker(infoPurchase.dateOfPurchase) : null
    );
    const monthWordShape = getWordShape(
        Number(warrantyPeriod),
        MONTH_SHAPE.first,
        MONTH_SHAPE.second,
        MONTH_SHAPE.third
    );

    const dayWordShape = getWordShape(Number(warrantyPeriod), DAY_SHAPE.first, DAY_SHAPE.second, DAY_SHAPE.third);
    const yearWordShape = getWordShape(Number(warrantyPeriod), YEAR_SHAPE.first, YEAR_SHAPE.second, YEAR_SHAPE.third);
    const TYPE_WARRANTY_PERIOD = {
        M: monthWordShape,
        Y: yearWordShape,
        D: dayWordShape
    };

    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
    const [isOpenPicker, setIsOpenPicker] = useState(false);
    const [typeWarrantyPeriod, setTypeWarrantyPeriod] = useState(
        TYPE_WARRANTY_PERIOD[infoCategory?.type_warranty_period]
    );

    const valuesRef = useRef({ typeWarrantyPeriod, couponName, shop, date, warrantyPeriod });

    useEffect(() => {
        if (Object.values(MONTH_SHAPE).includes(typeWarrantyPeriod)) {
            setTypeWarrantyPeriod(monthWordShape);
        }
        if (Object.values(DAY_SHAPE).includes(typeWarrantyPeriod)) {
            setTypeWarrantyPeriod(dayWordShape);
        }
        if (Object.values(YEAR_SHAPE).includes(typeWarrantyPeriod)) {
            setTypeWarrantyPeriod(yearWordShape);
        }
    }, [warrantyPeriod, monthWordShape, dayWordShape, yearWordShape]);

    useEffect(() => {
        setWarrantyPeriod(String(infoCategory?.warranty_period));
        setTypeWarrantyPeriod(TYPE_WARRANTY_PERIOD[infoCategory?.type_warranty_period]);
    }, [infoCategory]);

    useEffect(() => {
        valuesRef.current = { typeWarrantyPeriod, couponName, shop, date, warrantyPeriod };
    }, [typeWarrantyPeriod, couponName, shop, date, warrantyPeriod]);

    useEffect(() => {
        return () => {
            const { typeWarrantyPeriod, couponName, shop, date, warrantyPeriod } = valuesRef.current;
            const typePeriod = Object.keys(TYPE_WARRANTY_PERIOD).find(
                (key) => TYPE_WARRANTY_PERIOD[key] === typeWarrantyPeriod
            );

            dispatch(
                couponActions.saveInfoAboutPurchase({
                    couponName,
                    shopName: shop,
                    dateOfPurchase: date ? getDateWithSplit(date) : null,
                    typeWarrantyPeriod: typePeriod,
                    warrantyPeriod
                })
            );
        };
    }, []);

    const disabledNextButton =
        couponName.length === 0 ||
        shop.length === 0 ||
        warrantyPeriod.length === 0 ||
        date === null ||
        typeWarrantyPeriod.length === 0;

    const handleRedirectToPhoto = () => {
        history.push('/photo');
    };

    const handleChangeDate = (value, id) => {
        setDate({ ...date, [id]: value });
    };

    const hideDatePicker = () => {
        setIsOpenDatePicker(false);
    };

    const handleShowDatePicker = () => {
        Keyboard.dismiss();
        setIsOpenPicker(false);
        setIsOpenDatePicker(true);
        if (date === null) {
            setDate({
                day: currentDay,
                month: currentMonth,
                year: currentYear
            });
        }
    };

    const handleShowPicker = () => {
        Keyboard.dismiss();
        setIsOpenDatePicker(false);
        setIsOpenPicker(true);
    };

    const hidePicker = () => {
        setIsOpenPicker(false);
    };

    const handleDismissPickers = () => {
        setIsOpenDatePicker(false);
        setIsOpenPicker(false);
    };

    const dateTitle = useMemo(() => (date ? getDateWithDot(date) : 'Выберите дату покупки'), [date]);

    return (
        <DismissKeyboard>
            <SafeAreaView>
                <View style={styles.containerPage}>
                    <TouchableOpacity onPress={handleDismissPickers} activeOpacity={1}>
                        <HeaderAddCoupon />
                        <Text style={styles.label}>Добавьте данные о покупке</Text>
                        <View style={styles.containerInput}>
                            <TextInput
                                style={styles.input}
                                value={couponName}
                                onChangeText={setCouponName}
                                placeholder="Название товара"
                            />
                            <TextInput
                                style={styles.input}
                                value={shop}
                                onChangeText={setShop}
                                placeholder="Магазин покупки"
                            />
                        </View>
                        <Text style={styles.label}>Срок гарантии</Text>
                        <View style={styles.term}>
                            <DatePurchase onPress={handleShowDatePicker} title={dateTitle} />
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
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity onPress={handleShowPicker} style={styles.typePeriod}>
                                    <View style={styles.typePeriod}>
                                        <Text>{typeWarrantyPeriod}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {!isOpenPicker && !isOpenDatePicker && (
                        <View style={styles.footer}>
                            <CustomButton title="Далее" onPress={handleRedirectToPhoto} disabled={disabledNextButton} />
                        </View>
                    )}
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
                    {isOpenDatePicker && (
                        <>
                            <View style={styles.containerHidePicker}>
                                <Button title="Done" onPress={hideDatePicker} />
                            </View>
                            <DatePicker onChange={handleChangeDate} value={date} />
                        </>
                    )}
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
};

export default AddCouponInfoAboutPurchase;
