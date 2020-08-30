import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerPage: {
        backgroundColor: '#E5E5E5',
        height: '100%',
        width: '100%'
    },
    containerButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    containerInput: {
        marginTop: 39
    },
    containerNextButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 74,
        height: 44,
        width: 118,
        backgroundColor: '#fff',
        borderRadius: 35
    },
    nextButton: {
        color: '#8DC4FF',
        textAlign: 'center',
        alignSelf: 'center',
        paddingTop: 13,
        fontSize: 17
    },
    errorMessage: {
        color: '#FF3826',
        textAlign: 'center',
        fontSize: 12
    }
});

export default styles;
