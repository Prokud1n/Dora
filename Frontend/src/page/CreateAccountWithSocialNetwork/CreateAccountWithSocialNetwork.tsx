import { Text, View, Button } from 'react-native';
import React from 'react';
import SocialNetwork from '../../components/SocialNetwork/SocialNetwork';

import styles from './CreateAccountWithSocialNetwork.style';

const CreateAccountWithSocialNetwork = () => {
    return (
        <View style={styles.containerPage}>
            <View style={styles.containerButton}>
                <Button title="Пропустить" />
            </View>
            <View style={styles.containerInfo}>
                <View>
                    <Text style={styles.header}>Создайте аккаунт</Text>
                    <Text style={styles.info}>Чтобы данные сохранялись  в облаке нужен аккаунт</Text>
                </View>
            </View>
            <SocialNetwork text="Войти через FB" icon="FB" />
            <SocialNetwork text="Войти через Google" icon="Google" />
            <SocialNetwork text="Войти через VK" icon="VK" />
            <SocialNetwork text="Войти через почту" icon="Mail" />
            <View style={styles.containerAgreements}>
                <Text style={styles.info}>Создавая аккаунт вы соглашаетесь с условиями лицензионного соглашения</Text>
            </View>
        </View>
    );
};

export default CreateAccountWithSocialNetwork;
