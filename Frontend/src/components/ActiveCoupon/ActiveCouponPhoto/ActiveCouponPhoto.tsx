import { Image, Modal, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './ActiveCouponPhoto.style';
import ErrorIndicator from '../../ErrorBoundary/ErrorIndicator/ErrorIndicator';
import getBase64FromArrayBuffer from '../../../utils/getBase64FromArrayBuffer';
import REQUEST from '../../../constants/REQUEST';
import Loader from '../../Loader/Loader';
import ViewPhoto from '../../../page/ViewPhoto/ViewPhoto';
import * as CouponService from '../../../services/CouponService';

type Props = {
    fileUrl: string;
};

const ActiveCouponPhoto = ({ fileUrl }: Props) => {
    const [photo, setPhoto] = useState('');
    const [isOpenPhoto, setIsOpenPhoto] = useState(false);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    useEffect(() => {
        setRequestStatus(REQUEST.LOADING);
        CouponService.fetchPhoto(fileUrl)
            .then((response) => {
                const url = `data:${response.headers['content-type']};base64,${getBase64FromArrayBuffer(
                    response.data
                )}`;

                setPhoto(url);
                setRequestStatus(REQUEST.STILL);
            })
            .catch(() => {
                setRequestStatus(REQUEST.ERROR);
            });
    }, [fileUrl]);

    const handleOpenPhoto = () => {
        setIsOpenPhoto(true);
    };

    if (requestStatus === REQUEST.LOADING) {
        return (
            <View style={styles.photo}>
                <Loader />
            </View>
        );
    }

    if (requestStatus === REQUEST.ERROR) {
        return <ErrorIndicator message="Не удалось загрузить фото" />;
    }

    return (
        Boolean(photo) && (
            <>
                <TouchableOpacity onPress={handleOpenPhoto}>
                    <Image
                        style={styles.photo}
                        source={{
                            uri: photo
                        }}
                    />
                </TouchableOpacity>
                {isOpenPhoto && (
                    <Modal>
                        <ViewPhoto onClose={() => setIsOpenPhoto(false)} photo={photo} />
                    </Modal>
                )}
            </>
        )
    );
};

export default ActiveCouponPhoto;
