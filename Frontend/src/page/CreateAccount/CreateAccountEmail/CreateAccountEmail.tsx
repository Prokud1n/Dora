import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import styles from './CreateAccountEmail.style';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';

const CreateAccountEmail = () => {
    const [email, setEmail] = useState('');

    const handleNext = () => {};

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <View style={styles.containerButton}>
                    <Button title="Назад" />
                </View>
                <HeaderTitle title="Впишите почту" subtitle="Мы вышлем вам пароль сиюминутно, не переживайте" />
                <View style={styles.containerInput}>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Электропочта" />
                </View>
                <View style={styles.containerNextButton}>
                    <Text style={styles.nextButton} onPress={handleNext}>
                        Далее
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CreateAccountEmail;
