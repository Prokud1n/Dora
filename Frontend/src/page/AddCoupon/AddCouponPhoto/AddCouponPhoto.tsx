import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import Camera from '../../Camera/Camera';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';
import TouchableSVG from '../../../components/TouchableSVG/TouchableSVG';
import CustomButton from '../../../components/CustomButton/CustomButton';
import REQUEST from '../../../constants/REQUEST';
import PhotoGallery from '../../../components/PhotoGallery/PhotoGallery';

import styles from './AddCouponPhoto.style';
import AddCouponActions from '../../../store/actions/addCouponActions';
import { RootState } from '../../../store/reducers/rootReducer';

const AddCouponPhoto = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const initialCheckedPhone = useSelector((state: RootState) => state.addCoupon.checkedPhoto);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [photosGallery, setPhotosGallery] = useState([]);
    const [checkedPhoto, setCheckedPhoto] = useState(initialCheckedPhone);

    useEffect(() => {
        (async () => {
            setRequestStatus(REQUEST.LOADING);

            try {
                const media = await MediaLibrary.getAssetsAsync({
                    first: 9,
                    mediaType: ['photo']
                });

                setPhotosGallery(media.assets);
                setRequestStatus(REQUEST.STILL);
            } catch {
                setRequestStatus(REQUEST.ERROR);
            }
        })();

        return () => {
            dispatch(AddCouponActions.updateCheckedPhoto(checkedPhoto));
        };
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
                    <PhotoGallery
                        photosGallery={photosGallery}
                        onPress={handleCheckPhoto}
                        checkedPhoto={checkedPhoto}
                        requestStatus={requestStatus}
                    />
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
