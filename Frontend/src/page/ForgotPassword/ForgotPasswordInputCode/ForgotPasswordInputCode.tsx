import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { ActivityIndicator, SafeAreaView, View, Text } from 'react-native';
import { RootState } from '../../../store/reducers/rootReducer';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import REQUEST from '../../../constants/REQUEST';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import CustomButton from '../../../components/CustomButton/CustomButton';

import styles from './ForgotPasswordInputCode.style';

const ForgotPasswordInputCode = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });

    const userId = useSelector((state: RootState) => state.authorization.auth.id);
    const requestStatus = useSelector((state: RootState) => state.authorization.requestStatus);

    const handleActivateAccount = () => {
        dispatch(AuthorizationActions.activateAccount(userId, value));
    };

    if (requestStatus === REQUEST.LOADING) {
        return <ActivityIndicator />;
    }

    if (requestStatus === REQUEST.ERROR) {
        return <ErrorMessage errorMessage="Не верный код" />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
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
                <CustomButton
                    width={228}
                    onPress={handleActivateAccount}
                    disabled={value.length !== 4}
                    title="Сбросить пароль"
                />
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordInputCode;
