import React from 'react';
import { View } from 'react-native';
import { useHistory } from 'react-router-native';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import CustomButton from '../../components/CustomButton/CustomButton';

import styles from './AboutUs.style';

const AboutUs = () => {
    const history = useHistory();
    const handleRedirectToCreateAccount = () => {
        history.push('/create-account');
    };

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
