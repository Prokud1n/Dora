import { Text, TextInput, View } from 'react-native';
import React from 'react';
import styles from './ActiveCouponWarrantyCase.style';
import SVG from '../../SVG/SVG';

const ActiveCouponWarrantyCase = () => {
    return (
        <View>
            <View style={styles.containerWarrantyCaseInfo}>
                <Text style={styles.warrantyCaseLabel}>Товар на экспертизе</Text>
                <SVG svg="warrantyCaseCheckMark" width="75%" height="230%" />
            </View>
            <View style={styles.containerWarrantyCaseInfo}>
                <Text style={styles.warrantyCaseLabel}>До</Text>
                <TextInput style={[styles.input, { width: '90%' }]} value="Дата окончания" editable={false} />
            </View>
            <View style={styles.containerWarrantyCaseInfo}>
                <Text style={styles.warrantyCaseTitle}>Введите дату и мы напомним об окончании экспертизы</Text>
            </View>
            <View style={styles.containerWarrantyCaseInfo}>
                <View>
                    <Text style={styles.warrantyCaseLabel}>Деньги возвращены</Text>
                    <Text style={styles.warrantyCaseTitle}>Талон будет отправлен  в архив</Text>
                </View>
                <SVG svg="warrantyCaseCheckMark" width="80%" height="100%" />
            </View>
            <View style={styles.containerWarrantyCaseInfo}>
                <View>
                    <Text style={styles.warrantyCaseLabel}>Товар заменен</Text>
                    <Text style={styles.warrantyCaseTitle}>Талон улетит в архив,</Text>
                    <Text style={styles.warrantyCaseTitle}>а вы сможете добавить новый</Text>
                </View>
                <SVG svg="warrantyCaseCheckMark" width="68%" height="100%" />
            </View>
        </View>
    );
};

export default ActiveCouponWarrantyCase;
