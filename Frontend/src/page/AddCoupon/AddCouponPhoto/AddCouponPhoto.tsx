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
import * as CouponService from '../../../services/CouponService';

import styles from './AddCouponPhoto.style';
import Loader from '../../../components/Loader/Loader';
import BackStepButton from '../../../components/BackStepButton/BackStepButton';
import { notificationActions } from '../../../ducks/notifications';

const AddCouponPhoto = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const initialCheckedPhone = useSelector(selectorsAddCoupon.checkedPhoto);
    const photosGallery = useSelector(selectorsAddCoupon.photosGallery);
    const infoPurchase = useSelector(selectorsAddCoupon.infoPurchase);
    const infoCategory = useSelector(selectorsAddCoupon.infoCategory);
    const userId = useSelector(selectorsAuthorization.userId);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [requestStatusGallery, setRequestStatusGallery] = useState(REQUEST.STILL);
    const [captures, setCaptures] = useState(photosGallery);
    const [checkedPhoto, setCheckedPhoto] = useState(initialCheckedPhone);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasCameraRollPermission, setHasCameraRollPermission] = useState(false);
    const [isOpenCamera, setIsOpenCamera] = useState(false);
    const [lastPhoto, setLastPhoto] = useState('');
    const { couponName, shopName, dateOfPurchase, warrantyPeriod, typeWarrantyPeriod } = infoPurchase;

    useEffect(() => {
        setCaptures(photosGallery);
    }, [photosGallery]);

    useEffect(() => {
        setCheckedPhoto(initialCheckedPhone);
    }, [initialCheckedPhone]);

    const getPermission = () => {
        (async () => {
            const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const camera = await Permissions.askAsync(Permissions.CAMERA);
            const hasCameraPermission = camera.status === 'granted';
            const hasCameraRollPermission = cameraRoll.status === 'granted';

            setHasCameraPermission(hasCameraPermission);
            setHasCameraRollPermission(hasCameraRollPermission);

            if (cameraRoll.status !== 'granted') {
                notificationActions.addNotifications('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    };

    const getPhoto = (quantity: number) => {
        (async () => {
            setRequestStatusGallery(REQUEST.LOADING);

            try {
                const getOptions = () => {
                    if (lastPhoto) {
                        return {
                            first: quantity,
                            after: lastPhoto,
                            mediaType: ['photo']
                        };
                    }

                    return {
                        first: quantity,
                        mediaType: ['photo']
                    };
                };

                const options = getOptions();
                const media = await MediaLibrary.getAssetsAsync(options);

                setLastPhoto(media.assets[media.assets.length - 1].id);

                dispatch(AddCouponActions.savePhotosGallery(media.assets));
                setRequestStatusGallery(REQUEST.STILL);
            } catch {
                setRequestStatusGallery(REQUEST.ERROR);
            }
        })();
    };

    useEffect(() => {
        getPermission();

        if (captures.length === 0 && hasCameraRollPermission) {
            getPhoto(50);
        }
        return () => {
            dispatch(AddCouponActions.updateCheckedPhoto(checkedPhoto));
        };
    }, [hasCameraRollPermission]);

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

        CouponService.addNewCoupon(coupon)
            .then((_) => {
                setRequestStatus(REQUEST.STILL);
                dispatch(AddCouponActions.cleanStore());
                notificationActions.addNotifications('Талон был успешно создан');
                history.push('/coupons');
            })
            .catch((err) => {
                console.log(err.message);
                setRequestStatus(REQUEST.STILL);
            });
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;

        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const handleScroll = ({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
            getPhoto(50);
        }
    };

    const disabledAddPhoto = Object.keys(checkedPhoto).length === 0 || requestStatus === REQUEST.LOADING;

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    if (isOpenCamera) {
        return (
            <View>
                <View style={styles.buttons}>
                    <BackStepButton onPress={handleCloseCamera} />
                    <Button title="Добавить" onPress={handleAddCoupon} disabled={disabledAddPhoto} />
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
                <ScrollView contentContainerStyle={styles.containerPhoto} onScroll={handleScroll}>
                    <PhotoGallery
                        photosGallery={captures}
                        onPress={handleCheckPhoto}
                        checkedPhoto={checkedPhoto}
                        requestStatus={requestStatusGallery}
                    />
                </ScrollView>
                <View style={styles.footer}>
                    <CustomButton title="Добавить" onPress={handleAddCoupon} disabled={disabledAddPhoto} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddCouponPhoto;
