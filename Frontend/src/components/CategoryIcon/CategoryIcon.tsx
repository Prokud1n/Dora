import { Text, View } from 'react-native';
import React from 'react';
import styles from './CategoryIcon.style';
import TouchableSVG from '../TouchableSVG/TouchableSVG';

type Props = {
    icon: 'householdProducts' | 'appliances' | 'clothesAndShoes' | 'otherGoods' | 'goodsForAuto';
    title: string;
    subTitle: string;
    onPress: (icon: string) => void;
};

const CategoryIcon = ({ icon, title, subTitle, onPress }: Props) => {
    const handlePress = () => {
        onPress(icon);
    };
    const isActive = icon.includes('Active');

    return (
        <View>
            <View style={styles.containerSVG}>
                <TouchableSVG svg={icon} width="100%" height="100%" onPress={handlePress} />
            </View>
            <Text style={[styles.title, isActive && styles.active]}>{title}</Text>
            <Text style={[styles.title, isActive && styles.active]}>{subTitle}</Text>
        </View>
    );
};

export default CategoryIcon;
