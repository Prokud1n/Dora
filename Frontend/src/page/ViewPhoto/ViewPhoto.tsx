import React from 'react';
import { Button, Image, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-native';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import AddCouponActions from '../../store/actions/addCouponActions';

import styles from './ViewPhoto.style';
import { selectors } from '../../store/reducers/addCouponReducer';

const ViewPhoto = ({ onClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const photo = useSelector(selectors.photo);
    const checkedPhoto = useSelector(selectors.checkedPhoto);
    const isCanChecked = useSelector(selectors.isCanChecked);

    const handleCheck = () => {
        const newCheckedPhoto = { ...checkedPhoto };

        newCheckedPhoto[photo] = !checkedPhoto[photo];
        dispatch(AddCouponActions.updateCheckedPhoto(newCheckedPhoto));
        history.push('./photo');
    };

    const handleRedirectToBackStep = () => {
        history.goBack();
    };

    return (
        <>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.backStep} onPress={handleRedirectToBackStep}>
                    <BackStepButton onPress={onClose} />
                </TouchableOpacity>
                {isCanChecked ? (
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
