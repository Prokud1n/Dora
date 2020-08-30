import React, { useState } from 'react';
import { ActivityIndicator, AsyncStorage, SafeAreaView, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import InputPassword from '../../../components/InputPassword/InputPassword';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import { RootState } from '../../../store/reducers/rootReducer';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import REQUEST from '../../../constants/REQUEST';

import styles from './CreateAccountPassword.style';

const CreateAccountPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const email = useSelector((state: RootState) => state.authorization.email);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [password, setPassword] = useState('');

    const handleRegistration = async () => {
        setRequestStatus(REQUEST.LOADING);

        try {
            const response = await AuthorizationActions.sendCodeToEmail(email, password);
            const payload = {
                auth: {
                    id: response.data.data.id,
                    varified: response.data.data.verified
                }
            };

            await AsyncStorage.setItem('token', response.data.data.token);
            setRequestStatus(REQUEST.STILL);
            dispatch({ type: 'SEND_EMAIL_CODE_SUCCESS', payload });
            history.push('/activate-account');
        } catch {
            setRequestStatus(REQUEST.ERROR);
        }
    };

    if (requestStatus === REQUEST.LOADING) {
        return <ActivityIndicator />;
    }

    if (requestStatus === REQUEST.ERROR) {
        return <ErrorMessage errorMessage="Не удалось зарегистрироваться" />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton />
                <HeaderTitle
                    title="Впишите пароль"
                    subtitle="В пароле нужно не меньше 8 символов и хотя бы одна цифра.  Так надежнее"
                />
                <View style={styles.containerInput}>
                    <InputPassword password={password} onChangeText={setPassword} />
                </View>
                <CustomButton
                    width={228}
                    onPress={handleRegistration}
                    disabled={password.length === 0}
                    title="Зарегистрироваться"
                />
            </View>
        </SafeAreaView>
    );
};

export default CreateAccountPassword;
