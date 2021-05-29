import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        height: 45,
        marginTop: 12,
        marginBottom: 16,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'center',
        fontSize: 17,
        color: '#8C8C8C'
    },
    warrantyCaseLabel: {
        fontSize: 17
    },
    warrantyCaseTitle: {
        fontSize: 12,
        color: '#8C8C8C'
    },
    containerHidePicker: {
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    containerWarrantyCaseInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },
    containerDatePicker: {
        height: '35%',
        marginTop: 'auto',
        backgroundColor: '#E5E5E5'
    }
});

export default styles;
