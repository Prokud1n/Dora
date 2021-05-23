import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch } from 'react-redux';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import ValidError from '../../../components/ValidError/ValidError';
import regexpEmail from '../../../constants/regexpEmail';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import InputEmail from '../../../components/InputEmail/InputEmail';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import * as AuthService from '../../../services/AuthService';

import styles from './CreateAccountEmail.style';

const CreateAccountEmail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

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
            AuthService.checkEmail(email)
                .then(() => {
                    dispatch(AuthorizationActions.setEmailToStore(email));
                    history.push('/create-account-password');
                })
                .catch((err) => {
                    console.log('checkEmail', err);
                });
        }
    };

    const handleChangeEmail = (value) => {
        setEmail(value.trim());
    };

    return (
        <DismissKeyboard>
            <SafeAreaView>
                <View style={styles.containerPage}>
                    <BackStepButton />
                    <HeaderTitle
                        title="Впишите почту"
                        subtitle="Это поможет нам связаться в случае непредвиденных обстоятельств"
                    />
                    <View style={styles.containerInput}>
                        <InputEmail email={email} onChangeText={handleChangeEmail} />
                    </View>
                    {!isValidEmail && <ValidError>Это точно почта?</ValidError>}
                    <CustomButton
                        title="Далее"
                        disabled={email.length === 0}
                        onPress={handleRedirectToCreateAccountEmail}
                    />
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
};

export default CreateAccountEmail;
