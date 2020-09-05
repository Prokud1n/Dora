import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useSelector } from 'react-redux';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ValidError from '../../../components/ValidError/ValidError';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import { RootState } from '../../../store/reducers/rootReducer';
import REQUEST from '../../../constants/REQUEST';

import styles from './ActivateAccount.style';

const ActivateAccount = () => {
    const history = useHistory();

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });

    const userId = useSelector((state: RootState) => state.authorization.auth.id);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    const handleSendCodeToEmail = () => {
        setRequestStatus(REQUEST.LOADING);
        AuthorizationActions.sendCodeToEmailForActivateAccount(userId)
            .then(() => setRequestStatus(REQUEST.STILL))
            .catch(() => setRequestStatus(REQUEST.ERROR));
    };

    const handleActivateAccount = () => {
        setRequestStatus(REQUEST.LOADING);
        AuthorizationActions.activateAccount(userId, value)
            .then(() => {
                setRequestStatus(REQUEST.STILL);
                history.push('/coupons');
            })
            .catch(() => {
                setRequestStatus(REQUEST.ERROR);
            });
    };

    if (requestStatus === REQUEST.LOADING) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
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
                {requestStatus === REQUEST.ERROR && <ValidError>Неверный код</ValidError>}
                <CustomButton
                    width={228}
                    onPress={handleSendCodeToEmail}
                    disabled={value.length !== 4}
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
