import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerSocialNetwork: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
        height: 62
    },
    socialNetwork: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft: 36,
        marginRight: 36,
        height: 62,
        width: 244,
        paddingRight: 83,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.18,
        shadowRadius: 3.84
    },
    text: {
        fontSize: 17,
        lineHeight: 20,
        color: '#000000'
    }
});

export default styles;
