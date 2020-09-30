import React from 'react';
import { Button, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-native';
import { RootState } from '../../store/reducers/rootReducer';
import BackStepButton from '../../components/BackStepButton/BackStepButton';

import styles from './ViewPhoto.style';
import AddCouponActions from '../../store/actions/addCouponActions';

const ViewPhoto = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const uri = useSelector((state: RootState) => state.addCoupon.uri);
    const checkedPhoto = useSelector((state: RootState) => state.addCoupon.checkedPhoto);

    const handleCheck = () => {
        const newCheckedPhoto = [...checkedPhoto];

        newCheckedPhoto.push(uri);
        dispatch(AddCouponActions.updateCheckedPhoto(newCheckedPhoto));
        history.push('./photo');
    };

    return (
        <>
            <View style={styles.containerButton}>
                <BackStepButton />
                <Button title="Выбрать" onPress={handleCheck} />
            </View>
            <Image style={styles.photo} source={{ uri }} />
        </>
    );
};

export default ViewPhoto;
