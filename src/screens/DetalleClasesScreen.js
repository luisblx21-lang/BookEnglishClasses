import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { spacing, colors, radius, typography } from '../theme';
import EtiquetaNivel from '../components/EtiquetaNivel';
import { formatearPrecio } from '../data/clases';


 
export default function DetalleClaseScreen({ route }) {
    const insets = useSafeAreaInsets();
    const {clase} = route.params;
    const [cuposDisponibles, setCuposDisponibles] = useState(clase.cupos);
    const [mensaje, setMensaje] = useState('');

    const reservar = () => {
        if (cuposDisponibles <= 0) {
            setMensaje('Ya no hay cupos disponibles para esta clase.');
            return;
        }
        setCuposDisponibles((cupos) => cupos - 1);
        setMensaje(`✓ Reserva confirmada: ${clase.titulo}`);
    };
   
    return (
        <View style={styles.pantalla}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 120}}
            >
                <Image source={{uri: clase.imagen}} resizeMode='cover' style={styles.portada} />
                <View style={styles.contenido}>
                    <EtiquetaNivel nivel={clase.nivel} />
                    <Text style={styles.titulo}>{clase.titulo}</Text>
                    <Text style={styles.descripcion}>{clase.descripcion}</Text>

                    <View style={styles.datos}>
                        <View style={styles.dato}>
                            <Text style={styles.datoValor}>{clase.duracion} min</Text>
                            <Text>Duración</Text>
                        </View>
                        <View style={styles.dato}>
                            <Text style={styles.datoValor}>{cuposDisponibles}</Text>
                            <Text style={styles.datoLabel}>Cupos</Text>
                        </View>
                        <View style={styles.dato}>
                            <Text style={styles.datoValor}>{clase.modalidad}</Text>
                            <Text style={styles.datoLabel}>Modalidad</Text>
                        </View>
                    </View>

                    <View style={styles.profesor}>
                        <Image source={{uri: clase.profesor.foto}} style={styles.avatar} />
                        <View>
                            <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
                            <Text style={styles.profesorPais}>{clase.profesor.pais}</Text>
                        </View>
                    </View>

                    <Text style={styles.seccion}>Horarios disponibles</Text>
                    {clase.horarios.map((horario) => (
                        <Text key={horario} style={styles.horario}>{horario}</Text>
                    ))}

                    {mensaje !== '' && (
                        <View style={styles.mensajeCaja}>
                            <Text style={styles.mensajeTexto}>{mensaje}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <View style={[styles.barra, {paddingBottom: insets.bottom + spacing.md}]}>
                <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
                <Pressable
                    style={[styles.boton, cuposDisponibles <= 0 && styles.botonDeshabilitado]}
                    onPress={reservar}
                    disabled={cuposDisponibles <= 0}
                >
                    <Text style={styles.botonTexto}>Reservar</Text>
                </Pressable>
            </View>
           
        </View>
        
    )
   
}
 
const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', height: 220, backgroundColor: colors.primarioSuave },
  contenido: { padding: spacing.lg },
  titulo: { ...typography.titulo, fontSize: 22, color: colors.texto, marginTop: spacing.sm },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  datoLabel: { fontSize: 12, color: colors.textoSuave, marginTop: 2 },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  profesorPais: { fontSize: 13, color: colors.textoSuave, marginTop: 2 },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
  seccion: { fontSize: 16, fontWeight: '700', color: colors.texto, marginTop: spacing.lg, marginBottom: spacing.sm },
  horario: { fontSize: 14, color: colors.textoSuave, marginBottom: spacing.xs },
  mensajeCaja: {
    backgroundColor: colors.primarioSuave,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  mensajeTexto: { color: colors.primario, fontWeight: '700', textAlign: 'center' },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
  boton: {
    backgroundColor: colors.primario,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
  },
  botonTexto: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  botonDeshabilitado: { opacity: 0.55 },
});
