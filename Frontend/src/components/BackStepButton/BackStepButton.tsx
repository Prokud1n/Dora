import React from 'react';
import { useHistory } from 'react-router-native';
import { Button, View } from 'react-native';

import styles from '../../page/ForgetPassword/ForgetPasswordInputEmail/ForgetPasswordInputEmail.style';

const BackStepButton = () => {
    const history = useHistory();

    return (
        <View style={styles.containerButton}>
            <Button title="Назад" onPress={() => history.goBack()} />
        </View>
    );
};

export default BackStepButton;
