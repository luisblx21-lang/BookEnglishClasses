import React, {useState, useEffect} from 'react'
import {View, Text, Image, Pressable, StyleSheet} from 'react-native'
import EtiquetaNivel from  './EtiquetaNivel'
import {colors, radius, spacing,typhography} from '. . /theme'
import { formatearPrecio } from '../data/clases'
import Ionicons from '@react-native-vector-icons/ionicons'
import { TextInput } from 'react-native/types_generated/index'

export default function ClasesScreen ({navigation}){
    const [nivel, setNivel] = useState();
    const [busqueda, setBusqueda] = useState();
    return(
        <view>
            <text>Aplicacion de reserva para clases de ingles</text>
            <view>
                <Ionicons name= "search" size={18} color={colors.primario}></Ionicons>
                <TextInput
                value={busqueda}
                onChangeText={setBusqueda}
                placeholder= "Ingrese el nombre o el nivel para la busqueda"
                autoCorrec={false}
                autoComplete={false}
                />
                {
                    busqueda.length > 0 && (
                        <Ionicons 
                            name="close-circle"
                            size={18}
                            color={color.primario}
                            onPress={()=> setBusqueda("")}
                            />
                    )
                }
            </view>
        </view>
    )
}