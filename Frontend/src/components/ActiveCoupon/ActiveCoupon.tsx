import React, { useMemo, useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity, TextInput } from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import ActiveCouponPhoto from './ActiveCouponPhoto/ActiveCouponPhoto';
import ActiveCouponWarrantyCase from './ActiveCouponWarrantyCase/ActiveCouponWarrantyCase';

import styles from './ActiveCoupon.style';
import SVG from '../SVG/SVG';

type Props = {
    userId: string;
    warrnatyId: number;
    name: string;
    status: string;
    shop: string;
    category: string;
    date_end_expertise: string;
    files: { file_id: number; file_url: string }[];
    expertise: boolean;
    money_returned: boolean;
    item_replaced: boolean;
    isArchived: boolean;
    isSoonEndWarranty: boolean;
};

const ActiveCoupon = ({
    userId,
    warrnatyId,
    name,
    status,
    category,
    date_end_expertise,
    shop,
    files,
    expertise,
    money_returned,
    item_replaced,
    isArchived,
    isSoonEndWarranty
}: Props) => {
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
                        <Text style={[styles.name, isArchived && styles.archivedText]}>{name}</Text>
                        <Text style={[styles.status, isArchived && styles.archivedText]}>{status}</Text>
                    </View>
                    <View
                        style={[
                            styles.category,
                            isSoonEndWarranty && styles.categorySoonEndWarranty,
                            isArchived && styles.categoryArchived
                        ]}>
                        <SVG svg={category} width="100%" height="90%" />
                    </View>
                </TouchableOpacity>
                {isOpenInfo && (
                    <View style={styles.containerInfo}>
                        <Text style={styles.name}>Документы</Text>
                        <View style={styles.containerPhotos}>
                            {files.map(({ file_url, file_id }) => (
                                <ActiveCouponPhoto key={file_id} fileUrl={file_url} />
                            ))}
                        </View>
                        <Text style={styles.name}>Магазин</Text>
                        <TextInput style={styles.input} value={shop} editable={false} />
                    </View>
                )}
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
                    {isOpenWarrantyCase && (
                        <ActiveCouponWarrantyCase
                            userId={userId}
                            warrnatyId={warrnatyId}
                            expertise={expertise}
                            item_replaced={item_replaced}
                            money_returned={money_returned}
                            date_end_expertise={date_end_expertise}
                        />
                    )}
                </View>
            )}
        </>
    );
};

export default ActiveCoupon;
