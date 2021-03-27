import { Dimensions, StyleSheet } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    photo: {
        width: winWidth,
        height: winHeight
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
