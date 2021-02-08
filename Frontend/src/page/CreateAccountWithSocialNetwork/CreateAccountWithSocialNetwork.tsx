import { View, Button } from 'react-native';
import React from 'react';
import { useHistory } from 'react-router-native';
import SocialNetwork from '../../components/SocialNetwork/SocialNetwork';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';

import styles from './CreateAccountWithSocialNetwork.style';

const CreateAccountWithSocialNetwork = () => {
    const history = useHistory();
    const handleRedirectToAuthorization = () => {
        history.push('/authorization');
    };

    return (
        <View style={styles.containerPage}>
            <View style={styles.containerButton}>
                <Button title="Пропустить" />
            </View>
            <HeaderTitle title="Создайте аккаунт" subtitle="Чтобы данные сохранялись в облаке нужен аккаунт" />
            <View style={styles.containerSocialNetworks}>
                <SocialNetwork text="Войти через FB" icon="FB" />
                <SocialNetwork text="Войти через Google" icon="Google" />
                <SocialNetwork text="Войти через VK" icon="VK" />
                <SocialNetwork text="Войти через почту" icon="Mail" onPress={handleRedirectToAuthorization} />
            </View>
            <HeaderTitle title="" subtitle="Создавая аккаунт вы соглашаетесь с условиями лицензионного соглашения" />
        </View>
    );
};

export default CreateAccountWithSocialNetwork;
