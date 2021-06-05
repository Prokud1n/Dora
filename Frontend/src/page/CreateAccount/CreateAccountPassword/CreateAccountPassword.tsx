import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import InputPassword from '../../../components/InputPassword/InputPassword';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import Loader from '../../../components/Loader/Loader';
import CustomButton from '../../../components/CustomButton/CustomButton';
import REQUEST from '../../../constants/REQUEST';
import * as AuthService from '../../../services/AuthService';

import styles from './CreateAccountPassword.style';
import ValidError from '../../../components/ValidError/ValidError';
import ErrorIndicator from '../../../components/ErrorBoundary/ErrorIndicator/ErrorIndicator';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import AuthUtils from '../../../utils/AuthUtils';
import { ERROR_LENGTH_PASSWORD, HAS_NUMBER_PASSWORD } from '../../../constants/errorDescription';
import { authSelectors, authActions } from '../../../ducks/auth';

const CreateAccountPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const email = useSelector(authSelectors.email);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [validMessage, setValidMessage] = useState('');

    const getValidPassword = () => {
        const isValidLenght = password.length > 7;
        const hasNumber = /\d/.test(password);
        const isValidPassword = isValidLenght && hasNumber;

        if (!hasNumber) {
            setValidMessage(HAS_NUMBER_PASSWORD);
        }

        if (!isValidLenght) {
            setValidMessage(ERROR_LENGTH_PASSWORD);
        }

        setIsValidPassword(isValidPassword);

        return isValidPassword;
    };

    const handleRegistration = async () => {
        const isValidPassword = getValidPassword();

        if (isValidPassword) {
            setRequestStatus(REQUEST.LOADING);

            try {
                const response = await AuthService.registration(email, password);
                const { id, verified, token } = response;
                const payload = {
                    auth: {
                        id,
                        verified,
                        email
                    }
                };

                await AuthUtils.setAuthMetadata({ token, userId: id, email });

                setRequestStatus(REQUEST.STILL);
                dispatch(authActions.sendCodeSuccess(payload));
                history.push('/activate-account');
            } catch (err) {
                dispatch(authActions.sendCodeError());
                console.log(err?.response?.data);
                setRequestStatus(REQUEST.ERROR);
            }
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
                    <HeaderTitle
                        title="Впишите пароль"
                        subtitle="В пароле нужно не меньше 8 символов и хотя бы одну цифру. Так надежнее"
                    />
                    <View style={styles.containerInput}>
                        <InputPassword password={password} onChangeText={setPassword} onEndEditing={getValidPassword} />
                    </View>
                    {!isValidPassword && <ValidError>{validMessage}</ValidError>}
                    {requestStatus === REQUEST.ERROR && <ErrorIndicator message="Не удалось зарегистрироваться" />}
                    <CustomButton
                        width={228}
                        onPress={handleRegistration}
                        disabled={password.length === 0}
                        title="Зарегистрироваться"
                    />
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
};

export default CreateAccountPassword;
