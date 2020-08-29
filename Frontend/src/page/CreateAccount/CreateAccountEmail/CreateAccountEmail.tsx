import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import regexpEmail from '../../../constants/regexpEmail';
import CustomButton from '../../../components/CustomButton/CustomButton';

import styles from './CreateAccountEmail.style';

const CreateAccountEmail = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleValidateEmail = () => {
        if (regexpEmail.test(email)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    const handleRedirectToAuthorization = () => {
        history.goBack();
    };

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <View style={styles.containerButton}>
                    <Button title="Назад" onPress={handleRedirectToAuthorization} />
                </View>
                <HeaderTitle title="Впишите почту" subtitle="Мы вышлем вам пароль сиюминутно, не переживайте" />
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        onEndEditing={handleValidateEmail}
                        placeholder="Электропочта"
                    />
                </View>
                {!isValidEmail && <Text style={styles.errorMessage}>Это точно почта?</Text>}
                <CustomButton title="Далее" disabled={email.length === 0} />
            </View>
        </SafeAreaView>
    );
};

export default CreateAccountEmail;
