import { Button, Keyboard, Modal, Text, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './CouponWarrantyCase.style';
import TouchableSVG from '../../TouchableSVG/TouchableSVG';
import AddCouponActions from '../../../store/actions/addCouponActions';
import DatePurchase from '../../DatePurchase/DatePurchase';
import DatePicker from '../../DatePicker/DatePicker';
import { getCurrentDate, getDateWithSplit } from '../../../utils/getFormatDate';
import { notificationActions } from '../../../ducks/notifications';

type Props = {
    userId: string;
    warrnatyId: number;
    expertise: boolean;
    money_returned: boolean;
    item_replaced: boolean;
    dateEndExpertise: string;
    dateOfPurchase: string;
};

const { currentYear, currentMonth, currentDay } = getCurrentDate();

const CouponWarrantyCase = ({
    expertise,
    money_returned,
    item_replaced,
    userId,
    warrnatyId,
    dateEndExpertise,
    dateOfPurchase
}: Props) => {
    const getDateForPicker = (value) => {
        if (!value) {
            return null;
        }
        const date = new Date(value);

        return {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        };
    };
    const initialDate = useMemo(() => getDateForPicker(dateEndExpertise), [dateEndExpertise]);
    const dispatch = useDispatch();
    const initialState = {
        expertise,
        money_returned,
        item_replaced
    };
    const [state, setState] = useState(initialState);
    const [date, setDate] = useState(initialDate);
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        return () => {
            if (!mounted.current) {
                dispatch(
                    AddCouponActions.changeCoupon(userId, warrnatyId, {
                        ...state,
                        dateEndExpertise: date ? getDateWithSplit(date) : null
                    })
                );
            }
        };
    }, [userId, warrnatyId, state, date]);
    const handleCheck = (id: 'expertise' | 'money_returned' | 'item_replaced') => {
        setState({ ...state, [id]: !state[id] });
    };

    const getIcon = (id: 'expertise' | 'money_returned' | 'item_replaced') => {
        if (state[id]) {
            return 'warrantyCaseCheckMarkActive';
        }

        return 'warrantyCaseCheckMark';
    };

    const dateTitle = useMemo(() => (date ? getDateWithSplit(date) : 'Дата окончания'), [date]);

    const handleShowDatePicker = () => {
        Keyboard.dismiss();

        if (state.expertise) {
            setIsOpenDatePicker(true);

            if (!dateEndExpertise) {
                setDate({
                    day: currentDay,
                    month: currentMonth,
                    year: currentYear
                });
            }
        }
    };

    const handleChangeDate = (value, id: 'year' | 'month' | 'day') => {
        setDate({ ...date, [id]: value });
    };

    const hideDatePicker = () => {
        setIsOpenDatePicker(false);
        const newDate = new Date(date.year, date.month, date.day);

        if (newDate.getTime() < new Date(dateOfPurchase).getTime()) {
            dispatch(notificationActions.addNotifications('Выберите дату позже, чем дата покупки'));
        }
    };

    return (
        <>
            <View>
                <View style={styles.containerWarrantyCaseInfo}>
                    <Text style={styles.warrantyCaseLabel}>Товар на экспертизе</Text>
                    <TouchableSVG
                        id="expertise"
                        svg={getIcon('expertise')}
                        width="80%"
                        height="100%"
                        onPress={handleCheck}
                    />
                </View>
                <View style={styles.containerWarrantyCaseInfo}>
                    <Text style={styles.warrantyCaseLabel}>До</Text>
                    <View style={{ width: '90%' }}>
                        <DatePurchase onPress={handleShowDatePicker} title={dateTitle} />
                    </View>
                </View>
                <View style={styles.containerWarrantyCaseInfo}>
                    <Text style={styles.warrantyCaseTitle}>Введите дату и мы напомним об окончании экспертизы</Text>
                </View>
                <View style={styles.containerWarrantyCaseInfo}>
                    <View>
                        <Text style={styles.warrantyCaseLabel}>Деньги возвращены</Text>
                        <Text style={styles.warrantyCaseTitle}>Талон будет отправлен в архив</Text>
                    </View>
                    <TouchableSVG
                        id="money_returned"
                        svg={getIcon('money_returned')}
                        width="80%"
                        height="100%"
                        onPress={handleCheck}
                    />
                </View>
                <View style={styles.containerWarrantyCaseInfo}>
                    <View>
                        <Text style={styles.warrantyCaseLabel}>Товар заменен</Text>
                        <Text style={styles.warrantyCaseTitle}>Талон улетит в архив,</Text>
                        <Text style={styles.warrantyCaseTitle}>а вы сможете добавить новый</Text>
                    </View>
                    <TouchableSVG
                        id="item_replaced"
                        svg={getIcon('item_replaced')}
                        width="80%"
                        height="100%"
                        onPress={handleCheck}
                    />
                </View>
            </View>
            {isOpenDatePicker && (
                <Modal animationType="slide" transparent visible={isOpenDatePicker}>
                    <View style={styles.containerDatePicker}>
                        <View style={styles.containerHidePicker}>
                            <Button title="Done" onPress={hideDatePicker} />
                        </View>
                        <DatePicker onChange={handleChangeDate} value={date} />
                    </View>
                </Modal>
            )}
        </>
    );
};

export default CouponWarrantyCase;
