import { Image, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../ActiveCoupon.style';
import AddCouponActions from '../../../store/actions/addCouponActions';
import ErrorIndicator from '../../ErrorBoundary/ErrorIndicator/ErrorIndicator';

type Props = {
    fileUrl: string;
    shop: string;
};

const ActiveCouponPhoto = ({ fileUrl, shop }: Props) => {
    const [photo, setPhoto] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        AddCouponActions.fetchPhoto(fileUrl)
            .then((response) => {
                const url = `data:${response?.headers['content-type']};base64,${btoa(
                    String.fromCharCode(...new Uint8Array(response?.data))
                )}`;

                setPhoto(url);
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            });
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
            {isError && <ErrorIndicator message="Не удалось загрузить фото" />}
            <Text style={styles.name}>Магазин</Text>
            <TextInput style={styles.input} value={shop} editable={false} />
        </View>
    );
};

export default ActiveCouponPhoto;
