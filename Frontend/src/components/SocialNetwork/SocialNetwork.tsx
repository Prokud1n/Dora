import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SVG from '../SVG/SVG';

import styles from './SocialNetwork.style';

type Props = {
    text: string;
    icon: 'Google' | 'FB' | 'Mail' | 'VK';
    onPress: () => void;
};

const SocialNetwork = ({ text, icon, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.containerSocialNetwork}>
                <View style={styles.socialNetwork}>
                    <SVG svg={icon} width="50%" height="50%" />
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SocialNetwork;
