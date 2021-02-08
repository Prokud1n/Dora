import { Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ActiveCouponWarrantyCase.style';
import TouchableSVG from '../../TouchableSVG/TouchableSVG';
import AddCouponActions from '../../../store/actions/addCouponActions';

type Props = {
    userId: string;
    warrnatyId: number;
    expertise: boolean;
    money_returned: boolean;
    item_replaced: boolean;
};

const ActiveCouponWarrantyCase = ({ expertise, money_returned, item_replaced, userId, warrnatyId }: Props) => {
    const dispatch = useDispatch();
    const initialState = {
        expertise,
        money_returned,
        item_replaced
    };
    const [state, setState] = useState(initialState);
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
                dispatch(AddCouponActions.changeCoupon(userId, warrnatyId, state));
            }
        };
    }, [userId, warrnatyId, state]);
    const handleCheck = (id: 'expertise' | 'money_returned' | 'item_replaced') => {
        setState({ ...state, [id]: !state[id] });
    };

    const getIcon = (id: 'expertise' | 'money_returned' | 'item_replaced') => {
        if (state[id]) {
            return 'warrantyCaseCheckMarkActive';
        }

        return 'warrantyCaseCheckMark';
    };

    return (
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
                <TextInput style={[styles.input, { width: '90%' }]} value="Дата окончания" editable={false} />
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
    );
};

export default ActiveCouponWarrantyCase;
