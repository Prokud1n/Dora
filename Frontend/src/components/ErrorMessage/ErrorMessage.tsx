import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ErrorIndicator from '../ErrorBoundary/ErrorIndicator/ErrorIndicator';
import BackStepButton from '../BackStepButton/BackStepButton';

import styles from '../../page/ForgetAccount/ForgetPasswordInputEmail/ForgetPasswordInputEmail.style';

type Props = {
    errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: Props) => {
    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <BackStepButton />
                <ErrorIndicator message={errorMessage} />
            </View>
        </SafeAreaView>
    );
};

export default ErrorMessage;
