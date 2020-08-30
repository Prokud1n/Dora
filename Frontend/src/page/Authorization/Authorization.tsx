import { ActivityIndicator, Button, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDispatch } from 'react-redux';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import AuthorizationActions from '../../store/actions/authorizationActions';
import REQUEST from '../../constants/REQUEST';
import InputEmail from '../../components/InputEmail/InputEmail';
import InputPassword from '../../components/InputPassword/InputPassword';
import CustomButton from '../../components/CustomButton/CustomButton';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import regexpEmail from '../../constants/regexpEmail';

import styles from './Authorization.style';

const Authorization = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUser, setIsValidUser] = useState(true);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    const handleAuthorization = () => {
        const isValidEmail = regexpEmail.test(email);

        if (isValidEmail) {
            setRequestStatus(REQUEST.LOADING);
            AuthorizationActions.signIn(email, password)
                .then((response) => {
                    const payload = {
                        auth: {
                            id: response.data.data.id,
                            varified: response.data.data.verified
                        }
                    };

                    dispatch({ type: 'SIGN_IN_SUCCESS', payload });
                    setRequestStatus(REQUEST.STILL);
                    history.push('/coupons');
                })
                .catch(() => {
                    setIsValidUser(false);
                    setRequestStatus(REQUEST.ERROR);
                });
        } else {
            setIsValidUser(false);
        }
    };

    const handleRedirectToCreateAccount = () => {
        history.push('/create-account-email');
    };

    const handleRedirectToForgetPasswordPage = () => {
        history.push('/forget-password-email');
    };

    if (requestStatus === REQUEST.LOADING) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton />
                <HeaderTitle title="Уже с нами?" subtitle="Тогда введите почту с паролем от аккаунта и начнем работу" />
                <View style={styles.containerInput}>
                    <InputEmail email={email} onChangeText={setEmail} />
                    <InputPassword password={password} onChangeText={setPassword} />
                </View>
                {!isValidUser && <Text style={styles.errorMessage}>Проверьте правильность введенных данных</Text>}
                <View style={styles.containerActionButton}>
                    <Button title="Забыли пароль?" onPress={handleRedirectToForgetPasswordPage} />
                    <Button title="Создать аккаунт?" onPress={handleRedirectToCreateAccount} />
                </View>
                <CustomButton
                    title="Войти"
                    onPress={handleAuthorization}
                    disabled={password.length === 0 || email.length === 0}
                />
            </View>
        </SafeAreaView>
    );
};

export default Authorization;
