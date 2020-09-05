import { Button, SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDispatch } from 'react-redux';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import ValidError from '../../components/ValidError/ValidError';
import InputEmail from '../../components/InputEmail/InputEmail';
import InputPassword from '../../components/InputPassword/InputPassword';
import CustomButton from '../../components/CustomButton/CustomButton';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import Loader from '../../components/Loader/Loader';
import AuthorizationActions from '../../store/actions/authorizationActions';
import REQUEST from '../../constants/REQUEST';
import regexpEmail from '../../constants/regexpEmail';

import styles from './Authorization.style';

const Authorization = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUser, setIsValidUser] = useState(true);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    const sendCodeToEmailForActivateAccount = (id) => {
        setRequestStatus(REQUEST.LOADING);
        AuthorizationActions.sendCodeToEmailForActivateAccount(id)
            .then(() => {
                setRequestStatus(REQUEST.STILL);
                history.push('/activate-account');
            })
            .catch(() => setRequestStatus(REQUEST.ERROR));
    };

    const signIn = () => {
        setRequestStatus(REQUEST.LOADING);
        AuthorizationActions.signIn(email, password)
            .then((response) => {
                const { verified, id } = response.data.data;
                const payload = {
                    auth: {
                        id,
                        verified
                    }
                };

                dispatch({ type: 'SIGN_IN_SUCCESS', payload });

                setRequestStatus(REQUEST.STILL);

                if (verified) {
                    history.push('/coupons');
                } else {
                    sendCodeToEmailForActivateAccount(id);
                }
            })
            .catch(() => {
                setIsValidUser(false);
                setRequestStatus(REQUEST.ERROR);
            });
    };

    const handleAuthorization = () => {
        const isValidEmail = regexpEmail.test(email);

        if (isValidEmail) {
            signIn();
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
        return <Loader />;
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
                {!isValidUser && <ValidError>Проверьте правильность введенных данных</ValidError>}
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
