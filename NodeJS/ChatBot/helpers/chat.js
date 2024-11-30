require( 'colors' );

const types = {
    normal: process.env.robot.cyan,
    error: process.env.robot_error.red,
    question: process.env.robot_question.cyan,
    sad: process.env.robot_sad.cyan
};

const user = process.env.user.yellow;

const createMessage = ( type, message ) => ( `${ types[ type ] }: ${ message } \n${ '?'.green } ${ user }:` );
const createTitle = ( type, message ) => ( `${ types[ type ] }: ${ message }` );
const createInfo = ( type, message ) => ( `${ '?'.green } ${ types[ type ] }: ${ message }` );

module.exports = {
    createMessage,
    createTitle,
    createInfo
};
