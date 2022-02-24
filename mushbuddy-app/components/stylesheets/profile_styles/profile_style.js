import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0ECE8',
      },
      scrollView: {
        // flex: 1,
        // width: '100%',
        height: 20,
      },
      text: {
        color: '#222222',
      },
      upperContainer: {
        flexDirection: 'column',
        width: '100%',
        height: 250,
      },
      headerBackgroundImage: {
        flex: 1,
        justifyContent: "center",
      },
      upperNavigation: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 24,
        marginHorizontal: 16,
      },
      profileStripContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '20%',
        paddingLeft: 0,
        //backgroundColor: '#F0ECE8',
      },
      profileImageContainer: {
        height: 120,
        width: 120,
        borderRadius: 60,
        borderColor: 'white',
        borderWidth: 4,
        overflow: 'hidden',
        backgroundColor: '#F0ECE8',
      },
      profileImage: {
        width: '70%',
        height: '70%',
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      userInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        marginTop: 150,
        paddingLeft: 30,
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      subheaderText: {
        fontSize: 14,
        color: "#6C6C6C",
        marginTop: 3,
      },
      locationLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
      },
      buttonGroupContainer: {
        flex: 1,
        width: '100%',
        height: 40,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
});