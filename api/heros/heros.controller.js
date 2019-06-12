exports.createHero = function (req, res, next) {
    var hero = {
        name: req.body.name,
        description: req.body.description
    };

    console.log('create hero called with : ' + hero);

    res.json( { hero, 'msg':'created'});

}

exports.getHeros = function(req, res, next) {
    
    console.log('get heros called : ');

    var result = [];

    for(let i = 0; i < 10; i++)
    {
        let hero = {};
        hero.name = 'hero ' + i;
        hero.description = 'description ... ' + i;

        result.push(hero);
    }
    

    res.json( result );
}

exports.getHero = function(req, res, next) {
    var name = req.params.name;

    console.log('get hero called with name : ' + name);

    var hero = {};
    hero.name = name;
    hero.description = 'description ... ' + name;

    res.json( hero )

}

exports.updateHero = function(req, res, next) {
    var hero = {
        name: req.body.name,
        description: req.body.description
    }
    console.log('update hero called with : ' + hero);

    res.json(hero);
}
