import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import { useSelector } from 'react-redux';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import { RootState } from '../../store/reducers/rootReducer';
import SVG from '../../components/SVG/SVG';
import InputPassword from '../../components/InputPassword/InputPassword';
import CustomButton from '../../components/CustomButton/CustomButton';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import ValidError from '../../components/ValidError/ValidError';
import AuthorizationActions from '../../store/actions/authorizationActions';
import REQUEST from '../../constants/REQUEST';
import Loader from '../../components/Loader/Loader';

import styles from './Settings.style';

const Settings = () => {
    const history = useHistory();

    const email = useSelector((state: RootState) => state.authorization.email);
    const userId = useSelector((state: RootState) => state.authorization.auth.id);
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
        getValidPassword();
    };

    const handleRedirectToAuthorization = () => {
        history.push('/authorization');
    };

    const handleChangePassword = () => {
        const isValid = getValidPassword();

        if (isValid) {
            setRequestStatus(REQUEST.LOADING);
            AuthorizationActions.changePassword(userId, oldPassword, newPassword)
                .then(() => {
                    setRequestStatus(REQUEST.STILL);
                    setOldPassword('');
                    setNewPassword('');
                })
                .catch(() => {
                    setRequestStatus(REQUEST.ERROR);
                });
        }
    };

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    return (
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
                    <InputPassword password={oldPassword} onChangeText={setOldPassword} placeholder="Старый пароль" />
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
    );
};

export default Settings;
