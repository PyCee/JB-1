var PATH_WIDTH = 166.0;
var PATH_HEIGHT = PATH_WIDTH * canvas_dimensions.aspect_ratio.multiplier;

var default_view_mult = 0.06;
var boss_view_mult = 12.0 / PATH_WIDTH;
var variable_view_start = 70;
var variable_view_end = 98;
var max_horizontal = 104;
var max_horizontal_achieved = 0.0;

var FOURTH_BOSS_HEALTH = 4;

function path_viewport_update(){
    var horizontal_center = jeron.position.x + jeron.size.x/2;
    
    max_horizontal_achieved = Math.max(max_horizontal_achieved, horizontal_center);
    max_horizontal_achieved = Math.min(max_horizontal_achieved, max_horizontal);

    if(max_horizontal_achieved > variable_view_end){
        horizontal_center = max_horizontal_achieved;
    }

    var view_mult = 1.0;
    if(horizontal_center < variable_view_start){
        view_mult = default_view_mult;
    } else if(horizontal_center > variable_view_end){
        view_mult = boss_view_mult;
    } else {
        var per = (horizontal_center - variable_view_start) /
            (variable_view_end - variable_view_start);
        view_mult = default_view_mult + per * (boss_view_mult - default_view_mult);
    }
    Viewport.size.x = PATH_WIDTH * view_mult;
    Viewport.size.y = PATH_HEIGHT * view_mult;

    
    horizontal_center = Math.min(horizontal_center, PATH_WIDTH - (Viewport.size.x / 2.0));
    horizontal_center = Math.max(horizontal_center, (Viewport.size.x / 2.0));
    
    var offset = new Vector(Viewport.size.x / 2.0 - horizontal_center,
        0.0);

    Viewport.offset.x = offset.x;
    Viewport.offset.y = offset.y + (PATH_HEIGHT * (1.0 - view_mult));
    Viewport.offset = Viewport.offset.scale(canvas.width / curr_scene.inside_dimensions.x);
}
function check_deadly_fall(){
    if(jeron.physics_state.intersects(Path.below_hit_box.physics_state)){
        console.log("fell to death");
    }
}
class Path_Ground extends Actor{
    constructor(position, size){
        super(new Vector(position.x, PATH_HEIGHT - position.y),
            size,
            new Animation("ground", Sprite.grass),
            1, function(){}, -1, [
                new Collision_Box(size,
                    new Vector(0.0, 0.0), [-1])
            ]);
    }
}
class Path_Enemy extends Cow {
    constructor(position, on_death, flip=false){
        super(new Vector(position.x, PATH_HEIGHT-position.y), on_death, flip);
    }
}
class Cloud extends Actor{
    constructor(position){
        super(new Vector(position.x, PATH_HEIGHT - position.y), new Vector(3.0, 1.5),
            new Animation("cloud", Sprite.cloud), 1,
            function(){}, 1, [
                new Collision_Box(new Vector(3.0, 1.5),
                    new Vector(0.0, 0.0), [])
            ]);
        this.physics_state.impulse_momentum(new Vector(-0.05, 0.0));
        this.physics_state.impulse_force(new Vector(0.0, -FORCE_DUE_TO_GRAVITY));
    }
}
var Path = {
    map: new Map(PATH_WIDTH, new Actor(new Vector(0.0, 0.0),
            new Vector(PATH_WIDTH, PATH_HEIGHT),
            new Animation("bg", Sprite.light_blue)), function(){

        Viewport.set_update(path_viewport_update);
        exploration.scene.add_renderable(Path.jump_text);
        exploration.scene.add_renderable(Path.high_jump_text);
        exploration.scene.add_renderable(Path.shoot_text_1);
        exploration.scene.add_renderable(Path.shoot_text_2);

        Path.cake.physics_state.impulse_force(new Vector(0.0, -1.0 * FORCE_DUE_TO_GRAVITY));
    }),
    cloud0: new Cloud(new Vector(5.0, 5.0)),
    cloud1: new Cloud(new Vector(13.0, 4.0)),
    cloud2: new Cloud(new Vector(27.0, 5.8)),
    cloud3: new Cloud(new Vector(39.0, 5.0)),
    cloud4: new Cloud(new Vector(44.0, 5.0)),
    cloud5: new Cloud(new Vector(50.0, 5.0)),
    cloud6: new Cloud(new Vector(58.0, 5.0)),
    cloud7: new Cloud(new Vector(67.0, 5.0)),
    cloud8: new Cloud(new Vector(80.0, 5.0)),
    jump_text: new World_Text(new Vector(4.5, PATH_HEIGHT - 3.0),
                0.4, "Tap \'spacebar\' to jump", "#000000"),
    high_jump_text: new World_Text(new Vector(11.0, PATH_HEIGHT - 5.0),
                0.4, "Hold \'spacebar\' to jump further", "#000000"),
    shoot_text_1: new World_Text(new Vector(19.5, PATH_HEIGHT - 4.0),
                0.4, "Press \'e\' repeatedly", "#000000"),
    shoot_text_2: new World_Text(new Vector(20, PATH_HEIGHT - 3.3),
                0.4, "to hack the cow", "#000000"),
    left_wall: new Path_Ground(new Vector(-1.0, 20.0),
                new Vector(1.0, 20)),
    floor0: new Path_Ground(new Vector(0.0, 0.3),
                new Vector(PATH_WIDTH, 0.3)),
    floor1: new Path_Ground(new Vector(5.0, 0.8), 
                new Vector(2.0, 0.5)),
    floor1_2: new Path_Ground(new Vector(7.5, 1.4), 
                new Vector(2.5, 1.1)),
    floor2: new Path_Ground(new Vector(10.0, 2.0), 
                new Vector(2.0, 2.0)),
    floor3: new Path_Ground(new Vector(15.0, 3.3), 
                new Vector(2.0, 3.0)),
    floor4: new Path_Ground(new Vector(22.0, 0.8),
                new Vector(5.0, 0.5)),
    cow0: new Path_Enemy(new Vector(23.0, 2.4001)),
    floor5: new Path_Ground(new Vector(30.0, 1.9),
                    new Vector(4.9, 0.3)),
    floor6: new Path_Ground(new Vector(38.0, 3.8),
                    new Vector(0.6, 3.5)),
    floor7: new Path_Ground(new Vector(30.0, 5.8),
                    new Vector(0.3, 4.0)),
    floor8: new Path_Ground(new Vector(33.1, 3.8),
                    new Vector(4.9, 0.3)),
    cow1: new Path_Enemy(new Vector(35.0, 1.901)),
    cow2: new Path_Enemy(new Vector(30.3, 3.5), function(){}, true),
    cow3: new Path_Enemy(new Vector(35.0, 5.901)),

    
    ram_hitbox: new Actor(new Vector(43.5, 0.0),
                new Vector(0.1, PATH_HEIGHT),
                new Animation("trigger", Sprite.transparent),
                1, function(){}, -1, [
                    new Collision_Box(new Vector(0.1, PATH_HEIGHT),
                            new Vector(0.0, 0.0), [-1])
                ]),
    ram_event: new Event(function(){
                return jeron.physics_state.intersects(Path.ram_hitbox.physics_state);
            }, function(){
                Path.cow4.physics_state.impulse_momentum(new Vector(-2.0, 0.0));
            }),
    
    stairs0: new Path_Ground(new Vector(44.0, 0.7),
                new Vector(0.75, 0.4)),
    stairs1: new Path_Ground(new Vector(44.75, 1.1),
                new Vector(0.75, 0.8)),
    stairs2: new Path_Ground(new Vector(45.5, 1.5),
                new Vector(0.75, 1.2)),
    stairs3: new Path_Ground(new Vector(46.25, 1.9),
                new Vector(0.75, 1.6)),
    stairs4: new Path_Ground(new Vector(47.0, 2.3),
                new Vector(0.75, 2.0)),
    stairs5: new Path_Ground(new Vector(47.75, 2.7),
                new Vector(0.75, 2.4)),
    stairs6: new Path_Ground(new Vector(48.5, 3.1),
                new Vector(4.0, 2.8)),
    cow4: new Path_Enemy(new Vector(49.0, 4.7001)),

    
    pillar0: new Path_Ground(new Vector(52.5, 1.7),
                new Vector(1.0, 1.4)),
    pillar1: new Path_Ground(new Vector(55.0, 3.4),
                new Vector(1.0, 1.4)),
    pillar2: new Path_Ground(new Vector(60.0, 3.1),
                new Vector(1.0, 1.6)),
    pillar3: new Path_Ground(new Vector(64.0, 3.0),
                new Vector(1.0, 1.5)),
    pillar4: new Path_Ground(new Vector(66.0, 3.6),
                new Vector(1.0, 1.7)),
                
    stairs7: new Path_Ground(new Vector(70.0, 3.1),
            new Vector(2.0, 2.8)),
    stairs8: new Path_Ground(new Vector(72.0, 2.9),
            new Vector(2.0, 2.6)),
    stairs9: new Path_Ground(new Vector(74.0, 2.7),
            new Vector(2.0, 2.4)),
    stairs10: new Path_Ground(new Vector(76.0, 2.5),
            new Vector(2.0, 2.2)),
    stairs11: new Path_Ground(new Vector(78.0, 2.3),
            new Vector(2.0, 2.0)),
    stairs12: new Path_Ground(new Vector(80.0, 2.1),
            new Vector(2.0, 1.8)),
    stairs13: new Path_Ground(new Vector(82.0, 1.9),
            new Vector(2.0, 1.6)),
    stairs14: new Path_Ground(new Vector(84.0, 1.7),
            new Vector(2.0, 1.4)),
    stairs15: new Path_Ground(new Vector(86.0, 1.5),
            new Vector(2.0, 1.2)),
    stairs16: new Path_Ground(new Vector(88.0, 1.3),
            new Vector(2.0, 1.0)),
    stairs17: new Path_Ground(new Vector(90.0, 1.1),
            new Vector(2.0, 0.8)),
    stairs18: new Path_Ground(new Vector(92.0, 0.9),
            new Vector(2.0, 0.6)),
    stairs19: new Path_Ground(new Vector(94.0, 0.7),
            new Vector(2.0, 0.4)),

    falling_cow_hitbox: new Actor(new Vector(82.0, 0.0),
                new Vector(0.1, PATH_HEIGHT),
                new Animation("trigger", Sprite.transparent),
                1, function(){}, -1, [
                    new Collision_Box(new Vector(0.1, PATH_HEIGHT),
                        new Vector(0.0, 0.0), [-1])
                ]),
    falling_cow: new Path_Enemy(new Vector(87.0, 10.0)),
    falling_cow_event: new Event(function(){
        return jeron.physics_state.intersects(Path.falling_cow_hitbox.physics_state);
    }, function(){
        exploration.map.add_actor(Path.falling_cow);
        exploration.scene.add_renderable(Path.falling_cow);
        Path.falling_cow.impulse_momentum(new Vector(-1.0, 0.0))
    }),
    
    lower_plat: new Actor(new Vector(100.0, PATH_HEIGHT - 1.9),
		    new Vector(7, 0.3),
		    new Animation("ground", Sprite.black), 1,
		    function(){}, -1, [
			new Collision_Box(new Vector(7, 0.3),
					    new Vector(0.0, 0.0), [-1])
            ]),
    secondary_plat: new Actor(new Vector(101.0, PATH_HEIGHT - 3.5),
		    new Vector(6, 0.3),
		    new Animation("ground", Sprite.black), 1,
		    function(){}, -1, [
			new Collision_Box(new Vector(6, 0.3),
					    new Vector(0.0, 0.0), [-1])
            ]),
    upper_plat: new Actor(new Vector(102.0, PATH_HEIGHT - 5.1),
            new Vector(5, 0.3),
            new Animation("ground", Sprite.black), 1,
            function(){}, -1, [
            new Collision_Box(new Vector(5, 0.3),
                        new Vector(0.0, 0.0), [-1])
            ]),
    tmp_lower_plat: new Actor(new Vector(107.0, PATH_HEIGHT - 1.9),
            new Vector(3.0, 0.3),
            new Animation("ground", Sprite.black),
            1, function(){}, -1, [
                new Collision_Box(new Vector(3.0, 0.3),
                    new Vector(0.0, 0.0), [-1])
            ]),
    tmp_secondary_plat: new Actor(new Vector(107.0, PATH_HEIGHT - 3.5),
            new Vector(3.0, 0.3),
            new Animation("ground", Sprite.black),
            1, function(){}, -1, [
                new Collision_Box(new Vector(3.0, 0.3),
                    new Vector(0.0, 0.0), [-1])
            ]),
    tmp_upper_plat: new Actor(new Vector(107.0, PATH_HEIGHT - 5.1),
            new Vector(3.0, 0.3),
            new Animation("ground", Sprite.black),
            1, function(){}, -1, [
                new Collision_Box(new Vector(3.0, 0.3),
                    new Vector(0.0, 0.0), [-1])
            ]),
    tmp_back_wall: new Actor(new Vector(110.0, PATH_HEIGHT - 15.1),
            new Vector(0.3, 14.8),
            new Animation("ground", Sprite.black),
            1, function(){}, -1, [
                new Collision_Box(new Vector(0.3, 14.8),
                    new Vector(0.0, 0.0), [-1])
            ]),
    boss_fight_setup_timeline: new Timeline(false),
    damage_boss: function(){
        Path.boss_health--;
    },
    pillar_cow: [],
    pillar_cow_health: 100,
    update_boss_state: function(state){
        var new_cow = null;
        if(state==0){
            new_cow = new Small_Cow(new Vector(103.0, PATH_HEIGHT - 6.4),
                    function(){Path.update_boss_state(1);});
        } else if(state==1){
            new_cow = new Small_Cow(new Vector(106.0, PATH_HEIGHT - 4.8),
                    function(){Path.update_boss_state(2);});
        } else if(state==2){
            new_cow = new Small_Cow(new Vector(106.0, PATH_HEIGHT - 1.6),
                    function(){Path.update_boss_state(3);});
        } else {
            Path.tmp_lower_plat.physics_state.mass = 1;
            Path.tmp_lower_plat.physics_state.collision_boxes = [];
            Path.tmp_secondary_plat.physics_state.mass = 1;
            Path.tmp_secondary_plat.physics_state.collision_boxes = [];
            Path.tmp_upper_plat.physics_state.mass = 1;
            Path.tmp_upper_plat.physics_state.collision_boxes = [];

            exploration.scene.add_renderable(Path.boss_healthbar);
            Path.boss_fight_setup_timeline.add_event(1.0, function(){
                Path.pillar_cow[0] = new Cow(new Vector(107.0, PATH_HEIGHT - 1.90001),
                        Path.damage_boss, false, Path.pillar_cow_health);
                Path.pillar_cow[1] = new Cow(new Vector(107.0, PATH_HEIGHT - 3.50002),
                        Path.damage_boss, false, Path.pillar_cow_health);
                Path.pillar_cow[2] = new Cow(new Vector(107.0, PATH_HEIGHT - 5.10003),
                        Path.damage_boss, false, Path.pillar_cow_health);
                Path.pillar_cow[3] = new Cow(new Vector(107.0, PATH_HEIGHT - 6.70004),
                        Path.damage_boss, false, Path.pillar_cow_health);
                exploration.map.add_actor(Path.pillar_cow[0]);
                exploration.scene.add_renderable(Path.pillar_cow[0]);
                exploration.map.add_actor(Path.pillar_cow[1]);
                exploration.scene.add_renderable(Path.pillar_cow[1]);
                exploration.map.add_actor(Path.pillar_cow[2]);
                exploration.scene.add_renderable(Path.pillar_cow[2]);
                exploration.map.add_actor(Path.pillar_cow[3]);
                exploration.scene.add_renderable(Path.pillar_cow[3]);

                Path.boss_timeline.start();

                Path.boss_timeline.add_event(5.0, function(){
                    Path.pillar_cow[1].spawn_lightning()});
                Path.boss_timeline.add_event(5.0, function(){
                    Path.pillar_cow[2].spawn_lightning()});
                Path.boss_timeline.add_event(5.0, function(){
                    Path.pillar_cow[3].spawn_lightning()});

                Path.boss_timeline.add_event(15.0, function(){
                    Path.pillar_cow[0].spawn_lightning()});
                Path.boss_timeline.add_event(15.0, function(){
                    Path.pillar_cow[2].spawn_lightning()});
                Path.boss_timeline.add_event(15.0, function(){
                    Path.pillar_cow[3].spawn_lightning()});

                Path.boss_timeline.add_event(25.0, function(){
                    Path.pillar_cow[0].spawn_lightning()});
                Path.boss_timeline.add_event(25.0, function(){
                    Path.pillar_cow[1].spawn_lightning()});
                Path.boss_timeline.add_event(25.0, function(){
                    Path.pillar_cow[3].spawn_lightning()});

                Path.boss_timeline.add_event(35.0, function(){
                    Path.pillar_cow[0].spawn_lightning()});
                Path.boss_timeline.add_event(35.0, function(){
                    Path.pillar_cow[1].spawn_lightning()});

                Path.boss_timeline.add_event(45.0, function(){
                    Path.pillar_cow[2].spawn_lightning()});
                Path.boss_timeline.add_event(45.0, function(){
                    Path.pillar_cow[3].spawn_lightning()});

                Path.boss_timeline.add_event(55.0, function(){
                    Path.pillar_cow[1].spawn_lightning()});
                Path.boss_timeline.add_event(55.0, function(){
                    Path.pillar_cow[2].spawn_lightning()});

                Path.boss_timeline.add_event(65.0, function(){
                    Path.pillar_cow[0].spawn_lightning()});
                Path.boss_timeline.add_event(65.0, function(){
                    Path.pillar_cow[3].spawn_lightning()});

                for(var i = 0; i < 70; ++i){
                    Path.boss_timeline.add_event(i, function(){
                        var total_health = Path.pillar_cow[0].health + Path.pillar_cow[1].health
                            + Path.pillar_cow[2].health + Path.pillar_cow[3].health;
                        var progress = total_health / (Path.pillar_cow_health*4);
                        Path.boss_healthbar.set_progress(progress);
                    });
                }

                Path.boss_timeline.add_event(70.0,
                    function(){Path.boss_timeline.reset()});
            });
            Path.boss_fight_setup_timeline.start();
        }
        if(new_cow != null){
            exploration.map.add_actor(new_cow);
            exploration.scene.add_renderable(new_cow);
        }
    },
    beginning_cow: new Small_Cow(new Vector(105.0, PATH_HEIGHT - 3.2),
            function(){Path.update_boss_state(0);}),
    boss_health: 4,
    boss_timeline: new Timeline(false),
    boss_healthbar: new Progress_Bar(new Vector(99.0, 87.0),
        new Vector(2.0, 0.3), new Animation("front health bar", Sprite.green),
        new Animation("back health bar", Sprite.red),
        1.0, 1.0),
    boss_defeated: new Event(function(){
        return Path.boss_health <= 0;
    }, function(){
        Path.cake.physics_state.impulse_force(new Vector(0.0, 0.25 * FORCE_DUE_TO_GRAVITY));
    }),
    eat_cake_event: new Event(function(){
        return jeron.physics_state.intersects(Path.cake.physics_state);
    }, function(){
        Path.boss_healthbar.animation.hide();
        Path.boss_healthbar.back_animation.hide();
        var ending_timeline = new Timeline();
        ending_timeline.add_event(3, function(){
            Stage.end = true;
            Stage.map.set(new Vector(2.0, STAGE_HEIGHT - 1.0001))
        });
    }),
    cake: new Actor(new Vector(107.5, PATH_HEIGHT - 10.0),
        new Vector(0.9, 0.9), new Animation("cake", Sprite.cake),
        1, function(){}, 1, [new Collision_Box(new Vector(0.9, 0.9),
            new Vector(0.0, 0.0), [1])]),
};

