import {createNativeStackNavigator} from "@react-navigation/native-stack";
import  StartScreen from "../screens/StartScreen";
import DetalleClaseScreen from '../screens/DetalleClasesScreen';

const Stack = createNativeStackNavigator();

export default function ClasesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={StartScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetalleClase"
                component={DetalleClaseScreen}
                options={{title: 'Detalle', headerBackTitle: 'Atras'}}
            />
        </Stack.Navigator>
    )
}
