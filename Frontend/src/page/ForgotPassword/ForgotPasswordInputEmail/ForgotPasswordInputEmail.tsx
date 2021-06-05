import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch } from 'react-redux';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import ValidError from '../../../components/ValidError/ValidError';
import Loader from '../../../components/Loader/Loader';
import CustomButton from '../../../components/CustomButton/CustomButton';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import InputEmail from '../../../components/InputEmail/InputEmail';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import regexpEmail from '../../../constants/regexpEmail';
import REQUEST from '../../../constants/REQUEST';
import * as AuthService from '../../../services/AuthService';

import styles from './ForgotPasswordInputEmail.style';
import { authActions } from '../../../ducks/auth';

const ForgotPasswordInputEmail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    const getValidateEmail = () => {
        const isValid = regexpEmail.test(email);

        setIsValidEmail(isValid);

        return isValid;
    };

    const handleChangeEmail = (value) => {
        setEmail(value.trim());
    };

    const handleRedirectToCreateAccountEmail = async () => {
        const isValidEmail = getValidateEmail();

        if (isValidEmail) {
            setRequestStatus(REQUEST.LOADING);
            AuthService.sendCodeToEmailForResetPassword(email)
                .then(() => {
                    setRequestStatus(REQUEST.STILL);
                    dispatch(authActions.saveEmail(email));
                    history.push('/forget-password-code');
                })
                .catch((err) => {
                    console.log(err?.response?.data);
                    setRequestStatus(REQUEST.ERROR);
                });
        }
    };

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    return (
        <DismissKeyboard>
            <SafeAreaView>
                <View style={styles.containerPage}>
                    <BackStepButton />
                    <HeaderTitle title="Впишите почту" subtitle="Мы вышлем вам код сиюминутно, не переживайте" />
                    <View style={styles.containerInput}>
                        <InputEmail email={email} onChangeText={handleChangeEmail} />
                    </View>
                    {!isValidEmail && <ValidError>Это точно почта?</ValidError>}
                    <CustomButton
                        width={228}
                        title="Получить код"
                        disabled={email.length === 0}
                        onPress={handleRedirectToCreateAccountEmail}
                    />
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
};

export default ForgotPasswordInputEmail;
