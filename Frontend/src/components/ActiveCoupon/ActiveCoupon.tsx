import React, { useMemo, useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

import TouchableSVG from '../TouchableSVG/TouchableSVG';
import SVG from '../SVG/SVG';
import CustomButton from '../CustomButton/CustomButton';

import styles from './ActiveCoupon.style';

type Props = {
    name: string;
    status: string;
    shop: string;
    category: 'appliancesWhite';
};

const ActiveCoupon = ({ name, status, category, shop }: Props) => {
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [isOpenWarrantyCase, setIsOpenWarrantyCase] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const widthCircle = 10;

    const getCircle = () => {
        const circleArr = [];

        for (let i = 0; i < windowWidth; i += widthCircle) {
            circleArr.push(<View key={i} style={styles.circle} />);
        }
        return circleArr;
    };
    const circleElements = useMemo(() => getCircle(), []);

    const handleOpenInfo = () => {
        setIsOpenInfo(!isOpenInfo);
    };

    const handleOpenWarrantyCase = () => {
        setIsOpenWarrantyCase(!isOpenWarrantyCase);
    };

    return (
        <>
            <View style={isOpenInfo && styles.wrappper}>
                <TouchableOpacity
                    style={[styles.container, isOpenInfo && { marginLeft: 0, marginRight: 0 }]}
                    onPress={handleOpenInfo}>
                    <View style={styles.containerCircle}>{circleElements.map((i) => i)}</View>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.status}>{status}</Text>
                    </View>
                    <View style={styles.category}>
                        <TouchableSVG svg={category} width="100%" height="100%" />
                    </View>
                </TouchableOpacity>
                {isOpenInfo && (
                    <View style={styles.containerInfo}>
                        <Text style={styles.name}>Документы</Text>
                        <Image
                            style={styles.photo}
                            source={{
                                uri: 'assets-library://asset/asset.PNG?id=C5A9CD7F-5CC5-4DA9-82FD-7625555BA2F3&ext=PNG'
                            }}
                        />
                        <Text style={styles.name}>Магазин</Text>
                        <TextInput style={styles.input} value={shop} editable={false} />
                    </View>
                )}
            </View>
            {isOpenInfo && (
                <View style={[styles.containerWarrantyCase, isOpenWarrantyCase && styles.openWarrantyCase]}>
                    <CustomButton
                        title="Гарантийный случай"
                        color="red"
                        disabled={false}
                        marginTop={0}
                        width="100%"
                        circleElements={circleElements}
                        onPress={handleOpenWarrantyCase}
                    />
                    {isOpenWarrantyCase && (
                        <View>
                            <View style={styles.containerWarrantyCaseInfo}>
                                <Text style={styles.warrantyCaseLabel}>Товар на экспертизе</Text>
                                <SVG svg="warrantyCaseCheckMark" width="75%" height="230%" />
                            </View>
                            <View style={styles.containerWarrantyCaseInfo}>
                                <Text style={styles.warrantyCaseLabel}>До</Text>
                                <TextInput
                                    style={[styles.input, { width: '90%' }]}
                                    value="Дата окончания"
                                    editable={false}
                                />
                            </View>
                            <View style={styles.containerWarrantyCaseInfo}>
                                <Text style={styles.warrantyCaseTitle}>
                                    Введите дату и мы напомним об окончании экспертизы
                                </Text>
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
                    )}
                </View>
            )}
        </>
    );
};

export default ActiveCoupon;
