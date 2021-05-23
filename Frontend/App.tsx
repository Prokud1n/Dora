import React from 'react';
import { decode, encode } from 'base-64';
import { Provider } from 'react-redux';
import store from './src/store/store';
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';
import Root from './src/components/Root';

global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
    window.FETCH_SUPPORT.blob = false;
} else {
    global.FileReader = global.originalFileReader || global.FileReader;
    GLOBAL.Blob = null;
}

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

export default function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <Root />
            </Provider>
        </ErrorBoundary>
    );
}
