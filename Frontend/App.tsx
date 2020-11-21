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
import AboutUs from './src/page/AboutUs/AboutUs';
import CreateAccountWithSocialNetwork from './src/page/CreateAccountWithSocialNetwork/CreateAccountWithSocialNetwork';
import Settings from './src/page/Settings/Settings';
import AddCouponInfoAboutPurchase from './src/page/AddCoupon/AddCouponInfoAboutPurchase/AddCouponInfoAboutPurchase';
import AddCouponPhoto from './src/page/AddCoupon/AddCouponPhoto/AddCouponPhoto';
import Camera from './src/page/Camera/Camera';
import AddCouponCategory from './src/page/AddCoupon/AddCouponCategory/AddCouponCategory';
import ViewPhoto from './src/page/ViewPhoto/ViewPhoto';

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});

// const _XHR = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
//
// XMLHttpRequest = _XHR;

// NativeModules.DevSettings.setIsDebuggingRemotely(true);
//
// global.XMLHttpRequest = global.originalXMLHttpRequest
//     ? global.originalXMLHttpRequest
//     : global.XMLHttpRequest;
// global.FormData = global.originalFormData
//     ? global.originalFormData
//     : global.FormData;
//
// fetch; // Ensure to get the lazy property
//
// if (window.__FETCH_SUPPORT__) {
//     // it's RNDebugger only to have
//     window.__FETCH_SUPPORT__.blob = false;
// } else {
//     /*
//      * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
//      * If you're using another way you can just use the native Blob and remove the `else` statement
//      */
//     global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
//     global.FileReader = global.originalFileReader
//         ? global.originalFileReader
//         : global.FileReader;
// }

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
// global.FormData = global.originalFormData || global.FormData;
//
// if (window.FETCH_SUPPORT) {
//     window.FETCH_SUPPORT.blob = false;
// } else {
//     global.FileReader = global.originalFileReader || global.FileReader;
//     GLOBAL.Blob = null;
// }

export default function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <NativeRouter>
                    <View style={styles.container}>
                        <Route exact path="/" component={AboutUs} />
                        <Route exact path="/create-account" component={CreateAccountWithSocialNetwork} />
                        <Route exact path="/authorization" component={Authorization} />
                        <Route path="/create-account-email" component={CreateAccountEmail} />
                        <Route path="/create-account-password" component={CreateAccountPassword} />
                        <Route path="/activate-account" component={ActivateAccount} />
                        <Route path="/coupons" component={CouponsList} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/forget-password-email" component={ForgotPasswordInputEmail} />
                        <Route path="/forget-password-code" component={ForgotPasswordInputCode} />
                        <Route path="/create-new-password" component={CreateNewPassword} />
                        <Route path="/category" component={AddCouponCategory} />
                        <Route path="/info-purchase" component={AddCouponInfoAboutPurchase} />
                        <Route path="/photo" component={AddCouponPhoto} />
                        <Route path="/camera" component={Camera} />
                        <Route path="/viewPhoto" component={ViewPhoto} />
                    </View>
                </NativeRouter>
            </Provider>
        </ErrorBoundary>
    );
}
