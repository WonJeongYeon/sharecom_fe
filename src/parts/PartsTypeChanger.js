const PartsTypeChanger = (type) => {
    switch (type) {
        case 'MAIN_BOARD' :
            return '메인보드';
        case 'POWER' :
            return '파워';
        case 'COOLER' :
            return '쿨러';
        default:
            return type;
    }
}

export default PartsTypeChanger;
