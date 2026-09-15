import React from 'react'
import {View, Text, Image, Pressable, StyleSheet} from 'react-native'
import EtiquetaNivel from  './EtiquetaNivel'
import { colors, radius, spacing } from '../theme'
import { formatearPrecio } from '../data/clases'


export default function Card({clase, onPress}){
    return(
        <Pressable
        onPress={onPress}
        style={styles.contenedor}
        >
        <Image source={{uri: clase.imagen}} style={styles.imagen}/>
        <View style={styles.contenido}>
            <EtiquetaNivel nivel={clase.nivel}/>
            <Text style={styles.titulo}>{clase.titulo}</Text>
            <Text>{clase.profesor.nombre}</Text>
            <Text>{formatearPrecio(clase.precio)}</Text>
        </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  contenedor: { backgroundColor: colors.superficie, borderRadius: radius.md, marginBottom: spacing.md, overflow: 'hidden' },
  imagen: { width: '100%', height: 160 },
  contenido: { padding: spacing.md, gap: spacing.xs },
  titulo: { fontSize: 16, fontWeight: '700', color: colors.texto },
});
