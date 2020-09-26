import React from 'react';
import { Camera } from 'expo-camera';
import { View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import Toolbar from './Toolbar';
import Gallery from './Gallery';

import styles from './Camera.style';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });

    setCameraType = (cameraType) => this.setState({ cameraType });

    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing) {
            this.camera.stopRecording();
        }
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();

        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] });
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();

        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = camera.status === 'granted' && audio.status === 'granted';

        this.setState({ hasCameraPermission });
    }

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
        const { width, height, withToolbar = true } = this.props;

        if (hasCameraPermission === null) {
            return <View />;
        }
        if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={[styles.preview, width && { width, height }]}
                        ref={(camera) => (this.camera = camera)}
                    />
                </View>
                {captures.length > 0 && <Gallery captures={captures} />}
                {withToolbar && (
                    <Toolbar
                        capturing={capturing}
                        flashMode={flashMode}
                        cameraType={cameraType}
                        setFlashMode={this.setFlashMode}
                        setCameraType={this.setCameraType}
                        onCaptureIn={this.handleCaptureIn}
                        onCaptureOut={this.handleCaptureOut}
                        onLongCapture={this.handleLongCapture}
                        onShortCapture={this.handleShortCapture}
                    />
                )}
            </React.Fragment>
        );
    }
}
