const styles =  {
    root: {
      marginTop: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    },
    form: {
      width: "100%",
      "& > * ": {
        marginTop: 2,
      },
    },
    textField: {
      width: "40ch",
    },
    submit: {
      marginRight: 2,
    },
    snack: {
      width: "50%",
      "& > * ": {
        width: "100%",
      },
    },
    titleText: {
      fontFamily: '"Source Sans Pro", Arial, sans-serif',
      fontSize: '2.8rem',
      color: "#ffffff",
      textAlign: 'center',
      letterSpacing: 'normal',
      width:'100%',
      margin: '0',
      padding: '0',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },    
    labelText: {
      fontWeight: '800',      
      fontFamily: '"Source Sans Pro", Arial, sans-serif',
      background: '#ffffff',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',      
	  },
  };
  export default styles