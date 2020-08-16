import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerPage: {
        backgroundColor: '#E5E5E5',
        height: '100%'
    },
    containerButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    containerInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 32
    },
    header: {
        fontSize: 22,
        fontWeight: '600'
    },
    info: {
        fontSize: 14,
        marginTop: 5,
        color: '#8C8C8C'
    },
    containerAgreements: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 15,
        marginLeft: 50,
        marginBottom: 19
    }
});

export default styles;
