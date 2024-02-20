const ConvertBackgroundStateColor = (state) => {
    switch (state) {
        case 'RENTAL' : return '#8a9dff';
        case null : return '#d2ebd3';
        case 'true' : return '#f5d0cd';
        case 'false' : return '#d2ebd3';
        case "RESERVATION" : return '#f5d0cd';
        case "RETURN_DELAYED" : return '#ffef92';
        case "RETURN_NORMAL" : return '#d2ebd3';
        case "RETURN_ALREADY" : return '#ffc29b';
        default : return 'white';
    }
}

export default ConvertBackgroundStateColor;
