export const calculateIMC = (weight, height) => {
    const height1 = height / 100;
    const height2 = height1 * height1;
    return weight / (height2);
}

export const calculateTotal = ( passageThrougCurves, braking, reaction, control, touch, adaptability, overtaking, defending, accuracy) => {
    return  (passageThrougCurves + braking + reaction + control + touch + adaptability + overtaking + defending + accuracy)/9;
}