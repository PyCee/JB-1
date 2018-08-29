TUTORIAL_WIDTH = 1.0
TUTORIAL_HEIGHT = TUTORIAL_WIDTH * canvas_dimensions.aspect_ratio.multiplier;

function tutorial_viewport_update() {
    Viewport.size.x = TUTORIAL_WIDTH;
    Viewport.size.y = TUTORIAL_HEIGHT;

    Viewport.offset.x = 0.0;
    Viewport.offset.y = 0.0;
}

var Tutorial = {
    map: new Map(1.0, null, function(){
	Viewport.set_update(tutorial_viewport_update);
    }),
    floor: new Actor(new Vector(0.0, TUTORIAL_HEIGHT - 0.1),
		     new Vector(TUTORIAL_WIDTH, 0.1),
		     new Animation("ground", Sprite.black), 1,
		     function(){}, -1, [
			 new Collision_Box(new Vector(TUTORIAL_WIDTH, 0.1),
					     new Vector(0.0, 0.0), [1])
		     ])
};

Tutorial.map.set_actors([
    Jeron,
    Tutorial.floor
]);
