import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { useHistory } from 'react-router-native';
import * as MediaLibrary from 'expo-media-library';
import Camera from '../../Camera/Camera';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';
import TouchableSVG from '../../../components/TouchableSVG/TouchableSVG';
import CheckMarkPhoto from '../../../components/CheckMarkPhoto/CheckMarkPhoto';

import styles from './AddCouponPhoto.style';
import CustomButton from '../../../components/CustomButton/CustomButton';

const AddCouponPhoto = () => {
    const history = useHistory();
    const [photosGallery, setPhotosGallery] = useState([]);
    const [checkedPhoto, setCheckedPhoto] = useState([]);

    useEffect(() => {
        (async () => {
            const media = await MediaLibrary.getAssetsAsync({
                first: 9,
                mediaType: ['photo']
            });

            setPhotosGallery(media.assets);
        })();
    }, []);

    const handleCheckPhoto = (photoUri) => {
        const newCheckedPhoto = [...checkedPhoto];

        if (newCheckedPhoto.includes(photoUri)) {
            setCheckedPhoto(newCheckedPhoto.filter((uri) => uri !== photoUri));
        } else {
            newCheckedPhoto.push(photoUri);
            setCheckedPhoto(newCheckedPhoto);
        }
    };

    const handleRedirectToCamera = () => {
        history.push('/camera');
    };

    const handleRedirectToCouponsList = () => {
        history.push('/coupons');
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
                    {photosGallery.map((p) => (
                        <View key={p.creationTime}>
                            <View style={styles.containerCheckMark}>
                                <CheckMarkPhoto
                                    width="60%"
                                    height="60%"
                                    checked={checkedPhoto.includes(p.uri)}
                                    onPress={handleCheckPhoto}
                                    uri={p.uri}
                                />
                            </View>
                            <Image style={styles.photo} source={{ uri: p.uri }} />
                        </View>
                    ))}
                </View>
                <View style={styles.footer}>
                    <CustomButton
                        title="Далее"
                        onPress={handleRedirectToCouponsList}
                        disabled={checkedPhoto.length === 0}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddCouponPhoto;
