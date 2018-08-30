class Map {
    constructor (width=1.0, background_actor=null, map_callback=function(){},
		 actors=[], events=[]) {
	this.width = width;
	this.map_callback = map_callback;
	// Lists the actors that are apart of the map
	this.actors = actors;
	this.events = events;

	this.background_actor = background_actor;
    }
    set (jeron_start_position=new Vector(0.0, 0.0)) {
	jeron.set_absolute_position(jeron_start_position);
	exploration.scene.inside_width = this.width;

	exploration.scene.background_actor = this.background_actor;
	
	// Reset variables for use in next map
	var tmp_actors = this.actors.slice(0);
	exploration.scene.set_renderables(tmp_actors);
	exploration.set_map(this);
	this.map_callback();
	}
	add_actor (actor) {
		this.actors.push(actor);
	}
	remove_actor (actor) {
		var index = this.actors.indexOf(actor);
		if(index == -1){
			console.log("Map.remove_actor called with invalid actor: " +
				actor);
		} else {
			this.remove_actor_index(index);
		}
	}
	remove_actor_index (index) {
		var tmp_actors = this.actors;
		tmp_actors.splice(index, 1);
		this.set_actors(tmp_actors);
	}
    set_actors (actors) {
		this.actors = actors;
    }
    set_events (events) {
		this.events = events;
    }
}
