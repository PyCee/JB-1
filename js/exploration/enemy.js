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
            }
        }
}