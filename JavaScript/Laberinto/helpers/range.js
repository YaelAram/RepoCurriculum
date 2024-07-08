/**
 * 
 * @param { number } min 
 * @param { number } max 
 * @param { number } step 
 */
export const range = function* ( max = 10, min = 0, step = 1 ) {
    for( let i = min ; i < max ; i += step ) {
        yield i;
    }
};
