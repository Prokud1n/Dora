import { SvgXml } from 'react-native-svg';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import getXML from '../../utils/getXML';

import styles from './TouchableSVG.style';

type Props = {
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
        | 'appliances'
        | 'clothesAndShoes'
        | 'otherGoods'
        | 'goodsForAuto';
    width: string;
    height: string;
    onPress?: () => void;
};

const TouchableSVG = ({ svg, width, height, onPress }: Props) => {
    const xml = getXML(svg);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <SvgXml xml={xml} width={width} height={height} />
        </TouchableOpacity>
    );
};

export default TouchableSVG;
