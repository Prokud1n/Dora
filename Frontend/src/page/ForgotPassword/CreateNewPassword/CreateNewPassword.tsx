import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useSelector } from 'react-redux';
import { SafeAreaView, View } from 'react-native';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import InputPassword from '../../../components/InputPassword/InputPassword';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ValidError from '../../../components/ValidError/ValidError';
import Loader from '../../../components/Loader/Loader';
import REQUEST from '../../../constants/REQUEST';
import AuthorizationActions from '../../../store/actions/authorizationActions';

import styles from './CreateNewPassword.style';
import { selectors } from '../../../store/reducers/authorizationReducer';

const CreateNewPassword = () => {
    const history = useHistory();

    const email = useSelector(selectors.email);
    const code = useSelector(selectors.code);
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
            setValidMessage('Добавьте хотя бы одну цифру');
        }

        if (!isValidLenght) {
            setValidMessage('Пароль должен содержать не меньше 8 символов');
        }

        if (isValidPassword) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
        }

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
                await AuthorizationActions.resetPassword(code, email, password);
                setRequestStatus(REQUEST.STILL);
                history.push('/authorization');
            } catch {
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

    if (requestStatus === REQUEST.ERROR) {
        return <ErrorMessage errorMessage="Не удалось сменить пароль" />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton />
                <HeaderTitle
                    title="Впишите новый пароль"
                    subtitle="В пароле нужно не меньше 8 символов и хотя бы одна цифра.  Так надежнее"
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
    );
};

export default CreateNewPassword;
