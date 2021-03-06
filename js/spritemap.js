class Spritemap {
    constructor (resource_s, cols=1, rows=1) {
	    this.resource = load_resource("img", resource_s);
	    this.resource_s = resource_s;
	    this.cols = cols;
	    this.rows = rows;
    }
    get () {
	    return get_resource[this.resource_s];
    }
    get_sprite_width() {
	    return this.resource.width / this.cols;
    }
    get_sprite_height() {
	    return this.resource.height / this.rows;
    }
}
var Sprite = {
    transparent: new Spritemap("transparent.png"),
    white: new Spritemap("white.png"),
    black: new Spritemap("black.png"),
    red: new Spritemap("red.png"),
    green: new Spritemap("green.png"),
    blue: new Spritemap("blue.png"),
    light_blue: new Spritemap("light_blue.png"),
    arrow: new Spritemap("arrow.png"),
    zero: new Spritemap("zero.png"),
    one: new Spritemap("one.png"),
    jeron: new Spritemap("jeron.png"),
    erik: new Spritemap("erik.png"),
    cow: new Spritemap("cow.png"),
    lightning: new Spritemap("lightning.png"),
    grass: new Spritemap("grass.png"),
    cloud: new Spritemap("cloud.png"),
    stage: new Spritemap("stage.png"),
    erik_stage: new Spritemap("erik_stage.png"),
    cake: new Spritemap("cake.png"),
    text_box: new Spritemap("text_box.png")
    //: new Spritemap(".png")
};
