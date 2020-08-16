import React from 'react';
import { StyleSheet, View } from 'react-native';
import CreateAccountPassword from './src/page/CreateAccount/CreateAccountPassword/CreateAccountPassword';

export default function App() {
    return (
        <View style={styles.container}>
            <CreateAccountPassword />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
