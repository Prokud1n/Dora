import React from 'react';
import { Button, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-native';
import BackStepButton from '../../components/BackStepButton/BackStepButton';
import AddCouponActions from '../../store/actions/addCouponActions';

import styles from './ViewPhoto.style';
import { selectors } from '../../store/reducers/addCouponReducer';

const ViewPhoto = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const uri = useSelector(selectors.uri);
    const checkedPhoto = useSelector(selectors.checkedPhoto);

    const handleCheck = () => {
        const newCheckedPhoto = { ...checkedPhoto };

        newCheckedPhoto[uri] = true;
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
