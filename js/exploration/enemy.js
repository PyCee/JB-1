class Enemy extends Actor {
    constructor(position, size, animation, draw_priority=1,
        ai_update=function(delta_s){}, mass=-1, collision_boxes=[],
        health=0){
            super(position, size, animation, draw_priority,
                ai_update, mass, collision_boxes);
            this.max_health = health;
            this.health = health;
        }
        take_damage(damage){
            this.health -= damage;
            if(this.health <= 0){
                this.health = 0;
                exploration.scene.remove_renderable(this);
                exploration.map.remove_actor(this);
                console.log("enemy has died");
            }
        }
}
class G extends Enemy {
    constructor(position){
        super(position, new Vector(1.0, 0.75),
            new Animation("G", Sprite.blue), 1,
            function(){}, 1, [
                new Collision_Box(new Vector(1.0, 0.75),
                    new Vector(0.0, 0.0), [1])
            ], 5);
    }
}