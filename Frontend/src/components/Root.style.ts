import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fadingContainer: {
        position: 'absolute',
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: '90%',
        left: '5%',
        zIndex: 1,
        backgroundColor: '#007AFF',
        borderRadius: 30
    },
    fadingText: {
        fontSize: 17,
        textAlign: 'center',
        margin: 10,
        color: '#fff'
    },
    buttonRow: {
        flexDirection: 'row',
        marginVertical: 16
    }
});

export default styles;
