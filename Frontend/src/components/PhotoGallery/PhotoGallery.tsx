import { Image, Modal, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CheckMarkPhoto from '../CheckMarkPhoto/CheckMarkPhoto';
import Loader from '../Loader/Loader';
import REQUEST from '../../constants/REQUEST';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from '../../page/AddCoupon/AddCouponPhoto/AddCouponPhoto.style';
import ViewPhoto from '../../page/ViewPhoto/ViewPhoto';

type Props = {
    photosGallery: any;
    checkedPhoto: any;
    onPress: (uri: string) => void;
    requestStatus: number;
};

const PhotoGallery = ({ photosGallery, checkedPhoto, onPress, requestStatus }: Props) => {
    const [isOpenPhoto, setIsOpenPhoto] = useState(false);
    const [photo, setPhoto] = useState('');

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    if (requestStatus === REQUEST.ERROR) {
        return <ErrorMessage errorMessage="Не удалось загрузить фото из вашей галлереи" />;
    }

    return (
        <>
            {photosGallery.map((p) => (
                <View key={p.creationTime + p.uri}>
                    <View style={styles.containerCheckMark}>
                        <CheckMarkPhoto
                            width="60%"
                            height="60%"
                            checked={checkedPhoto[p.uri]}
                            onPress={onPress}
                            uri={p.uri}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setPhoto(p.uri);
                            setIsOpenPhoto(true);
                        }}>
                        <Image style={styles.photo} source={{ uri: p.uri }} />
                    </TouchableOpacity>
                </View>
            ))}
            {isOpenPhoto && (
                <Modal>
                    <ViewPhoto onClose={() => setIsOpenPhoto(false)} photo={photo} checkedPhoto={checkedPhoto} />
                </Modal>
            )}
        </>
    );
};

export default React.memo(PhotoGallery);
