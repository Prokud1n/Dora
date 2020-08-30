import React, { useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, TextInput, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';

import styles from './CreateAccountPassword.style';
import { RootState } from '../../../store/reducers/rootReducer';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import REQUEST from '../../../constants/REQUEST';
import ErrorIndicator from '../../../components/ErrorBoundary/ErrorIndicator/ErrorIndicator';

const CreateAccountPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const email = useSelector((state: RootState) => state.authorization.email);
    const requestStatus = useSelector((state: RootState) => state.authorization.requestStatus);
    const [password, setPassword] = useState('');

    const handleRedirectBack = () => {
        history.goBack();
    };

    const handleRegistration = () => {
        dispatch(AuthorizationActions.sendCodeToEmail(email, password));
        history.push('/activate-account');
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
                    <ErrorIndicator message="Не удалось зарегистрироваться" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <View style={styles.containerButton}>
                    <Button title="Назад" onPress={handleRedirectBack} />
                </View>
                <HeaderTitle
                    title="Впишите пароль"
                    subtitle="В пароле нужно не меньше 8 символов и хотя бы одна цифра.  Так надежнее"
                />
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Пароль"
                        secureTextEntry
                    />
                </View>
                <CustomButton
                    width={228}
                    onPress={handleRegistration}
                    disabled={password.length === 0}
                    title="Зарегистрироваться"
                />
            </View>
        </SafeAreaView>
    );
};

export default CreateAccountPassword;
