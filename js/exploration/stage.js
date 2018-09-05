var STAGE_WIDTH = 7.0;
var STAGE_HEIGHT = STAGE_WIDTH * canvas_dimensions.aspect_ratio.multiplier;
function stage_viewport_update(){
    Viewport.size.x = STAGE_WIDTH;
    Viewport.size.y = STAGE_HEIGHT;
    Viewport.offset = new Vector(0.0, 0.0);
}

class Stage_Ground extends Actor{
    constructor(position, size){
        super(new Vector(position.x, STAGE_HEIGHT - position.y),
            size,
            new Animation("ground", Sprite.transparent),
            1, function(){}, -1, [
                new Collision_Box(size,
                    new Vector(0.0, 0.0), [-1])
            ]);
    }
}
class Text_Box extends Actor {
    constructor(position, size){
        super(new Vector(position.x, STAGE_HEIGHT - position.y),
            size, new Animation("textbox", Sprite.text_box));
    }
}
var Stage = {
    map: new Map(STAGE_WIDTH, new Actor(new Vector(0.0, 0.0),
            new Vector(STAGE_WIDTH, STAGE_HEIGHT),
            new Animation("bg", Sprite.stage)), function(){

        Viewport.set_update(stage_viewport_update);

        Stage.cow.physics_state.collision_boxes = [];

        exploration.scene.add_renderable(Stage.gwen_text);
        exploration.scene.add_renderable(Stage.gwen_text_box);
        exploration.scene.add_renderable(Stage.gabe_text);
        exploration.scene.add_renderable(Stage.gabe_text_box);
        Stage.gabe_text_box.draw_priority = 3;
        exploration.scene.add_renderable(Stage.denise_text);
        exploration.scene.add_renderable(Stage.denise_text_box);
        exploration.scene.add_renderable(Stage.julia_text);
        exploration.scene.add_renderable(Stage.julia_text_box);
        exploration.scene.add_renderable(Stage.doug_text);
        exploration.scene.add_renderable(Stage.doug_text_box);

        exploration.scene.add_renderable(Stage.end_text_box);
        exploration.scene.add_renderable(Stage.end_text);
        exploration.scene.add_renderable(Stage.final_end_text);

        Stage.gwen_text.hide();
        Stage.gwen_text_box.hide();
        Stage.gabe_text.hide();
        Stage.gabe_text_box.hide();
        Stage.denise_text.hide();
        Stage.denise_text_box.hide();
        Stage.julia_text.hide();
        Stage.julia_text_box.hide();
        Stage.doug_text.hide();
        Stage.doug_text_box.hide();

        Stage.end_text_box.hide();
        Stage.end_text.hide();
        Stage.final_end_text.hide();

        if(Stage.end){
            ending_seq.start();
        } else {
            birthday_seq.start();
            Stage.cake.physics_state.impulse_force(new Vector(0.0, -1.0 * FORCE_DUE_TO_GRAVITY));
            Stage.cow.physics_state.impulse_force(new Vector(0.0, -1.0 * FORCE_DUE_TO_GRAVITY));
        }
    }),
    end: false,
    ground: new Stage_Ground(new Vector(0.0, 0.0),
            new Vector(STAGE_WIDTH, 0.3)),
    cake: new Actor(new Vector(2.85, STAGE_HEIGHT - 2.0),
            new Vector(0.9, 0.9), new Animation("cake", Sprite.cake),
            1, function(){}, 1, []),
    cow: new Cow(new Vector(-3.0, STAGE_HEIGHT - 1.6), function(){}, true, 200),
    left_wall: new Stage_Ground(new Vector(-1.0, 20.0),
            new Vector(1.0, 20.0)),
    right_wall: new Stage_Ground(new Vector(STAGE_WIDTH, 20.0),
            new Vector(1.0, 20.0)),
    exit_hitbox: new Actor(new Vector(STAGE_WIDTH - 1.0, 0.0),
                new Vector(1.0, STAGE_HEIGHT),
                new Animation("trigger", Sprite.transparent),
                1, function(){}, -1, [
                    new Collision_Box(new Vector(0.1, STAGE_HEIGHT),
                        new Vector(0.0, 0.0), [-1])
                ]),
    exit_event: new Event(function(){
        return jeron.physics_state.intersects(Stage.exit_hitbox.physics_state);
    }, function(){
        Stage.doug_text.hide();
        Stage.doug_text_box.hide();
        Path.map.set(new Vector(1.0, PATH_HEIGHT - 1.30001));
    }),

    gwen_text_box: new Text_Box(new Vector(3.4, 3.0),
        new Vector(3.5, 1.5)),
    gabe_text_box: new Text_Box(new Vector(3.1, 3.1),
        new Vector(3.0, 1.5)),
    denise_text_box: new Text_Box(new Vector(0.6, 2.9),
        new Vector(4.5, 1.3)),
    julia_text_box: new Text_Box(new Vector(4.5, 2.5),
        new Vector(2.0, 1.0)),
    doug_text_box: new Text_Box(new Vector(0.15, 2.9),
        new Vector(4.5, 1.3)),

    gwen_text: new World_Text(new Vector(3.6, STAGE_HEIGHT - 2.75),
        0.25, "Happy Birthday Jeron!", "#000000", 2),
    gabe_text: new World_Text(new Vector(3.45, STAGE_HEIGHT - 3.0),
        0.65, "JERON!", "#000000", 4),
    denise_text: new World_Text(new Vector(0.85, STAGE_HEIGHT - 2.65),
        0.21, "Jeron, that cow stole your cake!", "#000000", 2),
    julia_text: new World_Text(new Vector(4.63, STAGE_HEIGHT - 2.37),
        0.3, "Go get it!", "#000000", 2),
    doug_text: new World_Text(new Vector(0.35, STAGE_HEIGHT - 2.65),
        0.21, "Move using the 'a' and 'd' keys!", "#000000", 2),

    end_text_box: new Text_Box(new Vector(1.3, 3.5),
        new Vector(4.5, 1.3)),

    end_text: new World_Text(new Vector(1.7, STAGE_HEIGHT - 2.95),
        0.21, "Happy birthday to you...", "#000000", 2),
    final_end_text: new World_Text(new Vector(1.7, STAGE_HEIGHT - 2.4),
        0.15, "(the game is over)", "#000000", 2)
};

