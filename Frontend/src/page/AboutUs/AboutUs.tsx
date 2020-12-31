import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDispatch } from 'react-redux';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import CustomButton from '../../components/CustomButton/CustomButton';

import styles from './AboutUs.style';
import AuthorizationActions from '../../store/actions/authorizationActions';

const AboutUs = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleRedirectToCreateAccount = () => {
        history.push('/create-account');
    };

    useEffect(() => {
        AuthorizationActions.checkToken()
            .then((response) => {
                const { verified, user_id } = response.data.data;
                const payload = {
                    auth: {
                        id: user_id,
                        verified
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
