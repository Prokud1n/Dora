import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 35
    },
    buttonDisabled: {
        color: '#8DC4FF'
    },
    button: {
        color: '#007AFF',
        textAlign: 'center',
        alignSelf: 'center',
        paddingTop: 13,
        fontSize: 17
    },
    footer: {
        position: 'absolute',
        bottom: 0
    }
});

export default styles;
