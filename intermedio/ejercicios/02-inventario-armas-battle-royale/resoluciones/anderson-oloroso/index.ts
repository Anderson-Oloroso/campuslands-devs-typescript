// Tipos
type TipoItem = 'Arma' | 'Curacion' | 'Municion' | 'Escudo';
type Rareza = 'Comun' | 'Raro' | 'Epico' | 'Legendario';

interface ItemInventario {
    readonly id: number;
    nombre: string;
    tipo: TipoItem;
    rareza: Rareza;
    peso: number;
    cantidad: number;
}

// Estructura Inventario jugador
interface InvetarioJugador{
    readonly jugador: string;
    maxPeso: number;
    items: ItemInventario[];
}

// Resultado final
interface ResumenInventario {
    readonly jugador: string;
    pesoTotal: number;
    espacioDisponible: number;
    sobrecargado: boolean;
    totalItems: number;
}

const inventarioNormal: InvetarioJugador = {
    jugador: 'Jonesy',
    maxPeso: 30,
    items: [
        { id: 1, nombre: "Scar", tipo: "Arma", rareza: "Epico", peso: 15, cantidad: 1 },
        { id: 2, nombre: "Botiquín", tipo: "Curacion", rareza: "Raro", peso: 5, cantidad: 2 }
    ]
}

const casoLimite: InvetarioJugador = {
    jugador: 'newBot',
    maxPeso: 20,
    items: [
        { id: 1, nombre: "Lanzacohetes", tipo: "Arma", rareza: "Legendario", peso: 25, cantidad: 1 },
        { id: 1, nombre: "Escudo Grande", tipo: "Escudo", rareza: "Raro", peso: 10, cantidad: 3 }
    ]
}

// Calcular el peso total de items
function calcularPesoTotal(items: ItemInventario[]) :number {
    return items.reduce((acumulado, item) => acumulado + (item.peso * item.cantidad), 0);
}

// Valida si el inventario supera la capacidad
function validarCarga(pesoActual: number, maxPeso: number): boolean {
    return pesoActual > maxPeso;
}

// Transformar datos crudos
function procesarInventario(inventario: InvetarioJugador) : ResumenInventario {
    const pesoTotal = calcularPesoTotal(inventario.items);
    const sobrecargado = validarCarga(pesoTotal, inventario.maxPeso);
    const espacioDisponible = inventario.maxPeso - pesoTotal;

    const totalItems = inventario.items.reduce((acc, item)=> acc + item.cantidad, 0);

    return {
        jugador: inventario.jugador,
        pesoTotal: pesoTotal,
        espacioDisponible: espacioDisponible >= 0 ? espacioDisponible : 0,
        sobrecargado: sobrecargado,
        totalItems: totalItems
    }
}

const resultadoNormal = procesarInventario(inventarioNormal);
const resultadoLimite = procesarInventario(casoLimite);

// Resultados
console.log('======== BATTLE ROYALE: INVENTARIO TACTICO ========');
console.log('\n--- Caso Normal ---');
console.table(resultadoNormal);

console.log('\n--- Caso Limite ---');
console.table(resultadoLimite);

if(resultadoLimite.sobrecargado) {
    console.warn(`ALERTA: El jugador ${resultadoLimite.jugador} va sobrecargado y su movimiento será mas lento`);
}