import React, { Component, ReactNode } from 'react';
import ErrorIndicator from './ErrorIndicator/ErrorIndicator';

type State = {
    error?: Error;
};

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
    state: State = {};

    componentDidCatch(error: Error) {
        this.setState({ error });
    }

    render() {
        const { error } = this.state;

        return error ? <ErrorIndicator message={error.toString()} /> : this.props.children;
    }
}
