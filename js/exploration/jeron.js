var jeron_hit_state = false;
var default_hit_knockback = new Vector(-2.5, -1.7);
var inside_cow = false;
var inside_lightning = false;

function cow_land_callback (knockback){
    return function(){
        jeron_hit_state = false;
        jeron.physics_state.impulse_momentum(knockback);
    }
}

function Jeron_Update(){
    var index = 0;
    for(index = 0; index < cow_list.length; ++index){
        if(jeron.physics_state.intersects(cow_list[index].physics_state) &&
            jeron_hit_state == false){
            jeron_hit_state = true;
            if(inside_cow == false){
                inside_cow = true;
                jeron.take_damage(1);
            }

            var hit_knockback = default_hit_knockback.clone();
            if(cow_list[index].flip == true){
                hit_knockback.x *= -1.0;
            }
            jeron.physics_state.impulse_momentum(hit_knockback);
            jeron.physics_state.add_land_callback(
                cow_land_callback(new Vector(hit_knockback.x * -1.0, 0.0))
            );
            break;
        }
    }
    for(index = 0; index < cow_list.length; ++index){
        if(jeron.physics_state.intersects(cow_list[index].physics_state)){
            break;
        }
    }
    if(index == cow_list.length && inside_cow == true){
        inside_cow = false;
    }
    for(var i = 0; i < lightning_list.length; ++i){
        if(jeron.physics_state.intersects(lightning_list[i].physics_state) &&
            jeron_hit_state == false){
            jeron_hit_state = true;
            if(inside_lightning == false){
                inside_lightning = true;
                jeron.take_damage(3);
            }
            var hit_knockback = default_hit_knockback.clone();
            hit_knockback = hit_knockback.add(new Vector(-1.5, 0.0));
            jeron.physics_state.impulse_momentum(hit_knockback);
            jeron.physics_state.add_land_callback(
                cow_land_callback(new Vector(hit_knockback.x * -1.0, 0.0))
            );
        }
    }
    for(index = 0; index < lightning_list.length; ++index){
        if(jeron.physics_state.intersects(lightning_list[index].physics_state)){
            break;
        }
    }
    if(index == lightning_list.length && inside_lightning == true){
        inside_lightning = false;
    }
}
class Jeron extends Actor {
    constructor(position){
        super(position, new Vector(0.25, 1.0),
            new Animation("jeron", Sprite.jeron), 1,
            function(delta_s){}, 1, [
                new Collision_Box(new Vector(0.25, 1.0),
                        new Vector(0.0, 0.0), [0])
            ]);
        this.binary_write_break = 0.01;
        this.binary_write_timer = new Timeline(true, this.binary_write_break);
        this.set_ai(Jeron_Update);
        this.health = 15;
        this.flipped = false;
    }
    flip(reverse=true){
        this.flipped = reverse;
        this.animation.set_flip(this.flipped);
    }
    write_binary () {
        if(this.binary_write_timer.get_elapsed_time() >= this.binary_write_break){
            var bit_offset = null;
            var bit_momentum = new Vector(3.0, 0.0);
            if(this.flipped){
                bit_offset = new Vector(-0.35, 0.0)
                bit_momentum.x *= -1.0;
            } else {
                bit_offset = new Vector(0.3, 0.0)
            }
            var bit = new Bit(this.position.add(bit_offset));
            bit.impulse_momentum(bit_momentum);
            exploration.map.add_actor(bit);
            exploration.scene.add_renderable(bit);
            this.binary_write_timer.reset()
        }
    }
    take_damage(damage){
        console.log("take dmg");
        this.health -= damage;
        if(this.health <= 0){
            // Jeron has died
            this.health = 0;
            console.log("jeron died");
        }
    }
}