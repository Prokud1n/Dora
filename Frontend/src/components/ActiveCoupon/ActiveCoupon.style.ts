import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 35,
        marginLeft: 16,
        marginRight: 16,
        height: 113,
        paddingRight: 30,
        paddingLeft: 21,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    category: {
        borderRadius: 25,
        backgroundColor: '#007AFF',
        height: 65,
        width: 65,
        paddingTop: 7
    },
    name: {
        fontSize: 22
    },
    status: {
        fontSize: 12
    }
});

export default styles;
