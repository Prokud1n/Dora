import { SafeAreaView, TextInput, View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './CouponsList.style';

const CouponsList = () => {
    const [search, setSearch] = useState('');

    return (
        <SafeAreaView>
            <View style={styles.containerPage}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Поиск по талонам"
                    />
                </View>
                <View>
                    <Text>Пока здесь ничего нет. Нужно добавить талонов.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CouponsList;
