import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerPage: {
        backgroundColor: '#E5E5E5',
        height: '100%',
        width: '100%'
    },
    containerHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    text: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
        marginLeft: 70
    },
    label: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 22,
        lineHeight: 22,
        marginLeft: 20
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        height: 45,
        marginBottom: 16,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 26
    },
    containerInput: {
        marginTop: 15
    },
    dimension: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#fff',
        width: 95,
        height: 45
    },
    inputDays: {
        paddingLeft: 35
    },
    colorInputDays: {
        backgroundColor: '#F0F0F0',
        color: '#8C8C8C'
    },
    quaranteePeriod: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    term: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16
    },
    containerHidePicker: {
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default styles;
