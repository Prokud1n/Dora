import React, { useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { useHistory } from 'react-router-native';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import regexpEmail from '../../../constants/regexpEmail';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import InputEmail from '../../../components/InputEmail/InputEmail';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import REQUEST from '../../../constants/REQUEST';

import styles from './ForgetPasswordInputEmail.style';

const ForgetPasswordInputEmail = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    const getValidateEmail = () => {
        const isValid = regexpEmail.test(email);

        if (isValid) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }

        return isValid;
    };

    const handleRedirectToCreateAccountEmail = async () => {
        const isValidEmail = getValidateEmail();

        if (isValidEmail) {
            setRequestStatus(REQUEST.LOADING);
            AuthorizationActions.getCodeToEmail(email)
                .then(() => {
                    setRequestStatus(REQUEST.STILL);
                    history.push('/forget-password-code');
                })
                .catch(() => {
                    setRequestStatus(REQUEST.ERROR);
                });
        }
    };

    if (requestStatus === REQUEST.LOADING) {
        return <ActivityIndicator />;
    }

    if (requestStatus === REQUEST.ERROR) {
        return <ErrorMessage errorMessage="Не удалось отправить код на почту" />;
    }

    return (
        <DismissKeyboard>
            <SafeAreaView>
                <View style={styles.containerPage}>
                    <BackStepButton />
                    <HeaderTitle title="Впишите почту" subtitle="Мы вышлем вам код сиюминутно, не переживайте" />
                    <View style={styles.containerInput}>
                        <InputEmail email={email} onChangeText={setEmail} />
                    </View>
                    {!isValidEmail && <Text style={styles.errorMessage}>Это точно почта?</Text>}
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

export default ForgetPasswordInputEmail;
