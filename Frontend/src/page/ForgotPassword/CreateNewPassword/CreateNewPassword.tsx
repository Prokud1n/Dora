import { useHistory } from 'react-router-native';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import InputPassword from '../../../components/InputPassword/InputPassword';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ValidError from '../../../components/ValidError/ValidError';
import { RootState } from '../../../store/reducers/rootReducer';
import REQUEST from '../../../constants/REQUEST';
import AuthorizationActions from '../../../store/actions/authorizationActions';

import styles from '../../CreateAccount/CreateAccountPassword/CreateAccountPassword.style';

const CreateNewPassword = () => {
    const history = useHistory();

    const email = useSelector((state: RootState) => state.authorization.email);
    const code = useSelector((state: RootState) => state.authorization.code);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);

    const checkEqualPasswords = () => {
        if (password.length !== 0 && confirmPassword.length !== 0) {
            setIsPasswordsEqual(password === confirmPassword);
        }
    };

    const handleRegistration = async () => {
        if (confirmPassword === password) {
            setRequestStatus(REQUEST.LOADING);

            try {
                await AuthorizationActions.resetPassword(code, email, password);
                setRequestStatus(REQUEST.STILL);
                history.push('/');
            } catch {
                setRequestStatus(REQUEST.ERROR);
            }
        } else {
            setIsPasswordsEqual(false);
        }
    };

    if (requestStatus === REQUEST.LOADING) {
        return <ActivityIndicator />;
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
                        onEndEditing={checkEqualPasswords}
                        placeholder="Новый пароль"
                    />
                    <InputPassword
                        password={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onEndEditing={checkEqualPasswords}
                        placeholder="Подтвердите новый пароль"
                    />
                </View>
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
