const { Schema, model } = require( 'mongoose' );

const sale = Schema( {
    title: {
        type: String,
        required: [ true, 'Title field is required' ]
    },
    authors: {
        type: Array,
        required: [ true, 'Authors list is required' ]
    },
    description: {
        type: String,
        required: [ true, 'Description is required' ]
    }
} );

module.exports = model( 'Sale', sale );
