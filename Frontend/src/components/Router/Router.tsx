import { NativeRouter, Route } from 'react-router-native';
import { View } from 'react-native';
import React from 'react';
import AboutUs from '../../page/AboutUs/AboutUs';
import CreateAccountWithSocialNetwork from '../../page/CreateAccountWithSocialNetwork/CreateAccountWithSocialNetwork';
import Authorization from '../../page/Authorization/Authorization';
import CreateAccountEmail from '../../page/CreateAccount/CreateAccountEmail/CreateAccountEmail';
import CreateAccountPassword from '../../page/CreateAccount/CreateAccountPassword/CreateAccountPassword';
import ActivateAccount from '../../page/CreateAccount/ActivateAccount/ActivateAccount';
import CouponsPage from '../../page/CouponsPage/CouponsPage';
import Settings from '../../page/Settings/Settings';
import ForgotPasswordInputEmail from '../../page/ForgotPassword/ForgotPasswordInputEmail/ForgotPasswordInputEmail';
import ForgotPasswordInputCode from '../../page/ForgotPassword/ForgotPasswordInputCode/ForgotPasswordInputCode';
import CreateNewPassword from '../../page/ForgotPassword/CreateNewPassword/CreateNewPassword';
import AddCouponCategory from '../../page/AddCoupon/AddCouponCategory/AddCouponCategory';
import AddCouponInfoAboutPurchase from '../../page/AddCoupon/AddCouponInfoAboutPurchase/AddCouponInfoAboutPurchase';
import AddCouponPhoto from '../../page/AddCoupon/AddCouponPhoto/AddCouponPhoto';
import Camera from '../../page/Camera/Camera';
import ViewPhoto from '../../page/ViewPhoto/ViewPhoto';

import styles from './Router.style';

const Router = () => (
    <NativeRouter>
        <View style={styles.container}>
            <Route exact path="/" component={AboutUs} />
            <Route exact path="/create-account" component={CreateAccountWithSocialNetwork} />
            <Route exact path="/authorization" component={Authorization} />
            <Route path="/create-account-email" component={CreateAccountEmail} />
            <Route path="/create-account-password" component={CreateAccountPassword} />
            <Route path="/activate-account" component={ActivateAccount} />
            <Route path="/coupons" component={CouponsPage} />
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
);

export default Router;
