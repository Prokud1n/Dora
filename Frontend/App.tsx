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
import ForgetPasswordInputEmail from './src/page/ForgetPassword/ForgetPasswordInputEmail/ForgetPasswordInputEmail';
import ForgetPasswordInputCode from './src/page/ForgetPassword/ForgetPasswordInputCode/ForgetPasswordInputCode';

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
                        <Route path="/forget-password-email" component={ForgetPasswordInputEmail} />
                        <Route path="/forget-password-code" component={ForgetPasswordInputCode} />
                    </View>
                </NativeRouter>
            </Provider>
        </ErrorBoundary>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
