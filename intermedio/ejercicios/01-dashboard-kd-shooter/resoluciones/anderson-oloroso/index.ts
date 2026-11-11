// Tyep para rol
type Rol = 'Combatiente' | 'Medico' | 'Defensor';

//  Interfaz Jugador
interface Player {
    id: number;
    name: string;
    rol: Rol;
    kills: number;
    deaths: number;
}

type Rendimiento = 'Excelente' | 'Bueno' | 'A mejorar';

interface summaryPlayer {
    name: string;
    kdRatio: number;
    rendimiento: Rendimiento
}

const squad: Player[] = [
    {id: 1, name: 'Alondra', rol: 'Medico', kills: 6, deaths: 5},
    {id: 2, name: 'luckPatcher', rol: 'Defensor', kills: 2, deaths: 6},
    {id: 3, name: 'buenDia', rol: 'Combatiente', kills: 4, deaths: 0}
]

// Calcular K/D de forma segura
function calcularKD(kills: number, deaths: number): number{
    const totalDeath = deaths === 0 ? 1 : deaths;
    return Number((kills/totalDeath).toFixed(2));
};

// Rendimiento
function getPerformance (kd: number): 'Excelente' | 'Bueno' | 'A mejorar' {
    if(kd >= 2.0) return 'Excelente';
    if(kd >=1.0) return 'Bueno';
    return 'A mejorar';
} 

function generateDashboard( players: Player[]) : summaryPlayer[] {
    return players.map<summaryPlayer>((player) => {
        const kd = calcularKD(player.kills, player.deaths);

        return {
            name: player.name,
            kdRatio: kd,
            rendimiento: getPerformance(kd)
        }
    })
}  

// Execute Dashboar
const dashboard =  generateDashboard(squad);

console.log('=== Fasboard K/D ===');
console.table(dashboard);