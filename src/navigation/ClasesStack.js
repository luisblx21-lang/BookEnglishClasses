import react from "react";
import {createNativeStackNavigator} from "react-navigation/native-stack";
import  StartScreen from "../screens/StartScreen";

const stack = createNativeStackNavigator();

export default function StartScreen(){
    return(
        <stack.Navigator>
            <stack.Screen
                name="Home"
                component={StartScreen}
                options={{headerShown: false}}
            />
        </stack.Navigator>
    )
}