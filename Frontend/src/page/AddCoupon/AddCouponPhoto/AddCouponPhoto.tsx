import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import Camera from '../../Camera/Camera';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';
import TouchableSVG from '../../../components/TouchableSVG/TouchableSVG';
import CustomButton from '../../../components/CustomButton/CustomButton';
import REQUEST from '../../../constants/REQUEST';
import PhotoGallery from '../../../components/PhotoGallery/PhotoGallery';
import AddCouponActions from '../../../store/actions/addCouponActions';
import { RootState } from '../../../store/reducers/rootReducer';

import styles from './AddCouponPhoto.style';

const AddCouponPhoto = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const initialCheckedPhone = useSelector((state: RootState) => state.addCoupon.checkedPhoto);
    const photosGallery = useSelector((state: RootState) => state.addCoupon.photosGallery);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [checkedPhoto, setCheckedPhoto] = useState(initialCheckedPhone);

    const getPhoto = () => {
        (async () => {
            setRequestStatus(REQUEST.LOADING);

            try {
                const media = await MediaLibrary.getAssetsAsync({
                    first: 50,
                    mediaType: ['photo']
                });

                console.log(media);

                dispatch(AddCouponActions.savePhotosGallery(media.assets));
                setRequestStatus(REQUEST.STILL);
            } catch {
                setRequestStatus(REQUEST.ERROR);
            }
        })();
    };

    useEffect(() => {
        if (photosGallery.length === 0) {
            getPhoto();
        }

        return () => {
            dispatch(AddCouponActions.updateCheckedPhoto(checkedPhoto));
        };
    }, []);

    const handleCheckPhoto = (photoUri) => {
        const newCheckedPhoto = { ...checkedPhoto };

        if (newCheckedPhoto[photoUri]) {
            newCheckedPhoto[photoUri] = false;
        } else {
            newCheckedPhoto[photoUri] = true;
            setCheckedPhoto(newCheckedPhoto);
        }
    };

    const handleRedirectToCamera = () => {
        history.push('/camera');
    };

    const handleRedirectToCouponsList = async () => {
        const uri = Object.keys(checkedPhoto)[0];

        console.log('uri', uri);
        const photo = photosGallery.find((photo) => photo.uri === uri);

        const createFormData = (photo, body) => {
            const data = new FormData();

            console.log('createFormData', photo);

            data.append('photo', {
                name: photo.filename,
                type: photo.type,
                // uri: photo.uri.replace('assets-library://', '')
                uri: photo.uri
            });

            Object.keys(body).forEach((key) => {
                data.append(key, body[key]);
            });

            console.log(data);

            return data;
        };

        fetch('http://192.168.1.228:3000/api/upload', {
            method: 'POST',
            body: createFormData(
                {
                    uri: photo.uri,
                    type: 'image/jpeg',
                    filename: photo.filename
                },
                { userId: '123' }
            )
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('upload succes', response);
            })
            .catch((error) => {
                console.log('upload error', error);
            });

        axios
            .get('http://192.168.1.228:3000/api/photo')
            .then((r) => {
                console.log('getphotosuccess', r);
            })
            .catch((err) => {
                console.log('getPhotoError', err);
            });
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
                <ScrollView contentContainerStyle={styles.containerPhoto}>
                    <PhotoGallery
                        photosGallery={photosGallery}
                        onPress={handleCheckPhoto}
                        checkedPhoto={checkedPhoto}
                        requestStatus={requestStatus}
                    />
                </ScrollView>
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
