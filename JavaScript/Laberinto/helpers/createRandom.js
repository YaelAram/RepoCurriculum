/**
 * 
 * @param { number } max 
 * @returns { number }
 */
export const createRandom = ( min = 0, max = 1 ) => {
    return Math.round( Math.random() * ( max - min ) + min );
};
