import { StyleSheet } from 'react-native';

export const theme = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tab: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    tabText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    table: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '90%',
        elevation: 2,
    },
    tableHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tableRow: {
        fontSize: 16,
        paddingVertical: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    description: {
        fontSize: 18,
    },
    amount: {
        fontSize: 18,
        color: '#28a745',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
        width: '80%',
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
});
