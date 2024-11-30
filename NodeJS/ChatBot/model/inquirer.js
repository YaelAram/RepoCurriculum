const inquirer = require( 'inquirer' );
require( 'colors' );

const getData = async ( message ) => {
    const inputMessage = [
        {
            type: 'input',
            name: 'data',
            message,
            validate( value ){
                if( value.length === 0 ) return 'Por favor ingrese un valor';
                return true;
            }
        }
    ];

    const { data } = await inquirer.prompt( inputMessage );
    return data;
};

const listBooks = async ( message, choices ) => {
    const list = [
        {
            type: 'list',
            name: 'itemID',
            message,
            choices
        }
    ];
    const { itemID } = await inquirer.prompt( list );
    return itemID;
};

const manageCart = async ( message, choices ) => {
    const list = [{
        type: 'checkbox', 
        message,
        name: 'states',
        choices
    }];

    const { states } = await inquirer.prompt( list );
    return states;
};

const ask = async ( message ) => {
    const confirm = [
        {
            type: 'confirm',
            name: 'answer',
            message,
            default: false
        }
    ];

    const { answer } = await inquirer.prompt( confirm );
    return answer;
};

module.exports = {
    getData,
    listBooks,
    ask,
    manageCart
};
