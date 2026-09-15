import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme';
import EtiquetaNivel from '../components/EtiquetaNivel';
import { formatearPrecio } from '../data/clases';

export default function DetalleClaseScreen({route}){
    const {clase} = route.params;

    return(
        <View style={styles.pantalla}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{paddingBottom: 120}}
            >
                <Image source={{uri: clase.imagen}} resizeMode="cover" style={styles.portada}/>
                <View style={styles.contenido}>
                  <EtiquetaNivel nivel={clase.nivel} />
                  <Text style={styles.titulo}>{clase.titulo}</Text>

                  <View style={styles.profesor}>
                    <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
                    <View>
                      <Text style={styles.etiqueta}>Profesor</Text>
                      <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
                      <Text style={styles.textoSuave}>{clase.profesor.pais}</Text>
                    </View>
                  </View>

                  <View style={styles.datos}>
                    <Dato icono="time-outline" valor={`${clase.duracion} min`} etiqueta="Duración" />
                    <Dato icono="desktop-outline" valor={clase.modalidad} etiqueta="Modalidad" />
                    <Dato icono="star" valor={clase.rating.toFixed(1)} etiqueta="Calificación" />
                    <Dato icono="people-outline" valor={String(clase.cupos)} etiqueta="Cupos" />
                  </View>

                  <Text style={styles.subtitulo}>Sobre esta clase</Text>
                  <Text style={styles.descripcion}>{clase.descripcion}</Text>

                  <Text style={styles.subtitulo}>Horarios disponibles</Text>
                  <View style={styles.horarios}>
                    {clase.horarios.map((horario) => (
                      <View key={horario} style={styles.horario}>
                        <Ionicons name="calendar-outline" size={16} color={colors.primario} />
                        <Text style={styles.horarioTexto}>{horario}</Text>
                      </View>
                    ))}
                  </View>
                </View>
            </ScrollView>
            <View style={styles.barra}>
              <View>
                <Text style={styles.etiqueta}>Precio por clase</Text>
                <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
              </View>
            </View>
        </View>

    )
}

function Dato({ icono, valor, etiqueta }) {
  return (
    <View style={styles.dato}>
      <Ionicons name={icono} size={20} color={colors.primario} />
      <Text style={styles.datoValor}>{valor}</Text>
      <Text style={styles.datoEtiqueta}>{etiqueta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', height: 240, backgroundColor: colors.primarioSuave },
  contenido: { padding: spacing.lg, gap: spacing.md },
  titulo: { ...typography.titulo, fontSize: 28 },
  etiqueta: { fontSize: 12, color: colors.textoSuave },
  textoSuave: { fontSize: 14, color: colors.textoSuave },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  datoEtiqueta: { fontSize: 11, color: colors.textoSuave, textAlign: 'center' },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
  subtitulo: { fontSize: 17, fontWeight: '700', color: colors.texto, marginTop: spacing.sm },
  horarios: { gap: spacing.sm },
  horario: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md, backgroundColor: colors.superficie, borderRadius: radius.md },
  horarioTexto: { color: colors.texto, fontWeight: '600' },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
});
