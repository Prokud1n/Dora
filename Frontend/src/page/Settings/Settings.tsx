import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import SVG from '../../components/SVG/SVG';
import InputPassword from '../../components/InputPassword/InputPassword';
import CustomButton from '../../components/CustomButton/CustomButton';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import ValidError from '../../components/ValidError/ValidError';
import REQUEST from '../../constants/REQUEST';
import Loader from '../../components/Loader/Loader';

import styles from './Settings.style';
import { authSelectors } from '../../ducks/auth';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';
import AuthUtils from '../../utils/AuthUtils';
import * as AuthService from '../../services/AuthService';
import { ERROR_LENGTH_PASSWORD, HAS_NUMBER_PASSWORD } from '../../constants/errorDescription';
import { notificationActions } from '../../ducks/notifications';

const Settings = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const email = useSelector(authSelectors.email);
    const userId = useSelector(authSelectors.userId);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [validMessage, setValidMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    const getValidPassword = () => {
        const isValidLenght = newPassword.length > 7;
        const hasNumber = /\d/.test(newPassword);
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
        getValidPassword();
    };

    const handleRedirectToAuthorization = () => {
        AuthService.logout().then(() => {
            history.push('/authorization');
            dispatch({ type: 'LOGOUT' });
        });
    };

    const handleChangePassword = () => {
        const isValid = getValidPassword();

        if (isValid) {
            setRequestStatus(REQUEST.LOADING);
            AuthService.changePassword({ userId, oldPassword, newPassword })
                .then(async (response) => {
                    const { token } = response;

                    await AuthUtils.setAuthMetadata({ token });

                    setRequestStatus(REQUEST.STILL);
                    setOldPassword('');
                    setNewPassword('');
                    dispatch(notificationActions.addNotifications('Пароль успешно изменен!'));
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
                    <View style={styles.containerHeader}>
                        <BackStepButton />
                        <Text style={styles.textSettings}>Настройки</Text>
                    </View>
                    <View style={styles.containerEmail}>
                        <SVG svg="Mail" height="30" width="10%" />
                        <Text style={styles.email}>{email}</Text>
                    </View>
                    <View style={styles.containerInput}>
                        <InputPassword
                            password={oldPassword}
                            onChangeText={setOldPassword}
                            placeholder="Старый пароль"
                        />
                        <InputPassword
                            password={newPassword}
                            onChangeText={setNewPassword}
                            onEndEditing={handleEndEditing}
                            placeholder="Новый пароль"
                        />
                    </View>
                    {!isValidPassword && <ValidError>{validMessage}</ValidError>}
                    {requestStatus === REQUEST.ERROR && <ValidError>Не удалось сменить пароль</ValidError>}
                    <CustomButton
                        title="Сменить пароль"
                        width={228}
                        disabled={oldPassword.length === 0 || newPassword.length === 0}
                        marginTop={30}
                        color="#8C8C8C"
                        onPress={handleChangePassword}
                    />
                    <CustomButton
                        title="Выйти из аккаунта"
                        width={228}
                        marginTop={16}
                        disabled={false}
                        color="#FF3826"
                        onPress={handleRedirectToAuthorization}
                    />
                    <View style={styles.containerSocialNetworks}>
                        <View style={styles.socialNetworkItem}>
                            <SVG svg="VK" height="70%" width="70%" />
                        </View>
                        <View style={[styles.socialNetworkItem, styles.marginLeft]}>
                            <SVG svg="Telegram" height="70%" width="70%" />
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Возникли вопросы?</Text>
                        <Text style={styles.footerText}>Свяжитесь с нами - поможем</Text>
                    </View>
                    <HeaderTitle title="" subtitle="Dora - приложение для помощи с гарантийнми талонами" />
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
};

export default Settings;
