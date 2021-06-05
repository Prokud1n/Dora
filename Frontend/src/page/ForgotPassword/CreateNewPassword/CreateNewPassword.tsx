import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View } from 'react-native';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import InputPassword from '../../../components/InputPassword/InputPassword';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ValidError from '../../../components/ValidError/ValidError';
import Loader from '../../../components/Loader/Loader';
import REQUEST from '../../../constants/REQUEST';
import * as AuthService from '../../../services/AuthService';

import styles from './CreateNewPassword.style';
import { authSelectors } from '../../../ducks/auth';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import { ERROR_LENGTH_PASSWORD, HAS_NUMBER_PASSWORD } from '../../../constants/errorDescription';
import { notificationActions } from '../../../ducks/notifications';

const CreateNewPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const email = useSelector(authSelectors.email);
    const code = useSelector(authSelectors.code);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [validMessage, setValidMessage] = useState('');

    const checkEqualPasswords = () => {
        if (password.length !== 0 && confirmPassword.length !== 0) {
            setIsPasswordsEqual(password === confirmPassword);
        }
    };

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

    const handleEndEditing = () => {
        checkEqualPasswords();
        getValidPassword();
    };

    const handleRegistration = async () => {
        const isValidPassword = getValidPassword();
        const isEqualPasswords = confirmPassword === password;

        if (isValidPassword && isEqualPasswords) {
            setRequestStatus(REQUEST.LOADING);

            try {
                await AuthService.resetPassword(code, email, password);
                setRequestStatus(REQUEST.STILL);
                history.push('/authorization');
                dispatch(notificationActions.addNotifications('Пароль успешно изменен'));
            } catch (err) {
                console.log(err?.response?.data);
                setRequestStatus(REQUEST.ERROR);
            }
        }

        if (!isEqualPasswords) {
            setIsPasswordsEqual(false);
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
                        title="Впишите новый пароль"
                        subtitle="В пароле нужно не меньше 8 символов и хотя бы одну цифру. Так надежнее"
                    />
                    <View style={styles.containerInput}>
                        <InputPassword
                            password={password}
                            onChangeText={setPassword}
                            onEndEditing={handleEndEditing}
                            placeholder="Новый пароль"
                        />
                        <InputPassword
                            password={confirmPassword}
                            onChangeText={setConfirmPassword}
                            onEndEditing={handleEndEditing}
                            placeholder="Подтвердите новый пароль"
                        />
                    </View>
                    {!isValidPassword && <ValidError>{validMessage}</ValidError>}
                    {!isPasswordsEqual && <ValidError>Пароли не совпадают</ValidError>}
                    <CustomButton
                        width={228}
                        onPress={handleRegistration}
                        disabled={password.length === 0 || confirmPassword.length === 0}
                        title="Создать новый пароль"
                    />
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
};

export default CreateNewPassword;
