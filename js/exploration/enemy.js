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
                this.die();
            }
        }
        die(){}
}
cow_list = [];
class Cow extends Enemy {
    constructor(position, on_death=function(){}, reverse=false, health=4){
        super(position, new Vector(3.0, 1.6),
            new Animation("Cow", Sprite.cow), 1,
            function(){}, 1, [
                new Collision_Box(new Vector(3.0, 1.6),
                    new Vector(0.0, 0.0), [1])
            ], health);
        cow_list.push(this);
        this.on_d = on_death;
        this.flip = reverse;
        this.animation.set_flip(this.flip);
    }
    die(){
        var i = cow_list.indexOf(this);
        cow_list.splice(i, 1);
        this.on_d();
    }
    spawn_lightning(){
        if(this.health > 0){
            var light = new Lightning(this.position.add(new Vector(-0.5, 0.5)));
            exploration.map.add_actor(light);
            exploration.scene.add_renderable(light);
        }
    }
}
class Small_Cow extends Enemy {
    constructor(position, on_death=function(){}, reverse=false){
        super(position, new Vector(2.7, 1.3),
            new Animation("Cow", Sprite.cow), 1,
            function(){}, 1, [
                new Collision_Box(new Vector(2.7, 1.3),
                    new Vector(0.0, 0.0), [1])
            ], 3);
        cow_list.push(this);
        this.on_d = on_death;
        this.flip = reverse;
        this.animation.set_flip(this.flip);
    }
    die(){
        var i = cow_list.indexOf(this);
        cow_list.splice(i, 1);
        this.on_d();
    }
}