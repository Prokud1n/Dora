import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { useHistory } from 'react-router-native';
import * as MediaLibrary from 'expo-media-library';
import Camera from '../../Camera/Camera';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';
import TouchableSVG from '../../../components/TouchableSVG/TouchableSVG';

import styles from './AddCouponPhoto.style';

const AddCouponPhoto = () => {
    const history = useHistory();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        (async () => {
            const media = await MediaLibrary.getAssetsAsync({
                first: 20,
                mediaType: ['photo']
            });

            setPhotos(media.assets);
        })();
    }, []);

    const handleRedirectToCamera = () => {
        history.push('/camera');
    };

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <HeaderAddCoupon />
                <Text style={styles.label}>Добавьте фото документов</Text>
                <View style={styles.containerCamera}>
                    <Camera width="100%" height={100} withToolbar={false} />
                </View>
                <View style={styles.containerCameraSVG}>
                    <TouchableSVG svg="photo" width="100%" height="100%" onPress={handleRedirectToCamera} />
                </View>
                <View style={styles.containerPhoto}>
                    {photos.map((p) => (
                        <Image key={p.creationTime} style={styles.photo} source={{ uri: p.uri }} />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddCouponPhoto;
