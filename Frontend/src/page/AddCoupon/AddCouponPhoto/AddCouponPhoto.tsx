import React, { useCallback, useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import Camera from '../../Camera/Camera';
import HeaderAddCoupon from '../../../components/HeaderAddCoupon/HeaderAddCoupon';
import TouchableSVG from '../../../components/TouchableSVG/TouchableSVG';
import CustomButton from '../../../components/CustomButton/CustomButton';
import REQUEST from '../../../constants/REQUEST';
import PhotoGallery from '../../../components/PhotoGallery/PhotoGallery';
import AddCouponActions from '../../../store/actions/addCouponActions';
import { selectors as selectorsAuthorization } from '../../../store/reducers/authorizationReducer';
import { selectors as selectorsAddCoupon } from '../../../store/reducers/addCouponReducer';

import styles from './AddCouponPhoto.style';
import Loader from '../../../components/Loader/Loader';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';

const AddCouponPhoto = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const initialCheckedPhone = useSelector(selectorsAddCoupon.checkedPhoto);
    const photosGallery = useSelector(selectorsAddCoupon.photosGallery);
    const infoPurchase = useSelector(selectorsAddCoupon.infoPurchase);
    const infoCategory = useSelector(selectorsAddCoupon.infoCategory);
    const userId = useSelector(selectorsAuthorization.userId);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [captures, setCaptures] = useState(photosGallery);
    const [checkedPhoto, setCheckedPhoto] = useState(initialCheckedPhone);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [isOpenCamera, setIsOpenCamera] = useState(false);
    const { couponName, shopName, dateOfPurchase, warrantyPeriod, typeWarrantyPeriod } = infoPurchase;

    useEffect(() => {
        setCaptures(photosGallery);
    }, [photosGallery]);

    const getPermission = () => {
        (async () => {
            const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const camera = await Permissions.askAsync(Permissions.CAMERA);
            const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            const hasCameraPermission = camera.status === 'granted' && audio.status === 'granted';

            setHasCameraPermission(hasCameraPermission);

            if (cameraRoll.status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    };

    const getPhoto = () => {
        (async () => {
            setRequestStatus(REQUEST.LOADING);

            try {
                const media = await MediaLibrary.getAssetsAsync({
                    first: 50,
                    mediaType: ['photo']
                });

                dispatch(AddCouponActions.savePhotosGallery(media.assets));
                setRequestStatus(REQUEST.STILL);
            } catch {
                setRequestStatus(REQUEST.ERROR);
            }
        })();
    };

    useEffect(() => {
        getPermission();

        if (captures.length === 0) {
            getPhoto();
        }
        return () => {
            dispatch(AddCouponActions.updateCheckedPhoto(checkedPhoto));
        };
    }, []);

    const handleCheckPhoto = useCallback(
        (photoUri) => {
            const newCheckedPhoto = { ...checkedPhoto };

            newCheckedPhoto[photoUri] = !newCheckedPhoto[photoUri];

            setCheckedPhoto(newCheckedPhoto);
        },
        [checkedPhoto]
    );

    const handleOpenCamera = () => {
        setIsOpenCamera(true);
    };

    const handleCloseCamera = () => {
        setIsOpenCamera(false);
    };

    const getPhotoFiles = () => {
        const uris = Object.keys(checkedPhoto);

        return uris.map((uri) => {
            const photo = captures.find((photo) => photo.uri === uri);
            const type = photo.filename.split('.')[1];

            return {
                name: photo.filename,
                type: `image/${type.toLowerCase()}`,
                uri
            };
        });
    };

    const handleAddCoupon = async () => {
        setRequestStatus(REQUEST.LOADING);
        const photoFiles = getPhotoFiles();

        const createFormData = ({
            userId,
            couponName,
            shopName,
            dateOfPurchase,
            warrantyPeriod,
            typeWarrantyPeriod,
            photoFiles
        }) => {
            const data = new FormData();

            photoFiles.forEach(({ name, type, uri }) => {
                data.append('files', {
                    name,
                    type,
                    uri
                });
            });

            data.append('user_id', userId);
            data.append('name', couponName);
            data.append('shop_name', shopName);
            data.append('date_of_purchase', dateOfPurchase);
            data.append('warranty_period', warrantyPeriod);
            data.append('type_warranty_period', typeWarrantyPeriod);
            data.append('category_id', infoCategory.category_id);

            return data;
        };

        const coupon = createFormData({
            userId,
            couponName,
            shopName,
            dateOfPurchase,
            warrantyPeriod,
            typeWarrantyPeriod,
            photoFiles
        });

        AddCouponActions.addNewCoupon(coupon)
            .then((_) => {
                setRequestStatus(REQUEST.STILL);
                dispatch(AddCouponActions.cleanStore());
                history.push('/coupons');
            })
            .catch((err) => {
                console.log(err?.response?.data);
                alert('Попробуйте ещё раз!');
                setRequestStatus(REQUEST.STILL);
            });
    };

    if (isOpenCamera) {
        return (
            <View>
                <View style={styles.buttons}>
                    <BackStepButton onPress={handleCloseCamera} />
                    <Button title="Добавить" onPress={handleAddCoupon} disabled={checkedPhoto.length === 0} />
                </View>
                <Camera
                    hasCameraPermission={hasCameraPermission}
                    onPress={handleCheckPhoto}
                    onSaveCaptures={setCaptures}
                    checkedPhoto={checkedPhoto}
                />
            </View>
        );
    }

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <HeaderAddCoupon />
                <Text style={styles.label}>Добавьте фото документов</Text>
                <View>
                    <Camera
                        width="100%"
                        height={100}
                        withToolbar={false}
                        hasCameraPermission={hasCameraPermission}
                        onPress={handleCheckPhoto}
                        checkedPhoto={checkedPhoto}
                    />
                </View>
                <View style={styles.containerCameraSVG}>
                    <TouchableSVG svg="photo" width="100%" height="100%" onPress={handleOpenCamera} />
                </View>
                <ScrollView contentContainerStyle={styles.containerPhoto}>
                    <PhotoGallery
                        photosGallery={captures}
                        onPress={handleCheckPhoto}
                        checkedPhoto={checkedPhoto}
                        requestStatus={requestStatus}
                    />
                </ScrollView>
                <View style={styles.footer}>
                    <CustomButton title="Добавить" onPress={handleAddCoupon} disabled={checkedPhoto.length === 0} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddCouponPhoto;
