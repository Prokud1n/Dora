import { ActivityIndicator, Button, SafeAreaView, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import { RootState } from '../../../store/reducers/rootReducer';

import styles from './ActivateAccount.style';
import REQUEST from '../../../constants/REQUEST';
import ErrorIndicator from '../../../components/ErrorBoundary/ErrorIndicator/ErrorIndicator';

const ActivateAccount = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const userId = useSelector((state: RootState) => state.authorization.auth.id);
    const requestStatus = useSelector((state: RootState) => state.authorization.requestStatus);

    const handleActivateAccount = () => {
        dispatch(AuthorizationActions.activateAccount(userId, code));
        history.push('/coupons');
    };

    const handleRedirectBack = () => {
        history.goBack();
    };

    if (requestStatus === REQUEST.LOADING) {
        return <ActivityIndicator />;
    }

    if (requestStatus === REQUEST.ERROR) {
        return (
            <SafeAreaView>
                <View style={styles.containerPage}>
                    <View style={styles.containerButton}>
                        <Button title="Назад" onPress={handleRedirectBack} />
                    </View>
                    <ErrorIndicator message="Не верный код" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <HeaderTitle title="Активируйте аккаунт" subtitle="Мы выслали вам код на почту" />
                <View style={styles.containerInput}>
                    <TextInput style={styles.input} value={code} onChangeText={setCode} placeholder="Введите код" />
                </View>
                <CustomButton
                    width={228}
                    onPress={handleActivateAccount}
                    disabled={code.length === 0}
                    title="Активировать"
                />
            </View>
        </SafeAreaView>
    );
};

export default ActivateAccount;
