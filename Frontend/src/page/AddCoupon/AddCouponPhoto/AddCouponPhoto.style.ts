import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerPage: {
        backgroundColor: '#E5E5E5',
        height: '100%',
        width: '100%',
        paddingRight: 16,
        paddingLeft: 16
    },
    label: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 22,
        lineHeight: 22,
        marginLeft: 20,
        marginBottom: 20
    },
    containerCameraSVG: {
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    containerPhoto: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 30
    },
    photo: {
        position: 'relative',
        width: 92,
        height: 92,
        borderRadius: 15,
        marginRight: 6,
        marginBottom: 6
    },
    containerCheckMark: {
        position: 'absolute',
        top: -17,
        right: -12,
        zIndex: 1
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 30
    }
});

export default styles;
