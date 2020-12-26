import React from 'react';
import { useHistory } from 'react-router-native';
import { Button, View } from 'react-native';

import styles from './BackStepButton.style';

type Props = {
    onPress?: () => void;
};

const BackStepButton = ({ onPress }: Props) => {
    const history = useHistory();
    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            history.goBack();
        }
    };

    return (
        <View style={styles.containerButton}>
            <Button title="Назад" onPress={handlePress} />
        </View>
    );
};

export default BackStepButton;
