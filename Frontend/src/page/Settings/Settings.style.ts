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
        marginTop: 5
    },
    containerEmail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 36,
        marginLeft: 10
    },
    containerInput: {
        marginTop: 39
    },
    textSettings: {
        fontSize: 19,
        fontWeight: '600',
        color: '#000000',
        marginLeft: 70
    },
    email: {
        fontSize: 23,
        fontWeight: '600',
        color: '#000000',
        marginLeft: 10
    },
    containerSocialNetworks: {
        marginTop: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    socialNetworkItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 60,
        width: 60,
        borderRadius: 20
    },
    marginLeft: {
        marginLeft: 26
    },
    footer: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    footerText: {
        fontSize: 12,
        lineHeight: 14,
        color: '#000000'
    }
});

export default styles;
