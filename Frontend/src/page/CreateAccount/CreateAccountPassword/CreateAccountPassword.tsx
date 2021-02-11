import React, { useState } from 'react';
import { AsyncStorage, SafeAreaView, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import InputPassword from '../../../components/InputPassword/InputPassword';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import Loader from '../../../components/Loader/Loader';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import REQUEST from '../../../constants/REQUEST';

import styles from './CreateAccountPassword.style';
import ValidError from '../../../components/ValidError/ValidError';
import { selectors } from '../../../store/reducers/authorizationReducer';
import ErrorIndicator from '../../../components/ErrorBoundary/ErrorIndicator/ErrorIndicator';

const CreateAccountPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const email = useSelector(selectors.email);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [validMessage, setValidMessage] = useState('');

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

    const handleRegistration = async () => {
        const isValidPassword = getValidPassword();

        if (isValidPassword) {
            setRequestStatus(REQUEST.LOADING);

            try {
                const response = await AuthorizationActions.registration(email, password);
                const { id, verified, token } = response.data.data;
                const payload = {
                    auth: {
                        id,
                        verified,
                        email
                    }
                };

                const userInfo = JSON.stringify({ token, userId: id, email });

                await AsyncStorage.setItem('userInfo', userInfo);

                setRequestStatus(REQUEST.STILL);
                dispatch({ type: 'SEND_EMAIL_CODE_SUCCESS', payload });
                history.push('/activate-account');
            } catch (err) {
                if (err?.response?.data?.message === 'ACCOUNT_ALREADY_EXISTS') {
                    alert('Пользователь с таким email уже существует!');
                }
                if (err?.response?.data?.message === 'FORM_NOT_VALID') {
                    alert('Форма заполнена некорректно!');
                }
                if (err?.response?.data?.message === 'WRONG_EMAIL_FORMAT') {
                    alert('Неверный формат email адреса!');
                }
                console.log(err?.response?.data);
                setRequestStatus(REQUEST.ERROR);
            }
        }
    };

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    return (
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
    );
};

export default CreateAccountPassword;
