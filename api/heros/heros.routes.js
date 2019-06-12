var Heros = require('./heros.controller');



/**
 * @swagger
 * /hero/update/:id:
 *   put:
 *     tags:
 *       - Hero
 *     description: Update specific hero detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Update hero
 */

module.exports = function (router) {
    /**
     * @swagger
     * /hero/create:
     *   post:
     *     tags:
     *       - hero
     *     description: create hero
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: hero name
     *         description: hero description
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: get hero id
     */
    router.post('/hero/create', Heros.createHero);
    router.get('/hero/get', Heros.getHeros);
    router.get('/hero/get/:name', Heros.getHero);
    router.put('/hero/update/:id', Heros.updateHero);
}