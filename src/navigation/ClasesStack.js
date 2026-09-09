import react from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import  StartScreen from "../screens/StartScreen";

const stack = createNativeStackNavigator();

export default function ClasesStack(){
    return(
        <stack.Navigator>
            <stack.Screen
                name="Home"
                component={StartScreen}
                options={{headerShown: false}}
            />
            <Start.Screen 
                name="DetalleClase"
                component={DetalleClasesScreen}
                options={{title: 'Detalle', headerBackTitle: 'Atras'}}
            />
        </stack.Navigator>
    )
}