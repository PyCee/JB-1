var lightning_list = [];

class Lightning extends Actor {
    constructor(position){
        super(position, new Vector(2.0, 1.0),
            new Animation("lightning", Sprite.lightning),
            1, function(){}, 1, [
                new Collision_Box(new Vector(2.0, 1.0),
                    new Vector(0.0, 0.0), [])
            ]);
        lightning_list.push(this);
        this.life_timeline = new Timeline();
        //this.life_timeline.add_event();
        //this.physics_state.impulse_momentum(new Vector(-1.0, 0.0));
        this.physics_state.impulse_force(new Vector(-0.4, -FORCE_DUE_TO_GRAVITY));
    }
}