import { SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ValidError from '../../../components/ValidError/ValidError';
import Loader from '../../../components/Loader/Loader';
import REQUEST from '../../../constants/REQUEST';
import * as AuthService from '../../../services/AuthService';

import styles from './ActivateAccount.style';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import { selectors } from '../../../store/reducers/authorizationReducer';
import { notificationActions } from '../../../ducks/notifications';

const ActivateAccount = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(notificationActions.addNotifications('Регистрация прошла успешно!'));
    }, []);

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });

    const userId = useSelector(selectors.userId);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    const handleSendCodeToEmail = () => {
        setRequestStatus(REQUEST.LOADING);
        AuthService.sendCodeToEmailForActivateAccount(userId)
            .then(() => setRequestStatus(REQUEST.STILL))
            .catch(() => setRequestStatus(REQUEST.ERROR));
    };

    const handleActivateAccount = () => {
        setRequestStatus(REQUEST.LOADING);
        AuthService.activateAccount(userId, value)
            .then(() => {
                setRequestStatus(REQUEST.STILL);
                history.push('/coupons');
                notificationActions.addNotifications('Аккаунт успешно активирован", вход в новый аккаунт');
            })
            .catch((err) => {
                console.log(err?.response?.data);
                setRequestStatus(REQUEST.ERROR);
            });
    };

    const handleBackStep = () => {
        history.push('/authorization');
    };

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton onPress={handleBackStep} />
                <HeaderTitle title="Введите код для активации аккаунта" subtitle="Мы выслали его вам на почту" />
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={4}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                {requestStatus === REQUEST.ERROR && <ValidError>Неверный код, повторите попытку</ValidError>}
                <CustomButton
                    width={228}
                    onPress={handleSendCodeToEmail}
                    disabled={false}
                    title="Отправить код повторно"
                />
                <CustomButton
                    width={228}
                    marginTop={20}
                    onPress={handleActivateAccount}
                    disabled={value.length !== 4}
                    title="Активировать аккаунт"
                />
            </View>
        </SafeAreaView>
    );
};

export default ActivateAccount;
