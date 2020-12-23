import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrappper: {
        backgroundColor: '#fff',
        borderRadius: 35,
        marginLeft: 16,
        marginRight: 16
    },
    container: {
        position: 'relative',
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
    categoryArchived: {
        backgroundColor: '#8C8C8C'
    },
    categorySoonEndWarranty: {
        backgroundColor: '#FF3826'
    },
    name: {
        fontSize: 22
    },
    status: {
        fontSize: 12
    },
    archivedText: {
        color: '#8C8C8C'
    },
    containerInfo: {
        backgroundColor: '#fff',
        borderRadius: 35,
        paddingRight: 30,
        paddingLeft: 21
    },
    containerPhotos: {
        display: 'flex',
        flexDirection: 'row',
        height: 90
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
    },
    containerCircle: {
        width: '100%',
        position: 'absolute',
        top: -5,
        display: 'flex',
        flexDirection: 'row'
    },
    circle: {
        minHeight: 10,
        minWidth: 10,
        borderBottomEndRadius: 35,
        borderBottomStartRadius: 35,
        backgroundColor: '#E5E5E5',
        marginRight: 8
    },
    containerWarrantyCase: {
        marginLeft: 16,
        marginRight: 16
    },
    openWarrantyCase: {
        backgroundColor: '#fff',
        borderRadius: 35,
        paddingRight: 30,
        paddingLeft: 21,
        paddingBottom: 30
    }
});

export default styles;
