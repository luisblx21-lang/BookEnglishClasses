import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EtiquetaNivel from '../components/EtiquetaNivel';
import {spacing, colors, typhography} from '../theme';
import {formatearPrecio, CLASES, NIVELES} from '../data/clases';
import { ScrollView, TextInput } from 'react-native/types_generated/index';
 
 
export default function StartScreen({navigation}) {
    const [nivel, setNivel] = useState();
    const [busqueda, setBusqueda] = useState('');
 
    return (
        <view>
            <text>Aplicación de reservas de clases</text>
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
 
                        etiqueta={item.etiqueta}
                        activo={nivel === item.etiqueta}
                        onPress={() => setNivel(item.etiqueta)}
                        />
                    ))
                }
 
            </ScrollView>
        </view>
   
    )}