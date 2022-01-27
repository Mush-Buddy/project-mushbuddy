import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      header: {
        backgroundColor: "#00BFFF",
        height: 200,
      },
      body: {
        marginTop: 40,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
      },
      userName: {
        fontSize: 22,
        color: "#222222",
        fontWeight: '600',
      },
      userHandle: {
        fontSize: 14,
        color: "#6C6C6C",
        marginTop: 10,
      },
      userLocation: {
        fontSize: 14,
        color: "#6C6C6C",
        marginTop: 10,
      },
      buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
      },
});