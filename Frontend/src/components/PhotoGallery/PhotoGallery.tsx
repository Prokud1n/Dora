import { Image, Modal, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckMarkPhoto from '../CheckMarkPhoto/CheckMarkPhoto';
import Loader from '../Loader/Loader';
import REQUEST from '../../constants/REQUEST';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './PhotoGallery.style';
import ViewPhoto from '../../page/ViewPhoto/ViewPhoto';
import { notificationActions } from '../../ducks/notifications';

type Props = {
    photosGallery: any;
    checkedPhoto: any;
    onPress: (uri: string) => void;
    requestStatus: number;
};

const PhotoGallery = ({ photosGallery, checkedPhoto, onPress, requestStatus }: Props) => {
    const dispatch = useDispatch();
    const [isOpenPhoto, setIsOpenPhoto] = useState(false);
    const [photo, setPhoto] = useState('');
    const isLoading = requestStatus === REQUEST.LOADING;

    const isCheckedMaxNumber = Object.values(checkedPhoto).filter(Boolean).length === 5;

    useEffect(() => {
        if (isCheckedMaxNumber) {
            dispatch(notificationActions.addNotifications('Вы выбрали максимальное количество фотографий'));
        }
    }, [isCheckedMaxNumber]);

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
                            disabled={isCheckedMaxNumber && !checkedPhoto[p.uri]}
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
            {isLoading && (
                <View style={styles.loader}>
                    <Loader />
                </View>
            )}
            {isOpenPhoto && (
                <Modal>
                    <ViewPhoto onClose={() => setIsOpenPhoto(false)} photo={photo} checkedPhoto={checkedPhoto} />
                </Modal>
            )}
        </>
    );
};

export default React.memo(PhotoGallery);
