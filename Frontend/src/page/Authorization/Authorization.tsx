import { ActivityIndicator, Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Authorization.style';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import AuthorizationActions from '../../store/actions/authorizationActions';
import { RootState } from '../../store/reducers/rootReducer';
import REQUEST from '../../constants/REQUEST';

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
                <View style={styles.containerButton}>
                    <Button title="Назад" />
                </View>
                <HeaderTitle title="Уже с нами?" subtitle="Тогда введите почту с паролем от аккаунта и начнем работу" />
                <View style={styles.containerInput}>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Электропочта" />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Пароль"
                        secureTextEntry
                    />
                </View>
                {!isValidUser && <Text style={styles.errorMessage}>Проверьте правильность введенных данных</Text>}
                <View style={styles.containerActionButton}>
                    <Button title="Забыли пароль?" />
                    <Button title="Создать аккаунт?" onPress={handleRedirectToCreateAccount} />
                </View>
                <View style={styles.containerLoginButton}>
                    <Text style={styles.loginButton} onPress={handleAuthorization}>
                        Войти
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Authorization;
