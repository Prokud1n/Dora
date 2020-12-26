import React from 'react';
import { Camera } from 'expo-camera';
import { View, Text } from 'react-native';
import Toolbar from './Toolbar';
import styles from './Camera.style';
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery';
import REQUEST from '../../constants/REQUEST';

type Props = {
    width?: string | number;
    height?: string | number;
    withToolbar?: boolean;
    hasCameraPermission: boolean;
    onPress: (photoUri: string) => void;
    onSaveCaptures: (captures: (v: any) => any[]) => void;
    checkedPhoto: any;
};

export default class CameraPage extends React.Component<Props> {
    camera = null;

    state = {
        captures: [],
        capturing: null,
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
        const photo = await this.camera.takePictureAsync();
        const uri = photo.uri.split('/');
        const filename = uri[uri.length - 1];
        const captures = { ...photo, filename };

        this.setState({ capturing: false, captures: [captures, ...this.state.captures] });
        this.props.onSaveCaptures((prevState) => {
            return [...prevState, captures];
        });
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();

        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    render() {
        const { flashMode, cameraType, capturing, captures } = this.state;
        const { width, height, withToolbar = true, hasCameraPermission, onPress, checkedPhoto } = this.props;

        if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={[styles.preview, width && { width }, height && { height }]}
                        ref={(camera) => (this.camera = camera)}
                    />
                </View>
                {captures.length > 0 && (
                    <View style={styles.containerPhoto}>
                        <PhotoGallery
                            photosGallery={captures}
                            onPress={onPress}
                            checkedPhoto={checkedPhoto}
                            requestStatus={REQUEST.STILL}
                        />
                    </View>
                )}
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
            </>
        );
    }
}
