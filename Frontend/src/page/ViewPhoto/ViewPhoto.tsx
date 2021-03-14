import React from 'react';
import { Button, Image, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import AddCouponActions from '../../store/actions/addCouponActions';

import styles from './ViewPhoto.style';

type IProps = {
    onClose: () => void;
    photo: string;
    checkedPhoto?: any;
};

const ViewPhoto = ({ onClose, photo, checkedPhoto }: IProps) => {
    const dispatch = useDispatch();

    const handleCheck = () => {
        const newCheckedPhoto = { ...checkedPhoto };

        newCheckedPhoto[photo] = !checkedPhoto[photo];
        dispatch(AddCouponActions.updateCheckedPhoto(newCheckedPhoto));
        onClose();
    };

    return (
        <>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.backStep} onPress={onClose}>
                    <BackStepButton onPress={onClose} />
                </TouchableOpacity>
                {checkedPhoto ? (
                    <View style={styles.addPhoto}>
                        <Button title={checkedPhoto[photo] ? 'Отменить' : 'Выбрать'} onPress={handleCheck} />
                    </View>
                ) : null}
            </View>
            <Image style={styles.photo} source={{ uri: photo }} />
        </>
    );
};

export default ViewPhoto;
