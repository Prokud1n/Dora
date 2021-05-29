import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { SafeAreaView, View, Text } from 'react-native';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import ValidError from '../../../components/ValidError/ValidError';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Loader from '../../../components/Loader/Loader';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import REQUEST from '../../../constants/REQUEST';
import * as AuthService from '../../../services/AuthService';

import styles from './ForgotPasswordInputCode.style';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import { selectors } from '../../../store/reducers/authorizationReducer';

const ForgotPasswordInputCode = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });

    const email = useSelector(selectors.email);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    const handleSendCodeToEmail = () => {
        setRequestStatus(REQUEST.LOADING);
        AuthService.sendCodeToEmailForResetPassword(email)
            .then(() => setRequestStatus(REQUEST.STILL))
            .catch(() => setRequestStatus(REQUEST.ERROR));
    };

    const handleActivateAccount = () => {
        setRequestStatus(REQUEST.LOADING);
        AuthService.checkCodeFromEmail(email, value)
            .then(() => {
                setRequestStatus(REQUEST.STILL);
                dispatch(AuthorizationActions.setCodeToStore(value));
                history.push('/create-new-password');
            })
            .catch((err) => {
                console.log(err?.response?.data);
                setRequestStatus(REQUEST.ERROR);
            });
    };

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton />
                <HeaderTitle title="Введите код для сброса пароля" subtitle="Мы выслали вам код на почту" />
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
                    title="Сбросить пароль"
                />
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordInputCode;
