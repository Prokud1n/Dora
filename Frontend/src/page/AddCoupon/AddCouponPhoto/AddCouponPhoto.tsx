import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
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

const createDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

const AddCouponPhoto = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const initialCheckedPhone = useSelector(selectorsAddCoupon.checkedPhoto);
    const photosGallery = useSelector(selectorsAddCoupon.photosGallery);
    const infoPurchase = useSelector(selectorsAddCoupon.infoPurchase);
    const infoCategory = useSelector(selectorsAddCoupon.infoCategory);
    const userId = useSelector(selectorsAuthorization.userId);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);
    const [checkedPhoto, setCheckedPhoto] = useState(initialCheckedPhone);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { couponName, shopName, dateOfPurchase, warrantyPeriod, typeWarrantyPeriod } = infoPurchase;

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    useEffect(() => {
        if (isSubmitted) {
            history.push('/coupons');
        }
    }, [isSubmitted]);

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
        }

        setCheckedPhoto(newCheckedPhoto);
    };

    const handleRedirectToCamera = () => {
        history.push('/camera');
    };

    const getPhotoFiles = () => {
        const uris = Object.keys(checkedPhoto);

        return uris.map((uri) => {
            const photo = photosGallery.find((photo) => photo.uri === uri);
            const type = photo.filename.split('.')[1];

            return {
                name: photo.filename,
                type: `image/${type.toLowerCase()}`,
                uri
            };
        });
    };

    const handleRedirectToCouponsList = async () => {
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

            photoFiles.forEach((photo) => {
                data.append('files', {
                    name: photo.name,
                    type: photo.type,
                    uri: photo.uri
                });
            });

            data.append('user_id', userId);
            data.append('name', couponName);
            data.append('shop_name', shopName);
            data.append('date_of_purchase', createDate(dateOfPurchase));
            data.append('warranty_period', warrantyPeriod);
            data.append('type_warranty_period', typeWarrantyPeriod);
            data.append('category_id', infoCategory.category_id);

            return data;
        };

        const body = createFormData({
            userId,
            couponName,
            shopName,
            dateOfPurchase,
            warrantyPeriod,
            typeWarrantyPeriod,
            photoFiles
        });

        AddCouponActions.addNewCoupon(body)
            .then((_) => {
                setRequestStatus(REQUEST.STILL);
                setIsSubmitted(true);
            })
            .catch((_) => {
                alert('Попробуйте ещё раз!');
                setRequestStatus(REQUEST.STILL);
            });
    };

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

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
