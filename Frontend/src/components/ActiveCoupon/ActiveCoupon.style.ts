import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrappper: {
        backgroundColor: '#fff',
        borderRadius: 35,
        marginLeft: 16,
        marginRight: 16
    },
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
    },
    containerInfo: {
        backgroundColor: '#fff',
        borderRadius: 35,
        paddingRight: 30,
        paddingLeft: 21
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        height: 45,
        marginTop: 12,
        marginBottom: 16,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'center',
        fontSize: 17,
        color: '#8C8C8C'
    },
    photo: {
        position: 'relative',
        width: 120,
        height: 80,
        borderRadius: 15,
        marginRight: 6,
        marginBottom: 24,
        marginTop: 12
    }
});

export default styles;
