import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import styles from './Authorization.style';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';

const Authorization = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuthorization = () => {};

    const handleRedirectToCreateAccount = () => {
        history.push('/create-account');
    };

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
