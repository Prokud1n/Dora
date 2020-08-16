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
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        height: 45,
        marginBottom: 16,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 26
    },
    containerRegistrationButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 74,
        height: 44,
        width: 228,
        backgroundColor: '#fff',
        borderRadius: 35
    },
    registrationButton: {
        color: '#8DC4FF',
        textAlign: 'center',
        alignSelf: 'center',
        paddingTop: 13,
        fontSize: 17
    }
});

export default styles;
