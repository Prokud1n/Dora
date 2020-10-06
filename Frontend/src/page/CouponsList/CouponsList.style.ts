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
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    containerCoupons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 17,
        lineHeight: 20,
        textAlign: 'center',
        color: '#8C8C8C'
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        height: 51,
        width: '65%',
        marginBottom: 16,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 26
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        marginLeft: 16,
        marginBottom: 16
    },
    containerSVG: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 25
    },
    deleteSVG: {
        marginLeft: 10
    }
});

export default styles;
