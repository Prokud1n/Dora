import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerPage: {
        backgroundColor: '#E5E5E5',
        height: '100%',
        width: '100%'
    },
    label: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 22,
        lineHeight: 22,
        marginLeft: 20
    },
    containerSVG: {
        paddingTop: 5,
        borderRadius: 25,
        backgroundColor: '#fff',
        height: 65,
        width: 65,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    groupCategory: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 23
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
