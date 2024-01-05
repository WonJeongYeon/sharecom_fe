const ConvertLocalDate = (date) => {
    return date[0] +
        '-' + ( (date[1]) < 10 ? "0" + (date[1]) : (date[1]) )+
        '-' + ( (date[2]) < 10 ? "0" + (date[2]) : (date[2]) )
}

export default ConvertLocalDate;
