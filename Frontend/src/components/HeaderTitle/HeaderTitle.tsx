import { Text, View } from 'react-native';
import React from 'react';
import styles from './HeaderTitle.style';

type Props = {
    title: string;
    subtitle: string;
};

const HeaderTitle = ({ title, subtitle }: Props) => {
    return (
        <View style={styles.containerInfo}>
            <Text style={styles.header}>{title}</Text>
            <View>
                <Text style={styles.info}>{subtitle}</Text>
            </View>
        </View>
    );
};

export default HeaderTitle;
