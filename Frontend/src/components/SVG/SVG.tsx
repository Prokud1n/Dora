import { SvgXml } from 'react-native-svg';
import React from 'react';
import getXML from '../../utils/getXML';

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
        | 'warrantyCaseCheckMark';
    width: string;
    height: string;
    onPress?: () => void;
};

const SVG = ({ svg, width, height, onPress }: Props) => {
    const xml = getXML(svg);

    return <SvgXml xml={xml} width={width} height={height} onPress={onPress} />;
};

export default SVG;
