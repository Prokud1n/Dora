import { SvgXml } from 'react-native-svg';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import getXML from '../../utils/getXML';

import styles from './TouchableSVG.style';

type Props = {
    id: string;
    svg:
        | 'Google'
        | 'FB'
        | 'Mail'
        | 'VK'
        | 'Telegram'
        | 'addCoupon'
        | 'settings'
        | 'notFoundCoupons'
        | 'householdProducts'
        | 'householdProductsActive'
        | 'appliances'
        | 'appliancesActive'
        | 'appliancesWhite'
        | 'clothesAndShoes'
        | 'clothesAndShoesActive'
        | 'otherGoods'
        | 'otherGoodsActive'
        | 'goodsForAuto'
        | 'goodsForAutoActive'
        | 'checkMark'
        | 'activeCheckMark'
        | 'delete'
        | 'edit'
        | 'photo';
    width: string;
    height: string;
    disabled?: boolean;
    onPress?: (id: string) => void;
};

const TouchableSVG = ({ svg, width, height, onPress, id, disabled }: Props) => {
    const xml = getXML(svg);
    const handlePress = () => {
        onPress(id);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} disabled={disabled}>
            <SvgXml xml={xml} width={width} height={height} />
        </TouchableOpacity>
    );
};

export default TouchableSVG;
