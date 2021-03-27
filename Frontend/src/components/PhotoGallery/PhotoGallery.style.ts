import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    loader: {
        width: '100%',
        height: 92,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
