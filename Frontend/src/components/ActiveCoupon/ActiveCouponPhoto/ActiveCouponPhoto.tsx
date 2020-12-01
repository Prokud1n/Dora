import { Image, Text, TextInput, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../ActiveCoupon.style';
import AddCouponActions from '../../../store/actions/addCouponActions';
import { selectors } from '../../../store/reducers/addCouponReducer';

type Props = {
    fileUrl: string;
    shop: string;
};

const ActiveCouponPhoto = ({ fileUrl, shop }: Props) => {
    const photo = useSelector(selectors.photo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AddCouponActions.fetchPhoto(fileUrl));
    }, [fileUrl]);

    return (
        <View style={styles.containerInfo}>
            <Text style={styles.name}>Документы</Text>
            {Boolean(photo) && (
                <Image
                    style={styles.photo}
                    source={{
                        // uri: 'https://dora.team/api/users/4/file/62'
                        uri: photo
                    }}
                />
            )}
            <Text style={styles.name}>Магазин</Text>
            <TextInput style={styles.input} value={shop} editable={false} />
        </View>
    );
};

export default ActiveCouponPhoto;
