export const calculateIMC = (weight, height) => {
    const height1 = height / 100;
    const height2 = height1 * height1;
    return weight / (height2);
}

export const calculateTotal = ( passageThrougCurves, braking, reaction, control, touch, adaptability, overtaking, defending, accuracy) => {
    return  (passageThrougCurves + braking + reaction + control + touch + adaptability + overtaking + defending + accuracy)/9;
}


export const calculateAveragePoints = (points) => {
    const sum = points.reduce((acc, point) => acc + point, 0);
    const average = sum / points.length;
    return average;
}
export const calculateAveragePosition = (position) => {
    const sum = position.reduce((acc, position) => acc + position, 0);
    const average = sum / position.length;
    return average;
}
export const calculateAverageWins = (wins) => {
    if (!Array.isArray(wins)) {
        console.error('Error: wins no es un array.');
        return null;
    }
    const sum = wins.reduce((acc, wins) => acc + wins, 0);
    const average = sum / wins.length;
    return average;
}

