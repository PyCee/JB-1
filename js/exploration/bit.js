var bit_list = [];
var BIT_LIFETIME = 1.0;

function Check_Bits(){
    for(var i = 0; i < bit_list.length; ++i){
        if(bit_list[i].life_timeline.get_elapsed_time() > BIT_LIFETIME){
            exploration.scene.remove_renderable(bit_list[i]);
            exploration.map.remove_actor(bit_list[i]);
            bit_list[i] = null;
            continue;
        }
        for(var j = 0; j < exploration.map.actors.length; ++j){
            if(bit_list[i].physics_state.intersects(exploration.map.actors[j].physics_state) &&
                exploration.map.actors[j] instanceof Enemy){
                    exploration.map.actors[j].take_damage(1);
                    exploration.scene.remove_renderable(bit_list[i]);
                    exploration.map.remove_actor(bit_list[i]);
                    bit_list[i] = null;
                    break;
            }
        }
    }
    for(var i = 0; i < bit_list.length; ++i){
        if(bit_list[i] == null){
            bit_list.splice(i, 1);
            i -= 1;
        }
    }
}

class Bit extends Actor {
    constructor(position){
        var bit_sign = Math.floor(Math.random() * 2);
        var possible_sprites = [Sprite.zero, Sprite.one];
        super(position, new Vector(0.3, 0.3),
            new Animation("bit", possible_sprites[bit_sign]), 1,
            function(delta_s){}, 1.0, [
                new Collision_Box(new Vector(0.1, 0.3),
                    new Vector(0.1, 0.0), [])
            ]);
        bit_list.push(this);
        this.impulse_force(new Vector(0.0, -FORCE_DUE_TO_GRAVITY));
        this.life_timeline = new Timeline();
    }
}