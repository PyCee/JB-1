TUTORIAL_WIDTH = 12.0
TUTORIAL_HEIGHT = TUTORIAL_WIDTH * canvas_dimensions.aspect_ratio.multiplier;

function tutorial_viewport_update() {
    Viewport.size.x = TUTORIAL_WIDTH;
    Viewport.size.y = TUTORIAL_HEIGHT;

    Viewport.offset.x = 0.0;
    Viewport.offset.y = 0.0;
}

var Tutorial = {
    map: new Map(1.0, new Actor(new Vector(0.0, 0.0),
            new Vector(TUTORIAL_WIDTH, TUTORIAL_HEIGHT),
            new Animation("bg", Sprite.green)), function(){
	Viewport.set_update(tutorial_viewport_update);
    }),
    floor: new Actor(new Vector(0.0, TUTORIAL_HEIGHT - 0.3),
		    new Vector(TUTORIAL_WIDTH, 0.3),
		    new Animation("ground", Sprite.black), 1,
		    function(){}, -1, [
			new Collision_Box(new Vector(TUTORIAL_WIDTH, 0.3),
					    new Vector(0.0, 0.0), [-1])
            ]),
    plat1: new Actor(new Vector(3.0, TUTORIAL_HEIGHT - 1.9),
		    new Vector(6, 0.3),
		    new Animation("ground", Sprite.black), 1,
		    function(){}, -1, [
			new Collision_Box(new Vector(6, 0.3),
					    new Vector(0.0, 0.0), [-1])
            ]),
    plat2: new Actor(new Vector(3.0, TUTORIAL_HEIGHT - 1.7),
		    new Vector(6, 0.3),
		    new Animation("ground", Sprite.black), 1,
		    function(){}, -1, [
			new Collision_Box(new Vector(6, 0.3),
					    new Vector(0.0, 0.0), [-1])
            ]),
    plat3: new Actor(new Vector(3.0, TUTORIAL_HEIGHT - 1.7),
		    new Vector(6, 0.3),
		    new Animation("ground", Sprite.black), 1,
		    function(){}, -1, [
			new Collision_Box(new Vector(6, 0.3),
					    new Vector(0.0, 0.0), [-1])
            ]),
    tut: new G(new Vector(3.0, TUTORIAL_HEIGHT - 3.7))
};

Tutorial.map.set_actors([
    jeron,
    Tutorial.floor,
    Tutorial.plat1,
    Tutorial.tut
]);
