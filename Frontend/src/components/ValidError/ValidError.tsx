import { Text } from 'react-native';
import React, { ReactNode } from 'react';
import styles from './ValidError.style';

export default ({ children }: { children: ReactNode }) => <Text style={styles.errorMessage}>{children}</Text>;
