import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    photo: {
        width: '100%',
        height: '100%'
    },
    addPhoto: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        height: 40,
        width: 100
    },
    containerButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backStep: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 7,
        height: 40,
        width: 100
    }
});

export default styles;
