import { ActivityIndicator, Button, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Authorization.style';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import AuthorizationActions from '../../store/actions/authorizationActions';
import { RootState } from '../../store/reducers/rootReducer';
import REQUEST from '../../constants/REQUEST';
import InputEmail from '../../components/InputEmail/InputEmail';
import InputPassword from '../../components/InputPassword/InputPassword';
import CustomButton from '../../components/CustomButton/CustomButton';
import BackStepButton from '../../components/BackStepButton/BackStepButton';

const Authorization = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUser, setIsValidUser] = useState(true);
    const requestStatus = useSelector((state: RootState) => state.authorization.requestStatus);

    const handleAuthorization = () => {
        dispatch(AuthorizationActions.signIn(email, password));
        history.push('/coupons');
    };

    const handleRedirectToCreateAccount = () => {
        history.push('/create-account-email');
    };

    if (requestStatus === REQUEST.ERROR) {
        setIsValidUser(false);
    }

    if (requestStatus === REQUEST.LOADING) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton />
                <HeaderTitle title="Уже с нами?" subtitle="Тогда введите почту с паролем от аккаунта и начнем работу" />
                <View style={styles.containerInput}>
                    <InputEmail email={email} onChangeText={setEmail} />
                    <InputPassword password={password} onChangeText={setPassword} />
                </View>
                {!isValidUser && <Text style={styles.errorMessage}>Проверьте правильность введенных данных</Text>}
                <View style={styles.containerActionButton}>
                    <Button title="Забыли пароль?" onPress={handleRedirectToCreateAccount} />
                    <Button title="Создать аккаунт?" onPress={handleRedirectToCreateAccount} />
                </View>
                <CustomButton
                    title="Войти"
                    onPress={handleAuthorization}
                    disabled={password.length === 0 || email.length === 0}
                />
            </View>
        </SafeAreaView>
    );
};

export default Authorization;
