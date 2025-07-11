import { Link } from "react-router-dom";

type Props={
    to:string;
    bg:string;
    text:string;
    textColor:string;
    onClick?:()=>Promise<void>;
}
const NavigationLink = (props:Props) => {
  return (
    <Link onClick={props.onClick} className="font-bold mx-5 px-2.5 py-2 rounded-md hover:shadow-md hover:shadow-teal-900" to={props.to} style={{background:props.bg,color:props.textColor}}>
        {props.text}
    </Link>
  )
}

export default NavigationLink