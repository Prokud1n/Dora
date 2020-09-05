import { SvgXml } from 'react-native-svg';
import React from 'react';
import getXML from '../../utils/getXML';

type Props = {
    svg: 'Google' | 'FB' | 'Mail' | 'VK' | 'addCoupon' | 'settings' | 'notFoundCoupons';
    width: string;
    height: string;
};

const SVG = ({ svg, width, height }: Props) => {
    const xml = getXML(svg);

    return <SvgXml xml={xml} width={width} height={height} />;
};

export default SVG;
