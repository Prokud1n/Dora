import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerPage: {
        backgroundColor: '#E5E5E5',
        height: '100%',
        width: '100%'
    },
    containerInput: {
        marginTop: 25
    },
    errorMessage: {
        color: '#FF3826',
        textAlign: 'center',
        fontSize: 12
    },
    containerActionButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default styles;
