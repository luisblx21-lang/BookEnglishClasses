import React, { useState, useEffect, useCallback, useMemo, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAVE_RESERVAS = "@reservas_ingles";

export const ReservasContext = createContext(null);
export function ReservaProvider({ children }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    //cargar las reservas que tengo guardadas, si no tengo nada me devuelve un arreglo vacio

    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardado != null) {
                    setReservas(JSON.parse(guardado));
                }
            } catch (error) {
                console.log("Error leyendo reservas: ", error);
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);

    useEffect(()=> {
        if(cargando) return;
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error) =>
            console.log('Error guardando reservas: ', error)
        )
    },[reservas, cargando]);

    const agregarReserva = useCallback((clase, horario)=>{
        const nueva={
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        }

        setReservas((prev)=>{
            if(prev.some((r)=> r.id === nueva.id)){
                resultado = {ok: false}
                return prev;
            }
            return {nueva, ...prev}
        })
    },[]);
}