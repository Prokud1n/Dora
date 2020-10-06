import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import TouchableSVG from '../TouchableSVG/TouchableSVG';

import styles from './ActiveCoupon.style';

type Props = {
    name: string;
    status: string;
    shop: string;
    category: 'appliancesWhite';
};

const ActiveCoupon = ({ name, status, category, shop }: Props) => {
    const [isOpenInfo, setIsOpenInfo] = useState(false);

    const handleOpenInfo = () => {
        setIsOpenInfo(!isOpenInfo);
    };

    return (
        <View style={isOpenInfo && styles.wrappper}>
            <TouchableOpacity
                style={[styles.container, isOpenInfo && { marginLeft: 0, marginRight: 0 }]}
                onPress={handleOpenInfo}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.status}>{status}</Text>
                </View>
                <View style={styles.category}>
                    <TouchableSVG svg={category} width="100%" height="100%" />
                </View>
            </TouchableOpacity>
            {isOpenInfo && (
                <View style={styles.containerInfo}>
                    <Text style={styles.name}>Документы</Text>
                    <Image
                        style={styles.photo}
                        source={{
                            uri: 'assets-library://asset/asset.PNG?id=C5A9CD7F-5CC5-4DA9-82FD-7625555BA2F3&ext=PNG'
                        }}
                    />
                    <Text style={styles.name}>Магазин</Text>
                    <TextInput style={styles.input} value={shop} editable={false} />
                </View>
            )}
        </View>
    );
};

export default ActiveCoupon;
