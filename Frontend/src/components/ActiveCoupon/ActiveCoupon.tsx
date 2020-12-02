import React, { useMemo, useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import TouchableSVG from '../TouchableSVG/TouchableSVG';
import CustomButton from '../CustomButton/CustomButton';
import ActiveCouponPhoto from './ActiveCouponPhoto/ActiveCouponPhoto';
import ActiveCouponWarrantyCase from './ActiveCouponWarrantyCase/ActiveCouponWarrantyCase';

import styles from './ActiveCoupon.style';

type Props = {
    name: string;
    status: string;
    shop: string;
    category: string;
    files: { file_id: number; file_url: string }[];
};

const ActiveCoupon = ({ name, status, category, shop, files }: Props) => {
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [isOpenWarrantyCase, setIsOpenWarrantyCase] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const widthCircle = 10;

    const getCircle = () => {
        const circleArr = [];

        for (let i = 0; i < windowWidth; i += widthCircle) {
            circleArr.push(<View key={i} style={styles.circle} />);
        }
        return circleArr;
    };
    const circleElements = useMemo(() => getCircle(), []);

    const handleOpenInfo = () => {
        setIsOpenInfo(!isOpenInfo);
    };

    const handleOpenWarrantyCase = () => {
        setIsOpenWarrantyCase(!isOpenWarrantyCase);
    };

    return (
        <>
            <View style={isOpenInfo && styles.wrappper}>
                <TouchableOpacity
                    style={[styles.container, isOpenInfo && { marginLeft: 0, marginRight: 0 }]}
                    onPress={handleOpenInfo}>
                    <View style={styles.containerCircle}>{circleElements.map((i) => i)}</View>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.status}>{status}</Text>
                    </View>
                    <View style={styles.category}>
                        <TouchableSVG svg={category} width="100%" height="100%" />
                    </View>
                </TouchableOpacity>
                {isOpenInfo &&
                    files.map(({ file_url, file_id }) => (
                        <ActiveCouponPhoto key={file_id} fileUrl={file_url} shop={shop} />
                    ))}
            </View>
            {isOpenInfo && (
                <View style={[styles.containerWarrantyCase, isOpenWarrantyCase && styles.openWarrantyCase]}>
                    <CustomButton
                        title="Гарантийный случай"
                        color="red"
                        disabled={false}
                        marginTop={0}
                        width="100%"
                        circleElements={circleElements}
                        onPress={handleOpenWarrantyCase}
                    />
                    {isOpenWarrantyCase && <ActiveCouponWarrantyCase />}
                </View>
            )}
        </>
    );
};

export default ActiveCoupon;
