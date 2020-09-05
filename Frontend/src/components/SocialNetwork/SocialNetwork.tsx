import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import getXML from '../../utils/getXML';

import styles from './SocialNetwork.style';

type Props = {
    text: string;
    icon: 'Google' | 'FB' | 'Mail' | 'VK';
    onPress: () => void;
};

const SocialNetwork = ({ text, icon, onPress }: Props) => {
    const xml = getXML(icon);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.containerSocialNetwork}>
                <View style={styles.socialNetwork}>
                    <SvgXml xml={xml} width="50%" height="50%" />
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SocialNetwork;
