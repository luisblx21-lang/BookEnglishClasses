import { Platform } from "react-native";
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";

export const colors = {
    background : '#f1e3e3',
    superficie : '#d6b3b300',
    texto : '#edf2f400',
    border: 'rgb(130, 130, 215)'


    
}
export const spacing = {
    xs:4,
    sm:8,
    md:12,
    lg:16,
    xl:18
}

export const radius = {
    sm:8,
    md:14,
    lg:20,
    full: 999
}

export  const typhography = {
    titulo: { fontSize: 26, fontWeight :'800', color: colors.texto }

}

export default{colors,spacign,radius,typhography}