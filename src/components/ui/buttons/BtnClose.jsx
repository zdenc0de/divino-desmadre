import { Icon } from "@iconify/react/dist/iconify.js"

export const BtnClose = ({funcion}) => {
    return (
        <div
        className="absolute top-3 right-3 cursor-pointer" onClick={funcion}>
               <Icon
               icon="ic:round-close"
               width={20}
               height={20}
               />
        </div>
    )   
}