Path.map.set_actors([
    Path.cloud0,
    Path.cloud1,
    Path.cloud2,
    Path.cloud3,
    Path.cloud4,
    Path.cloud5,
    Path.cloud6,
    Path.cloud7,
    Path.cloud8,
    jeron,
    Path.left_wall,
    Path.floor0,
    Path.floor1,
    Path.floor1_2,
    Path.floor2,
    Path.floor3,
    Path.floor4,
    Path.floor5,
    Path.cow0,
    Path.floor6,
    Path.floor7,
    Path.floor8,
    Path.cow1,
    Path.cow2,
    Path.cow3,
    Path.stairs0,
    Path.stairs1,
    Path.stairs2,
    Path.stairs3,
    Path.stairs4,
    Path.stairs5,
    Path.stairs6,
    Path.cow4,
    Path.pillar0,
    Path.pillar1,
    Path.pillar2,
    Path.pillar3,
    Path.pillar4,
    Path.stairs7,
    Path.stairs8,
    Path.stairs9,
    Path.stairs10,
    Path.stairs11,
    Path.stairs12,
    Path.stairs13,
    Path.stairs14,
    Path.stairs15,
    Path.stairs16,
    Path.stairs17,
    Path.stairs18,
    Path.stairs19,
    Path.lower_plat,
    Path.secondary_plat,
    Path.upper_plat,
    Path.tmp_lower_plat,
    Path.tmp_secondary_plat,
    Path.tmp_upper_plat,
    Path.tmp_back_wall,
    Path.beginning_cow,
    Path.cake
]);
Path.map.set_events([
    Path.falling_cow_event,
    Path.ram_event,
    Path.boss_defeated,
    Path.eat_cake_event
]);