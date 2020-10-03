import React from 'react';
import TouchableSVG from '../TouchableSVG/TouchableSVG';

type Props = {
    width: string;
    height: string;
    uri: string;
    checked: boolean;
    onPress: (url: string) => void;
};

const CheckMarkPhoto = ({ width, height, onPress, uri, checked }: Props) => {
    const handlePress = () => {
        onPress(uri);
    };

    return (
        <TouchableSVG
            svg={checked ? 'activeCheckMark' : 'checkMark'}
            width={width}
            height={height}
            onPress={handlePress}
        />
    );
};

export default React.memo(CheckMarkPhoto);
