import { SafeAreaView, TextInput, View, Text, Button, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
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

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

const AddCouponInfoAboutPurchase = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const infoPurchase = useSelector(selectors.infoPurchase);
    const infoCategory = useSelector(selectors.infoCategory);
    const [couponName, setCouponName] = useState(infoPurchase.couponName);
    const [shop, setShop] = useState(infoPurchase.shopName);
    const [warrantyPeriod, setWarrantyPeriod] = useState(String(infoCategory?.warranty_period));
    const [date, setDate] = useState(null);
    const monthWordShape = getWordShape(
        Number(warrantyPeriod),
        MONTH_SHAPE.first,
        MONTH_SHAPE.second,
        MONTH_SHAPE.third
    );

    const getFormatDate = ({ year, month, day }) =>
        `${year}-${month < 10 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`;
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
                dateOfPurchase: dateTitle,
                typeWarrantyPeriod: typePeriod,
                warrantyPeriod
            })
        );
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
        setIsOpenDatePicker(true);
        setDate({
            day: currentDay,
            month: currentMonth,
            year: currentYear
        });
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
                    <>
                        <View style={styles.containerHidePicker}>
                            <Button title="Done" onPress={hideDatePicker} />
                        </View>
                        <DatePicker onChange={handleChangeDate} value={date} />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default AddCouponInfoAboutPurchase;
