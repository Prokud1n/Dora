import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch } from 'react-redux';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import regexpEmail from '../../../constants/regexpEmail';
import CustomButton from '../../../components/CustomButton/CustomButton';

import styles from './CreateAccountEmail.style';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';

const CreateAccountEmail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const getValidateEmail = () => {
        const isValid = regexpEmail.test(email);

        if (isValid) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }

        return isValid;
    };

    const handleRedirectToAuthorization = () => {
        history.goBack();
    };

    const handleRedirectToCreateAccountEmail = async () => {
        const isValidEmail = getValidateEmail();

        if (isValidEmail) {
            dispatch(AuthorizationActions.setEmailToStore(email));
            history.push('/create-account-password');
        }
    };

    return (
        <DismissKeyboard>
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
                            placeholder="Электропочта"
                        />
                    </View>
                    {!isValidEmail && <Text style={styles.errorMessage}>Это точно почта?</Text>}
                    <CustomButton
                        title="Далее"
                        disabled={email.length === 0}
                        onPress={handleRedirectToCreateAccountEmail}
                    />
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
};

export default CreateAccountEmail;
