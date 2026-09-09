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
            <Text> {clase.nivel} </Text>
            <Text> {clase.profesor.nombre} </Text>
            <Text> formatearPrecio({clase.precio}) </Text>
        </View>
        </Pressable>
    )
const style = StyleSheet.create({
    titulo: {fontSize: 16, color:colors}
})

}