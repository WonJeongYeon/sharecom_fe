const DesktopParts = (props) => {
    return (
        <div>
            <div>{props.type}</div>
            <div>{props.data.name}</div>
            <div>{props.data.serial}</div>
            <div>{props.data.etc}</div>
        </div>
    )
}

export default DesktopParts;
