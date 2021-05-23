import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Router from './Router/Router';
import styles from './Root.style';
import { notificationActions, selectors } from '../ducks/notifications';
import useAppError from '../hooks/useAppError';
import errorDescription from '../constants/errorDescription';

const Root = () => {
    const dispatch = useDispatch();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const notifications = useSelector(selectors.notifications);

    const { err, clearError } = useAppError();

    useEffect(() => {
        if (err) {
            dispatch(notificationActions.addNotifications(errorDescription[err.message]));
        }
    }, [err]);

    useEffect(() => {
        if (notifications) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false
            }).start();
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: false
                }).start();
            }, 3000);

            setTimeout(() => {
                dispatch(notificationActions.removeNotifications());
            }, 10000);
        }
    }, [notifications]);

    return (
        <>
            <Animated.View
                style={[
                    styles.fadingContainer,
                    err ? styles.error : styles.notification,
                    {
                        opacity: fadeAnim, // Bind opacity to animated value
                        transform: [
                            {
                                translateY: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-40, 55] // 0 : 150, 0.5 : 75, 1 : 0
                                })
                            }
                        ]
                    }
                ]}>
                <Text style={styles.fadingText}>{notifications}</Text>
            </Animated.View>
            <Router />
        </>
    );
};

export default Root;
