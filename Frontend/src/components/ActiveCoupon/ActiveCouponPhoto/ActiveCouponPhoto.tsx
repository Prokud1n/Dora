import { Image, Modal, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ActiveCouponPhoto.style';
import AddCouponActions from '../../../store/actions/addCouponActions';
import ErrorIndicator from '../../ErrorBoundary/ErrorIndicator/ErrorIndicator';
import getBase64FromArrayBuffer from '../../../utils/getBase64FromArrayBuffer';
import REQUEST from '../../../constants/REQUEST';
import Loader from '../../Loader/Loader';
import ViewPhoto from '../../../page/ViewPhoto/ViewPhoto';

type Props = {
    fileUrl: string;
};

const ActiveCouponPhoto = ({ fileUrl }: Props) => {
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState('');
    const [isOpenPhoto, setIsOpenPhoto] = useState(false);
    const [requestStatus, setRequestStatus] = useState(REQUEST.STILL);

    useEffect(() => {
        setRequestStatus(REQUEST.LOADING);
        AddCouponActions.fetchPhoto(fileUrl)
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

    const handleOpenPhoto = (uri) => {
        dispatch(AddCouponActions.viewPhoto(uri, false));
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
                <TouchableOpacity onPress={() => handleOpenPhoto(photo)}>
                    <Image
                        style={styles.photo}
                        source={{
                            uri: photo
                        }}
                    />
                </TouchableOpacity>
                {isOpenPhoto && (
                    <Modal>
                        <ViewPhoto onClose={() => setIsOpenPhoto(false)} />
                    </Modal>
                )}
            </>
        )
    );
};

export default ActiveCouponPhoto;
