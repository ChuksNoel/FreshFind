function Marcard(props){
    return(
       <div>
         <p>{props.img}</p>
         <h2>{props.markName}</h2>
         <p>{props.markLoc}</p>
         <h3>{props.time}</h3>
         <button>{props.but}</button>
       </div>
    )
}

export default Marcard;