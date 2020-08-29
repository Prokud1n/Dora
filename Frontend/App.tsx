import React from 'react';
import { StyleSheet, View } from 'react-native';
import CreateAccountEmail from './src/page/CreateAccount/CreateAccountEmail/CreateAccountEmail';

export default function App() {
    return (
        <View style={styles.container}>
            <CreateAccountEmail />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