var birthday_seq = new Sequence();
birthday_seq.add_event(0.0, disable_controls);
birthday_seq.add_event(1.0, function(){
    Stage.gwen_text_box.show();
    Stage.gwen_text.show();
});
birthday_seq.add_event(3.0, function(){
    Stage.gabe_text_box.show();
    Stage.gabe_text.show();
});
birthday_seq.add_event(5.0, function(){
    Stage.gwen_text_box.hide();
    Stage.gwen_text.hide();
});
birthday_seq.add_event(6.0, function(){
    Stage.gabe_text_box.hide();
    Stage.gabe_text.hide();
});
var cow_movement = new Vector(3.0, 0.0);
birthday_seq.add_event(4.0, function(){
    Stage.cow.physics_state.impulse_momentum(cow_movement);
});
birthday_seq.add_event(5.2, function(){
    Stage.cake.physics_state.impulse_momentum(cow_movement.scale(1.0));
});
birthday_seq.add_event(8.0, function(){
    Stage.cake.physics_state.impulse_momentum(cow_movement.scale(-1.0));
    Stage.cow.physics_state.impulse_momentum(cow_movement.scale(-1.0));
});
birthday_seq.add_event(8.0, function(){
    Stage.denise_text_box.show();
    Stage.denise_text.show();
});
birthday_seq.add_event(11.0, function(){
    Stage.denise_text_box.hide();
    Stage.denise_text.hide();
});
birthday_seq.add_event(12.0, function(){
    Stage.julia_text_box.show();
    Stage.julia_text.show();
});
birthday_seq.add_event(15.0, function(){
    Stage.julia_text_box.hide();
    Stage.julia_text.hide();
});
birthday_seq.add_event(15.0, enable_controls);

birthday_seq.add_event(16.0, function(){
    Stage.doug_text_box.show();
    Stage.doug_text.show();
});

Stage.end_text_box.animation.spritemap = Sprite.white;
var ending_seq = new Sequence();
ending_seq.add_event(0.0, function(){
    disable_controls();
    Stage.cake.physics_state.set_absolute_position(new Vector(2.85, STAGE_HEIGHT - 2.0));
    Stage.end_text_box.show();
    Stage.end_text.show();
});
ending_seq.add_event(2.5, function(){
    Stage.end_text.font_height *= 1.2;
    Stage.end_text.text = "Happy birthday to YOU...";
});
ending_seq.add_event(5.5, function(){
    Stage.end_text.text = "Happy birthday dear Jeron~";
});
ending_seq.add_event(9.0, function(){
    Stage.end_text.text = "Happy birthday to you.";
});
ending_seq.add_event(14.0, function(){
    Stage.final_end_text.show();
});


Stage.map.set_actors([
    jeron,
    Stage.ground,
    Stage.cake,
    Stage.cow,
    Stage.left_wall,
    Stage.right_wall
]);
Stage.map.set_events([
    Stage.exit_event
]);