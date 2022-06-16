import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() =>({
    appBar: {
        borderRadius: 15,
        margin: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'left',
      },
      heading: {
        color: 'rgba(47, 24, 75, 1)',
      },
      image: {
        marginLeft: '15px',
      },

      title:{
        marginLeft: '30px',
        backgroundColor: "inherit",//'#eee6fa',
        padding: 15,
        flexGrow: 1,
        textTransform: 'capitalize',
        fontSize: 24,
        color: "#2F184B",
        textAlign: 'center',
      },

      titleSecondButton:{
        marginLeft: '30px',
        fontStyle: 'italic',
        backgroundColor: '#2F184B',
        padding: 15,
        flexGrow: 1,
        textTransform: 'capitalize',
        fontSize: 24,
        color: "#f2f0f5",
      },

    //   buttonCommonText: {
    //     fontWeight: 'bold',
    //     textTransform: 'capitalize',
    //     fontSize: 16,
    //     textAlign: 'center',
    // },
    
}));