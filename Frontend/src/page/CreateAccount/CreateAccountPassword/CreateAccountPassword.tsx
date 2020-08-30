import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import InputPassword from '../../../components/InputPassword/InputPassword';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import { RootState } from '../../../store/reducers/rootReducer';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AuthorizationActions from '../../../store/actions/authorizationActions';
import REQUEST from '../../../constants/REQUEST';

import styles from './CreateAccountPassword.style';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';

const CreateAccountPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const email = useSelector((state: RootState) => state.authorization.email);
    const requestStatus = useSelector((state: RootState) => state.authorization.requestStatus);
    const [password, setPassword] = useState('');

    const handleRegistration = () => {
        dispatch(AuthorizationActions.sendCodeToEmail(email, password));
        history.push('/activate-account');
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
