import * as React from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
    state = {
        image: null
    };

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
        } catch (E) {
            console.log(E);
        }
    };

    render() {
        const { image } = this.state;

        return (
            <View>
                <Button title="Pick an image from camera roll" onPress={this._pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }
}
