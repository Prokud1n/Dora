import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useHistory } from 'react-router-native';
import { useDispatch } from 'react-redux';
import CheckMarkPhoto from '../CheckMarkPhoto/CheckMarkPhoto';
import Loader from '../Loader/Loader';
import REQUEST from '../../constants/REQUEST';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import AddCouponActions from '../../store/actions/addCouponActions';

import styles from '../../page/AddCoupon/AddCouponPhoto/AddCouponPhoto.style';

type Props = {
    photosGallery: any;
    checkedPhoto: any;
    onPress: (uri: string) => void;
    requestStatus: number;
};

const PhotoGallery = ({ photosGallery, checkedPhoto, onPress, requestStatus }: Props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleOpenPhoto = (uri) => {
        dispatch(AddCouponActions.viewPhoto(uri));
        history.push('/viewPhoto');
    };

    if (requestStatus === REQUEST.LOADING) {
        return <Loader />;
    }

    if (requestStatus === REQUEST.ERROR) {
        return <ErrorMessage errorMessage="Не удалось загрузить фото из вашей галлереи" />;
    }

    return photosGallery.map((p) => (
        <View key={p.creationTime + p.uri}>
            <View style={styles.containerCheckMark}>
                <CheckMarkPhoto width="60%" height="60%" checked={checkedPhoto[p.uri]} onPress={onPress} uri={p.uri} />
            </View>
            <TouchableOpacity onPress={() => handleOpenPhoto(p.uri)}>
                <Image style={styles.photo} source={{ uri: p.uri }} />
            </TouchableOpacity>
        </View>
    ));
};

export default React.memo(PhotoGallery);
