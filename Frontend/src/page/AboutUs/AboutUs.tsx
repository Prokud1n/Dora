import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch } from 'react-redux';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import CustomButton from '../../components/CustomButton/CustomButton';
import * as AuthService from '../../services/AuthService';

import styles from './AboutUs.style';

const AboutUs = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleRedirectToCreateAccount = () => {
        history.push('/create-account');
    };

    useEffect(() => {
        AuthService.checkToken()
            .then((response) => {
                const { verified, id, email } = response;
                const payload = {
                    auth: {
                        id,
                        verified,
                        email
                    }
                };

                dispatch({ type: 'SIGN_IN_SUCCESS', payload });
                history.push('/coupons');
            })
            .catch(() => {
                history.push('/');
            });
    }, []);

    return (
        <View style={styles.containerPage}>
            <HeaderTitle
                title="Ничего не потеряйте"
                subtitle="Приложение позволит сохранять свои гарантийные талоны и всегда иметь к ним полный доступ"
            />
            <CustomButton title="Далее" onPress={handleRedirectToCreateAccount} disabled={false} />
        </View>
    );
};

export default AboutUs;
