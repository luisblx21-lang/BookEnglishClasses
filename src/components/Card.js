import React from ' react'
import {View, Text, Image, Pressable, StyleSheet} from 'react-native'
import EtiquetaNivel from  './EtiquetaNivel'
import {colors, radius, spacing,typhography} from '. . /theme'
import { formatearPrecio } from '../data/clases'


export default function Card({clase, onPress}){
    return(
        <Pressable
        onPress= {onPress}
        > 
        <Image source={{uri: clase.image}}/>
        <View>
            <EtiquetaNivel nivel={clase.nivel}/>
            <text> {clase.nivel} </text>
            <text> {clase.profesor.nombre} </text>
            <text> formatearPrecio({clase.precio}) </text>
        </View>
        </Pressable>
    )
const style = StyleSheet.create({
    titulo: {fontSize: 16, color:colors}
})

}