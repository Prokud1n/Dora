import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerPage: {
        backgroundColor: '#E5E5E5',
        height: '100%',
        width: '100%'
    },
    codeFieldRoot: {
        marginTop: 40,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center'
    },
    focusCell: {
        borderColor: '#000'
    }
});

export default styles;
