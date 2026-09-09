import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EtiquetaNivel from '../components/EtiquetaNivel';
import {spacing, colors, typhography} from '../theme';
import {formatearPrecio, CLASES, NIVELES} from '../data/clases';
import { ScrollView, TextInput } from 'react-native';
import NivelChip from '../components/NivelChip';
import Card from '../components/Card';
 import useResponsive from '../hooks/useResponsive';
 
export default function StartScreen({navigation}) {
    const insets = useSafeAreaInsets();
    const [nivel, setNivel] = useState();
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(()=>{
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase)=>{
           const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
           const coincideTexto = textoBusqueda || textoBusqueda === '' || clase.profesor.nombre.toLowerCase().includes(textoBusqueda) || clase.titulo.toLowerCase().includes(textoBusqueda)
           return coincideNivel && coincideTexto
            
        });
    }, [nivel, busqueda]);
 
    return (
        <View>
            <Text>Aplicación de reservas de clases</Text>
            <View>
                <Ionicons name="search" size={18} color={colors.primario} />
                <TextInput
                Value={busqueda}
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
                        etiqueta={item.etiqueta}
                        activo={nivel === item.etiqueta}
                        onPress={() => setNivel(item.etiqueta)}
                        />
                    ))
                }
 
            </ScrollView>
            <FlatList 
                data={resultados}
                keyExtractor={(item)=> item.id}
                renderItem={(item)=>(
                    <Card 
                        clase={item}
                        onPress={()=> navigation.navigate('DetalleClase', {clase:item})}

                    />

                )}
                contentContainerStyle={{
                    paddingHorizontal, flexGrow: 1
                }}
            />
        </View>
   
    )}

    const style = StyleSheet.create({
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