const ConvertLocalDateTime = (date) => {
    return date[0] +
        '-' + ( (date[1]) < 10 ? "0" + (date[1]) : (date[1]) )+
        '-' + ( (date[2]) < 10 ? "0" + (date[2]) : (date[2]) ) + " " +
        (date[3] < 10? "0" : "") + date[3] + ":" +
        (date[4] < 10? "0" : "") + date[4] + ":" +
        (date[5] < 10? "0" : "") + date[5]
}

export default ConvertLocalDateTime;
