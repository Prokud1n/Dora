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
    containerInfo: {
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    header: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600'
    },
    info: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 5,
        color: '#8C8C8C',
        paddingLeft: 51,
        paddingRight: 51
    },
    containerInput: {
        marginTop: 25
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
    containerActionButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    containerLoginButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 17,
        height: 44,
        width: 118,
        backgroundColor: '#fff',
        borderRadius: 35
    },
    loginButton: {
        color: '#8DC4FF',

        textAlign: 'center',
        alignSelf: 'center',
        paddingTop: 13,
        fontSize: 17
    }
});

export default styles;
