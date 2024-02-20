const ConvertStateColor = (state) => {
    switch (state) {
        case 'RENTAL' : return 'blue';
        case null : return 'green';
        case "RESERVATION" : return 'red';
        case "RETURN_DELAYED" : return 'yellow';
        case "RETURN_NORMAL" : return 'green';
        case "RETURN_ALREADY" : return 'orange';
        default : return 'black';
    }

}

export default ConvertStateColor;
