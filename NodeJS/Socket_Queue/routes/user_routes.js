const { Router } = require( 'express' );

const createUser = require( '../controllers/user_controller' );

const router = Router();

router.post( '/', createUser );

module.exports = router;

