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

import styles from './Settings.style';

const Settings = () => {
    const history = useHistory();

    const email = useSelector((state: RootState) => state.authorization.email);
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

    const handleRedirectToAuthorization = () => {
        history.push('/authorization');
    };

    const handleChangePassword = () => {
        checkEqualPasswords();
        getValidPassword();
    };

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
                    <InputPassword password={password} onChangeText={setPassword} placeholder="Старый пароль" />
                    <InputPassword
                        password={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onEndEditing={handleEndEditing}
                        placeholder="Новый пароль"
                    />
                </View>
                {!isValidPassword && <ValidError>{validMessage}</ValidError>}
                {!isPasswordsEqual && <ValidError>Пароли не совпадают</ValidError>}
                <CustomButton
                    title="Сменить пароль"
                    width={228}
                    disabled={password.length === 0 || confirmPassword.length === 0}
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