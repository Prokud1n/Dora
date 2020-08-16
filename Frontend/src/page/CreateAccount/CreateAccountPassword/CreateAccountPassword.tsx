import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';

import styles from './CreateAccountPassword.style';

const CreateAccountPassword = () => {
    const [email, setEmail] = useState('');

    const handleRegistration = () => {};

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <View style={styles.containerButton}>
                    <Button title="Назад" />
                </View>
                <HeaderTitle
                    title="Впишите пароль"
                    subtitle="В пароле нужно не меньше 8 символов и хотя бы одна цифра.  Так надежнее"
                />
                <View style={styles.containerInput}>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Пароль" />
                </View>
                <View style={styles.containerRegistrationButton}>
                    <Text style={styles.registrationButton} onPress={handleRegistration}>
                        Зарегистрироваться
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CreateAccountPassword;
