import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { CLASES, NIVELES } from '../data/clases';
import NivelChip from '../components/NivelChip';
import Card from "../components/Card";
import useResponsive from '../hooks/useResponsive';
import EstadoVacio from '../components/EstadoVacio';
 
export default function StartScreen({navigation}) {
    const {columnas, paddingHorizontal} = useResponsive();
    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(()=>{
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase)=>{
           const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
           const coincideTexto = textoBusqueda === '' || clase.profesor.nombre.toLowerCase().includes(textoBusqueda) || clase.titulo.toLowerCase().includes(textoBusqueda);
           return coincideNivel && coincideTexto
            
        });
    }, [nivel, busqueda]);
 
    return (
        <View style={styles.pantalla}>
            <Text>Aplicación de reservas de clases</Text>
            <View style={styles.buscador}>
                <Ionicons name="search" size={18} color={colors.primario} />
                <TextInput
                value={busqueda}
                style={styles.input}
                onChangeText={setBusqueda}
                placeholder="ingrese el nombre de la clase"
                autoCorrect={false}
                autoComplete="off"
                />
 
                {busqueda.length > 0 && (
                    <Ionicons name="close-circle" size={18} color={colors.primario} onPress={() => setBusqueda('')} />
                )}
            </View>
 
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{flexGrow:0}}    
            >
                {
                    NIVELES.map((item) => (
                        <NivelChip
                        key={item}
                        etiqueta={item}
                        activo={nivel === item}
                        onPress={() => setNivel(item)}
                        />
                    ))
                }
 
            </ScrollView>
            <FlatList 
                data={resultados}
                keyExtractor={(item)=> item.id}
                renderItem={({ item })=>(
                    <Card 
                        clase={item}
                        onPress={()=> navigation.navigate('DetalleClase', {clase:item})}

                    />

                )}
                contentContainerStyle={{
                    paddingHorizontal, flexGrow: 1
                }}
                numColumns={columnas}
                ListEmptyComponent={
                    <EstadoVacio
                    icono="search-outline"
                    titulo="No encontramos resultado"
                    mensaje= "Prueba con otra combinacion de palabras para la busqueda"
                    onAction={()=>{
                        setNivel('Todos');
                        setBusqueda('');
                    }}
                />
                }
            />
        </View>
   
    )}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});
