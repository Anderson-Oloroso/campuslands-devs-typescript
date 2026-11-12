// Modelar
type ClaseRPG = 'Guerrero' | 'Mago' | 'Arquero';

interface Atributos {
    fuerza: number;
    agilidad: number;
    inteligencia: number;
}

interface PersonajeConfig {
    readonly id: string;
    nombre: string;
    clase: ClaseRPG;
    atributosIniciales: Atributos;
}

interface ResultadoBuilder {
    readonly id: string;
    nombre: string;
    clase: ClaseRPG;
    puntosTotales: number;
    esValido: boolean;
    mensajeEstado: string;
}

// Regla de negocio: Maximo de puntos permitido para repartir
const LIMITE_MAXIMO_PUNTOS = 50;

// Datos de prueba
const personaNormal: PersonajeConfig = {
    id: 'P001',
    nombre: 'Arthas',
    clase: 'Guerrero',
    atributosIniciales: {
        fuerza: 20,
        agilidad: 10,
        inteligencia: 10
    }
}

// Caso limite: Excede los puntos permitido (75)
const personajeExcesivo: PersonajeConfig = {
    id: 'P002',
    nombre: 'GodModeCheater',
    clase: 'Mago',
    atributosIniciales: {
        fuerza: 25,
        agilidad: 25,
        inteligencia: 25
    }
}

// Calcula la suma total de los atributos
function calcularPuntosTotales(atributos: Atributos) :number {
    return atributos.fuerza + atributos.agilidad + atributos.inteligencia;
}

// Valida si la persona cumple con el limite de puntos
function validarAtributos(puntosTotales: number, limite: number) : boolean{
    return puntosTotales <= limite;
}

// Transforma los datos crudos aplicando logica de negocio
function construirPersonaje(config: PersonajeConfig) :ResultadoBuilder {
    const puntosTotales = calcularPuntosTotales(config.atributosIniciales);
    const esValido = validarAtributos(puntosTotales,LIMITE_MAXIMO_PUNTOS);

    let mensajeEstado = 'Personaje creado con éxito';
    if(!esValido){
        mensajeEstado = `RECHAZADO: Excede el límite de ${LIMITE_MAXIMO_PUNTOS} puntos permitidos`;
    }

    return {
        id: config.id,
        nombre: config.nombre,
        clase: config.clase,
        puntosTotales,
        esValido,
        mensajeEstado
    }
}

// Ejecucion
const result1 = construirPersonaje(personaNormal);
const result2 = construirPersonaje(personajeExcesivo);

console.log('====== RPG BUILDER: Resultado de creación ======');
console.log('Caso Normal');
console.table(result1);

console.log('Caso Limite');
console.table(result2);
