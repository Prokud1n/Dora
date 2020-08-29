import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import CreateAccountEmail from './src/page/CreateAccount/CreateAccountEmail/CreateAccountEmail';
import Authorization from './src/page/Authorization/Authorization';

export default function App() {
    return (
        <NativeRouter>
            <View style={styles.container}>
                <Route exact path="/" component={Authorization} />
                <Route exact path="/create-account" component={CreateAccountEmail} />
            </View>
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
