import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import CreateAccountEmail from './src/page/CreateAccount/CreateAccountEmail/CreateAccountEmail';
import Authorization from './src/page/Authorization/Authorization';
import store from './src/store/store';
import CreateAccountPassword from './src/page/CreateAccount/CreateAccountPassword/CreateAccountPassword';
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';
import ActivateAccount from './src/page/CreateAccount/ActivateAccount/ActivateAccount';
import CouponsList from './src/page/CouponsList/CouponsList';
import ForgotPasswordInputEmail from './src/page/ForgotPassword/ForgotPasswordInputEmail/ForgotPasswordInputEmail';
import ForgotPasswordInputCode from './src/page/ForgotPassword/ForgotPasswordInputCode/ForgotPasswordInputCode';
import CreateNewPassword from './src/page/ForgotPassword/CreateNewPassword/CreateNewPassword';

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});

export default function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <NativeRouter>
                    <View style={styles.container}>
                        <Route exact path="/" component={Authorization} />
                        <Route path="/create-account-email" component={CreateAccountEmail} />
                        <Route path="/create-account-password" component={CreateAccountPassword} />
                        <Route path="/activate-account" component={ActivateAccount} />
                        <Route path="/coupons" component={CouponsList} />
                        <Route path="/forget-password-email" component={ForgotPasswordInputEmail} />
                        <Route path="/forget-password-code" component={ForgotPasswordInputCode} />
                        <Route path="/create-new-password" component={CreateNewPassword} />
                    </View>
                </NativeRouter>
            </Provider>
        </ErrorBoundary>
    );
}
