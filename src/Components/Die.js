export default function Die(props){
    let background = {
        backgroundColor: props.isHeld ? "#59E391": "white"
    }

    return(
    <div className="die" style={background}>
        <span>{props.value}</span>
    </div>
    )
}