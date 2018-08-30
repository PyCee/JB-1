var physics_time_accum = 0;


var exploration = {
    // The scene that will be updated for each map
    scene: new Scene("Exploration", 1.0, function(){
	physics_time_accum = 0;
    }, null, function(delta_s){
	// Update all actors
	for(var i = 0; i < exploration.map.actors.length; ++i){
	    exploration.map.actors[i].ai_update(delta_s);
	}
	// Physics
	physics_time_accum += delta_s;
	while(physics_time_accum >= PHYSICS.UPDATE_DELTA_S){
	    // Step actor physics
	    for(var i = 0; i < exploration.map.actors.length; ++i){
		// Update horizontal positions
		exploration.map.actors[i].physics_state.step_x(PHYSICS.UPDATE_DELTA_S);
	    }
	    for(var i = 0; i < PHYSICS.ITERATIONS; ++i){
		for(var j = 0; j < exploration.map.actors.length; ++j){
		    // Resolve collisions
		    exploration.map.actors[j].resolve_collisions(exploration.map.actors);
		}
	    }
	    for(var i = 0; i < exploration.map.actors.length; ++i){
		// Update vertical positions
		exploration.map.actors[i].physics_state.step_y(PHYSICS.UPDATE_DELTA_S);
	    }
	    for(var i = 0; i < PHYSICS.ITERATIONS; ++i){
		for(var j = 0; j < exploration.map.actors.length; ++j){
		    // Resolve collisions
		    exploration.map.actors[j].resolve_collisions(exploration.map.actors);
		}
	    }
	    
	    physics_time_accum -= PHYSICS.UPDATE_DELTA_S;
	}	
	//TODO: interpolate between the current and the next physics state
	
	for(var i = 0; i < exploration.map.events.length; ++i){
	    exploration.map.events[i].test();
	}
    }),
    set_map: function (map) {
	exploration.map = map;
    },
    
    // Reference to the data that makes up the current map
    map: null
};
var Jeron = new Actor(new Vector(0.0, 0.0), new Vector(0.6, 1.0),
		      new Animation("jeron", Sprite.red), 1,
		      function(){}, 1,
		      collision_boxes=[
			  new Collision_Box(new Vector(0.6, 1.0),
					    new Vector(0.0, 0.0),
					    block_layers=[-1])
		      ]);
var JERON_MOVE_SPEED = 2.0 * Jeron.physics_state.mass;
var JERON_JUMP_POWER = 3.5;
var JERON_JUMP_FORCE = 5.0;

// Add basic control for exploration
exploration.scene.user_input.add_keyboard_event("a", "press", function(){
	Jeron.physics_state.impulse_momentum(new Vector(-1.0 * JERON_MOVE_SPEED, 0.0));
}, true);
exploration.scene.user_input.add_keyboard_event("a", "release", function(){
	Jeron.physics_state.impulse_momentum(new Vector(1.0 * JERON_MOVE_SPEED, 0.0));
});
exploration.scene.user_input.add_keyboard_event("d", "press", function(){
	Jeron.physics_state.impulse_momentum(new Vector(1.0 * JERON_MOVE_SPEED, 0.0));
}, true);
exploration.scene.user_input.add_keyboard_event("d", "release", function(){
	Jeron.physics_state.impulse_momentum(new Vector(-1.0 * JERON_MOVE_SPEED, 0.0));
});
exploration.scene.user_input.add_keyboard_event(" ", "press", function(){
	if(Jeron.physics_state.is_grounded()){
		Jeron.physics_state.impulse_momentum(new Vector(0.0, -1.0 * JERON_JUMP_POWER));
		Jeron.physics_state.impulse_force(new Vector(0.0, -1.0 * JERON_JUMP_FORCE));
	}
});
exploration.scene.user_input.add_keyboard_event(" ", "release", function(){
	Jeron.physics_state.impulse_force(new Vector(0.0, JERON_JUMP_FORCE));
});
