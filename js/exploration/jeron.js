class Jeron extends Actor {
    constructor(position){
        super(position, new Vector(0.6, 1.0),
            new Animation("jeron", Sprite.red), 1,
            function(delta_s){}, 1, [
                new Collision_Box(new Vector(0.6, 1.0),
                        new Vector(0.0, 0.0), [-1])
            ]);
        this.binary_write_break = 0.5;
        this.binary_write_timer = new Timeline(true, this.binary_write_break);
    }
    write_binary () {
        if(this.binary_write_timer.get_elapsed_time() >= this.binary_write_break){
            var bit = new Bit(this.position);
            bit.impulse_momentum(new Vector(2.5, 0.0));
            exploration.map.add_actor(bit);
            exploration.scene.add_renderable(bit);
            this.binary_write_timer.reset()
        }
    }
}