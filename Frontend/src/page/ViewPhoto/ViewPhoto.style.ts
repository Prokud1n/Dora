import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    photo: {
        marginTop: 40,
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    addPhoto: {
        right: -100,
        top: 0,
        position: 'absolute',
        height: 200,
        width: 300
    },
    containerButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backStep: {
        left: 0,
        top: 0,
        position: 'absolute',
        height: 200,
        width: 300
    }
});

export default styles;
