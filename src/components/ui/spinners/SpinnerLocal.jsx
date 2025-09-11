import {GridLoader} from "react-spinners"
export const SpinnerLocal = () => {
    return (
        <div
        className="w-full flex justify-center items-center p-6">
               <GridLoader 
               color="#c8c8c8"
               size={25}/>
        </div>
    )
}