/*
Структура userData:
0: имя объекта
1: жив ли объект
2: разрушиемость
3: 
4:
5: полученный урон (измеряется в переданной скорости)
6: запас ХП
7: длина/(координты?)
8: толщина/радиус
9: тип объекта (птица, свинья, блок)
*/

// переменные
var world;
var world1;
var scale = 30;
// var piggy = undefined;
var piggy = []
var piggy_number = 1;
var world_alive = true;

var death_timer = [];

var glob_x = 200;
var glob_y = 300;

var my_coord_x = 0;
var my_coord_y = 0;
var birds_array = [];
var bird_count = 0;
var mouseDown = 0;
var bird_radius = 10
var max_velocity = 20;
var pig_rad = 1;
var sling_x = 200;
var sling_y = 300;
var points = 0;
var max_bird_position = 100;
var proect_velocity_koef = max_bird_position / max_velocity
var sum_pig_death_vel = 0;
var dead_birds = 0;

var pig_health = 60;
var plache_health = 400;
var number_of_birds = 5;
var planche = []
var death_timer_planche = [];
var end_of_world = false;
var window_opened = null;
var level = 3;
var active_image = undefined;
var points_style = "#DD2"
var pig_deaths;
var time_to_end = undefined;
var m_shrink = 0;
var level_move = 0;

var dead_pigs = 0;
var number_of_levels = 3;
var level_images = []
var images = []
var Start_time = undefined;



//console.log(Infinity)
//level bullet

function init() {
	//обнуление переменных
	level_images[0] = level1;
	level_images[1] = level2;
	level_images[2] = level3;
	image1 = level1;
	image2 = level2;
	image3 = level3;
	time_to_end = undefined;
	pig_deaths = 0;
	birds_array = [];
	planche = [];
	death_timer_planche = [];
	piggy = [];
	bird_count = 0;

	// задаем параметры мира
	var b2Vec2 = Box2D.Common.Math.b2Vec2,
		b2BodyDef = Box2D.Dynamics.b2BodyDef,
		b2Body = Box2D.Dynamics.b2Body,
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
		b2Fixture = Box2D.Dynamics.b2Fixture,
		b2World = Box2D.Dynamics.b2World,
		b2MassData =
			Box2D.Collision.Shapes.b2MassData,
		b2PolygonShape =
			Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape =
			Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	var listener = new Box2D.Dynamics.b2ContactListener;

	var before_vel_x = undefined;
	var before_vel_y = undefined;
	var after_vel_x = undefined;
	var after_vel_y = undefined;

	//регистрация столкновение Listener
	listener.BeginContact = function (contact) {

		//    if(contact.GetFixtureA().m_userData[2] == "destroyed"){
		//    	contact.GetFixtureA().m_userData[3] = contact.GetFixtureA().m_body.m_linearVelocity.x;
		//    	contact.GetFixtureA().m_userData[4] = contact.GetFixtureA().m_body.m_linearVelocity.y;
		//    	//console.log(contact.GetFixtureA().m_body)
		//    }
		// if(contact.GetFixtureB().m_userData[2] == "destroyed"){
		//    	contact.GetFixtureB().m_userData[3] = contact.GetFixtureA().m_body.m_linearVelocity.x;
		//    	contact.GetFixtureB().m_userData[4] = contact.GetFixtureA().m_body.m_linearVelocity.y;
		//    }

	}
	listener.EndContact = function (contact) {

		//    var delta_velA = 0;
		// 	var delta_velB = 0;
		//     if(contact.GetFixtureA().m_userData[2] == "destroyed"){
		//     	before_vel_x = contact.GetFixtureA().m_userData[3];
		//     	before_vel_y = contact.GetFixtureA().m_userData[4];
		// 	after_vel_x = contact.GetFixtureA().m_body.m_linearVelocity.x;
		// 	after_vel_y = contact.GetFixtureA().m_body.m_linearVelocity.y;
		// 	delta_velA = contact.GetFixtureA().m_body.m_mass*Math.sqrt((after_vel_x-before_vel_x)**2 + (after_vel_y-before_vel_y)**2)
		// 	contact.GetFixtureA().m_userData[5] += delta_velA;

		//     }
		//     if(contact.GetFixtureB().m_userData[2] == "destroyed"){
		//     	//console.log(contact.GetFixtureB())
		//     	before_vel_x = contact.GetFixtureB().m_userData[3];
		//     	before_vel_y = contact.GetFixtureB().m_userData[4];
		// 	after_vel_x = contact.GetFixtureB().m_body.m_linearVelocity.x;
		// 	after_vel_y = contact.GetFixtureB().m_body.m_linearVelocity.y;
		// 	delta_velB = contact.GetFixtureB().m_body.m_mass*Math.sqrt((after_vel_x-before_vel_x)**2 + (after_vel_y-before_vel_y)**2)
		// //пробуем использовать как характеристику силы изменение импульма птицы
		// 	if(contact.GetFixtureA().m_userData[9] == "bird"){
		// 	contact.GetFixtureB().m_userData[5] += delta_velA;
		// 	}else{
		// 		contact.GetFixtureB().m_userData[5] += delta_velB;
		// 	}
		//     }
		//     if(contact.GetFixtureA().m_userData[2] == "destroyed" && contact.GetFixtureB().m_userData[9]== "bird"){
		//     	contact.GetFixtureA().m_userData[5] += delta_velB;
		//     }else if(contact.GetFixtureB().m_userData[9]!= "bird" ){
		// 	contact.GetFixtureA().m_userData[5] += delta_velA;
		//     }
		//     if(contact.GetFixtureA().m_userData[6] != undefined){
		// 		if(contact.GetFixtureA().m_userData[5] >= contact.GetFixtureA().m_userData[6]){
		// 			 world.DestroyBody(contact.GetFixtureA())
		// 			 //contact.GetFixtureA().m_userData[1] = "dead"
		// 			 contact.GetFixtureA().m_userData[7] = contact.GetFixtureA().m_body.GetPosition()
		// 		}
		// 	}
		// 	if(contact.GetFixtureB().m_userData[6] != undefined){
		// 		if(contact.GetFixtureB().m_userData[5] >= contact.GetFixtureB().m_userData[6]){
		// 			 world.DestroyBody(contact.GetFixtureB())
		// 			 //console.log("DestroyBody")
		// 			 //contact.GetFixtureB().m_userData[1] = "dead"
		// 			 contact.GetFixtureB().m_userData[7] = contact.GetFixtureB().m_body.GetPosition()
		// 		}
		// 	}
		//     if(((contact.GetFixtureB().m_userData[9] == "bird" && contact.GetFixtureA().m_userData[2] == "destroyed")|| (contact.GetFixtureA().m_userData[9] == "bird" && contact.GetFixtureB().m_userData[2] == "destroyed"))) {
		//     	//console.log(contact.GetFixtureA().m_userData[9], contact.GetFixtureB().m_userData[9], delta_velA*contact.GetFixtureA().m_body.m_mass, delta_velB*contact.GetFixtureB().m_body.m_mass)
		//     	//console.log(contact.GetFixtureB().m_userData[9],delta_velB,contact.GetFixtureB().m_body.m_mass)
		//     	//console.log(contact.GetFixtureB().m_body.m_mass)
		//     }

	}

	// определение импульса нормальной составляющей импульса при столкновении (это и есть изменение импульса)
	listener.PostSolve = function (contact, impulse) {
		if (contact.GetFixtureA().m_userData[2] == "destroyed" || contact.GetFixtureB().m_userData[2] == "destroyed") {

			var impulse = impulse.normalImpulses[0];
			if (impulse < 0.5) {
				impulse = 0;
			}


			if (impulse / contact.GetFixtureA().m_body.m_mass < 0.5 || Date.now() - Start_time < 1000) {
				impulse1 = 0;

			} else {
				impulse1 = impulse / contact.GetFixtureA().m_body.m_mass;
				// 	console.log(Date.now()  - Start_time)
			}
			if (impulse / contact.GetFixtureB().m_body.m_mass < 0.5 || Date.now() - Start_time < 1000) {
				impulse2 = 0;


			} else {
				impulse2 = impulse / contact.GetFixtureB().m_body.m_mass;
				//console.log(impulse2)
			}
			//console.log(impulse1, impulse2)


			if (contact.GetFixtureA().m_userData[2] == "destroyed") {
				contact.GetFixtureA().m_userData[5] += impulse1 / contact.GetFixtureA().m_body.m_mass;
			}
			if (contact.GetFixtureB().m_userData[2] == "destroyed") {
				contact.GetFixtureB().m_userData[5] += impulse2 / contact.GetFixtureB().m_body.m_mass;
			}
			if (contact.GetFixtureA().m_userData[5] >= contact.GetFixtureA().m_userData[6]) {
				if (contact.GetFixtureA().m_userData[9] == "pig") {
					contact.GetFixtureA().m_userData[7] = contact.GetFixtureA().m_body.GetPosition()
				}
				world.DestroyBody(contact.GetFixtureA())
				//contact.GetFixtureA().m_userData[1] = "dead"
				contact.GetFixtureA().m_userData[7] = contact.GetFixtureA().m_body.GetPosition()
			}
			if (contact.GetFixtureB().m_userData[5] >= contact.GetFixtureB().m_userData[6]) {
				// условие для запоминания координат смерти свиньи. Надо для координат дыма
				if (contact.GetFixtureB().m_userData[9] == "pig") {
					contact.GetFixtureB().m_userData[7] = contact.GetFixtureB().m_body.GetPosition()
				}
				world.DestroyBody(contact.GetFixtureB())
				//contact.GetFixtureB().m_userData[1] = "dead"
				contact.GetFixtureB().m_userData[7] = contact.GetFixtureB().m_body.GetPosition()
				console.log(contact.GetFixtureB().m_body.m_mass)
			}

			//console.log(impulse1);
		}

	}
	listener.PreSolve = function (contact, oldManifold) {

	}

	// мир и определение зарактеристик

	world = new b2World(
		new b2Vec2(0, 10)    //gravity
		, true                 //allow sleep
	);
	this.world.SetContactListener(listener);

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;      // плотность
	fixDef.friction = 0.8;     // трение
	fixDef.restitution = 0.4;  // упругость

	//fixDef.isSensor = false

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;

	var fixDef_stone = new b2FixtureDef;
	fixDef_stone.density = 1.8;      // плотность
	fixDef_stone.friction = 0.8;     // трение
	fixDef_stone.restitution = 0.1;  // упругость

	//fixDef.isSensor = false

	var bodyDef_stone = new b2BodyDef;
	bodyDef_stone.type = b2Body.b2_dinamicBody;
	bodyDef_stone.userData = "stone"

	var fixDef_ice = new b2FixtureDef;
	fixDef_ice.density = 0.2;      // плотность
	fixDef_ice.friction = 0.01;     // трение
	fixDef_ice.restitution = 0.5;  // упругость

	//fixDef.isSensor = false

	var bodyDef_ice = new b2BodyDef;
	bodyDef_ice.type = b2Body.b2_dinamicBody;
	bodyDef_ice.userData = "ice"

	var fixDef_wood = new b2FixtureDef;
	fixDef_wood.density = 1;      // плотность
	fixDef_wood.friction = 0.4;     // трение
	fixDef_wood.restitution = 0.4;  // упругость

	//fixDef.isSensor = false

	var bodyDef_wood = new b2BodyDef;
	bodyDef_wood.type = b2Body.b2_dinamicBody;
	bodyDef_wood.userData = "wood"

	//create ground
	function ground_object(name, world, bD, fD, x0, y0, a, b) {
		bD.position.x = x0;
		bD.position.y = y0;
		fD.shape = new b2PolygonShape;
		fD.density = 1;
		fD.shape.SetAsBox(a, b);
		var obj = world.CreateBody(bD).CreateFixture(fD);
		obj.m_userData = []
		obj.m_userData[0] = name;
		obj.m_userData[9] = "static"
		return obj;
	}
	ground_object("left_wall", world, bodyDef, fixDef, 0, 0, 1200 / scale, 1 / scale)
	ground_object("ground_wall", world, bodyDef, fixDef, 0, 600 / scale, 1200 / scale, 1 / scale)
	ground_object("right_wall", world, bodyDef, fixDef, 1200 / scale, 0, 1 / scale, 600 / scale)
	//ground_object("top_wall",world, bodyDef,fixDef,0,0,1/scale,600/scale)
	ground_object("static_ground", world, bodyDef, fixDef, 0, 400 / scale, 1200 / scale, 1 / scale)
	ground_object("static_hell", world, bodyDef, fixDef, 0, 1200 / scale, 2400 / scale, 1 / scale)

	//функции создания объектов


	function planc_object(world, bD, fD, x0, y0, length, thickness, angle) {
		bD.type = b2Body.b2_dynamicBody;
		bD.position.x = x0;
		bD.position.y = y0;
		bD.angle = angle;
		fD.shape = new b2PolygonShape;
		//fD.density = 0.2; 
		fD.shape.SetAsBox(length, thickness);
		var obj = world.CreateBody(bD).CreateFixture(fD);
		obj.m_userData = []
		return obj;
	}

	function ball_object(world, bD, fD, x0, y0, rad) {
		bD.type = b2Body.b2_dynamicBody;
		fD.shape = new b2CircleShape(rad);
		fD.density = 0.1;
		bD.position.x = x0;
		bD.position.y = y0;
		bD.angularDamping = 4
		//bD.bullet = true;
		var obj = world.CreateBody(bD).CreateFixture(fD);
		obj.m_userData = []
		return obj;
	}
	function add_userData(planche, i, world, bodyDef, fixDef, x, y, len, thick, angle) {
		planche[i] = planc_object(world, bodyDef, fixDef, x, y, len, thick, angle)
		planche[i].m_userData[0] = "planche" + i
		planche[i].m_userData[1] = "alive"
		planche[i].m_userData[2] = "destroyed"
		planche[i].m_userData[3] = bodyDef.userData;
		planche[i].m_userData[5] = 0
		planche[i].m_userData[6] = plache_health
		planche[i].m_userData[7] = len
		planche[i].m_userData[8] = thick
		planche[i].m_userData[9] = "planche"
	}
	function pig_userData(piggy, i, world, bodyDef, fixDef, x, y, rad) {
		piggy[i] = ball_object(world, bodyDef, fixDef, x, y, rad)
		piggy[i].m_userData[0] = "pig" + i
		piggy[i].m_userData[1] = "alive"
		piggy[i].m_userData[2] = "destroyed"
		piggy[i].m_userData[5] = 0
		piggy[i].m_userData[6] = pig_health
		piggy[i].m_userData[8] = rad
		piggy[i].m_userData[9] = "pig"
	}

	// создание объектов(уровней)
	function level_1() {
		window_opened = "level 1"
		level = 1;
		active_image = background_night;
		//pig_userData(piggy, 0, world, bodyDef,fixDef, 24.5, 286/scale, pig_rad)
		pig_userData(piggy, 0, world, bodyDef, fixDef, 760 / scale, 325 / scale, pig_rad)
		pig_userData(piggy, 1, world, bodyDef, fixDef, 840 / scale, 325 / scale, pig_rad)
		pig_userData(piggy, 2, world, bodyDef, fixDef, 760 / scale, 275 / scale, pig_rad)
		pig_userData(piggy, 3, world, bodyDef, fixDef, 840 / scale, 275 / scale, pig_rad)


		add_userData(planche, 0, world, bodyDef_ice, fixDef_ice, 600 / scale, 391 / scale, 2, 0.3, 0)
		add_userData(planche, 1, world, bodyDef_stone, fixDef_stone, 600 / scale, 352 / scale, 1, 1, 0)
		add_userData(planche, 2, world, bodyDef_stone, fixDef_stone, 800 / scale, 367 / scale, 2, 1.1, 0)
		add_userData(planche, 3, world, bodyDef_stone, fixDef_stone, 800 / scale, 361 / scale, 3, 0.2, 0)
		add_userData(planche, 4, world, bodyDef_stone, fixDef_stone, 800 / scale, 315 / scale, 1.1, 0.5, Math.PI / 2)
		add_userData(planche, 5, world, bodyDef_stone, fixDef_stone, 800 / scale, 309 / scale, 3, 0.2, 0)
		add_userData(planche, 6, world, bodyDef_stone, fixDef_stone, 800 / scale, 260 / scale, 1.1, 0.3, Math.PI / 2)
		add_userData(planche, 7, world, bodyDef_ice, fixDef_ice, 600 / scale, 313 / scale, 2, 0.3, 0)
		add_userData(planche, 8, world, bodyDef_stone, fixDef_stone, 600 / scale, 274 / scale, 1, 1, 0)
		add_userData(planche, 9, world, bodyDef_ice, fixDef_ice, 600 / scale, 235 / scale, 2, 0.3, 0)
		// add_userData(planche, 0, world, bodyDef_stone,fixDef_stone, 24.5,322/scale,2, 0.2, 0)
		// add_userData(planche, 1, world, bodyDef_ice,fixDef_ice, 23,364/scale,1.2, 0.3, Math.PI/2)
		// add_userData(planche, 2, world, bodyDef_ice,fixDef_ice, 26,364/scale,1.2, 0.3, Math.PI/2)
		// add_userData(planche, 3, world, bodyDef,fixDef, 23.4,270/scale,1.6, 0.3, -Math.PI/3)
		// add_userData(planche, 4, world, bodyDef,fixDef, 25.6,270/scale,1.6, 0.3, Math.PI/3)
	}
	function level_2() {
		window_opened = "level 2"
		level = 2;
		active_image = background_forest;
		points_style = "#991"
		pig_userData(piggy, 0, world, bodyDef, fixDef, 888 / scale, 370 / scale, pig_rad)
		pig_userData(piggy, 1, world, bodyDef, fixDef, 742 / scale, 370 / scale, pig_rad)
		pig_userData(piggy, 2, world, bodyDef, fixDef, 815 / scale, 385 / scale, pig_rad / 2)
		pig_userData(piggy, 3, world, bodyDef, fixDef, 815 / scale, 208 / scale, pig_rad)

		//add_userData(planche, 0, world, bodyDef,fixDef, 600/scale, 370/scale,1, 10, Math.PI/2)

		add_userData(planche, 0, world, bodyDef_stone, fixDef_stone, 700 / scale, 364 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 1, world, bodyDef_stone, fixDef_stone, 784 / scale, 364 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 2, world, bodyDef_stone, fixDef_stone, 846 / scale, 364 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 3, world, bodyDef_stone, fixDef_stone, 930 / scale, 364 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 4, world, bodyDef_wood, fixDef_wood, 750 / scale, 322 / scale, 2, 0.2, 0)
		add_userData(planche, 5, world, bodyDef_wood, fixDef_wood, 880 / scale, 322 / scale, 2, 0.2, 0)
		add_userData(planche, 6, world, bodyDef_ice, fixDef_ice, 815 / scale, 280 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 7, world, bodyDef_ice, fixDef_ice, 765 / scale, 280 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 8, world, bodyDef_ice, fixDef_ice, 865 / scale, 280 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 9, world, bodyDef_wood, fixDef_wood, 660 / scale, 360 / scale, 1.5, 0.2, -Math.PI / 3)
		add_userData(planche, 10, world, bodyDef_wood, fixDef_wood, 970 / scale, 360 / scale, 1.5, 0.2, Math.PI / 3)
		add_userData(planche, 11, world, bodyDef_wood, fixDef_wood, 815 / scale, 244 / scale, 3, 0.2, 0)
		add_userData(planche, 12, world, bodyDef_wood, fixDef_wood, 710 / scale, 270 / scale, 1.5, 0.2, -Math.PI / 2.5)
		add_userData(planche, 13, world, bodyDef_wood, fixDef_wood, 920 / scale, 270 / scale, 1.5, 0.2, Math.PI / 2.5)
		add_userData(planche, 14, world, bodyDef_wood, fixDef_wood, 770 / scale, 202 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 15, world, bodyDef_wood, fixDef_wood, 860 / scale, 202 / scale, 1.2, 0.3, Math.PI / 2)
		add_userData(planche, 16, world, bodyDef_wood, fixDef_wood, 815 / scale, 160 / scale, 1.8, 0.2, 0)
		//	add_userData(planche, 17, world, bodyDef_wood,fixDef_wood, 790/scale,110/scale,1.5, 0.2, -Math.PI/2.50106)
		add_userData(planche, 17, world, bodyDef_wood, fixDef_wood, 815 / scale, 148 / scale, 1.5, 0.2, 0)
		add_userData(planche, 18, world, bodyDef_wood, fixDef_wood, 815 / scale, 136 / scale, 0.2, 0.2, 0)
		//add_userData(planche, 20, world, bodyDef,fixDef, 770/scale,152/scale,0.03, 0.03, 0)
		//add_userData(planche, 14, world, bodyDef,fixDef, 24.5,322/scale,2, 0.2, 0)

		// add_userData(planche, 2, world, bodyDef,fixDef, 26,13,1.2, 0.3, Math.PI/2)
		// add_userData(planche, 3, world, bodyDef,fixDef, 23.4,8.9,1.6, 0.3, -Math.PI/3)
		// add_userData(planche, 4, world, bodyDef,fixDef, 25.6,8.9,1.6, 0.3, Math.PI/3)
	}
	function level_3() {
		window_opened = "level 3"
		level = 3;
		active_image = background_sunset;
		pig_userData(piggy, 0, world, bodyDef, fixDef, 730 / scale, (400 - pig_rad) / scale, pig_rad)
		pig_userData(piggy, 1, world, bodyDef, fixDef, 730 / scale, 152 / scale, pig_rad)
		pig_userData(piggy, 2, world, bodyDef, fixDef, 1088 / scale, 334 / scale, pig_rad)

		add_userData(planche, 0, world, bodyDef_stone, fixDef_stone, 600 / scale, 370 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 1, world, bodyDef_stone, fixDef_stone, 660 / scale, 370 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 2, world, bodyDef_wood, fixDef_wood, 600 / scale, 334 / scale, 1, 0.2, 0)
		add_userData(planche, 3, world, bodyDef_wood, fixDef_wood, 660 / scale, 334 / scale, 1, 0.2, 0)
		add_userData(planche, 4, world, bodyDef_wood, fixDef_wood, 630 / scale, 298 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 5, world, bodyDef_wood, fixDef_wood, 570 / scale, 298 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 6, world, bodyDef_wood, fixDef_wood, 690 / scale, 298 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 7, world, bodyDef_wood, fixDef_wood, 600 / scale, 262 / scale, 1, 0.2, 0)
		add_userData(planche, 8, world, bodyDef_wood, fixDef_wood, 660 / scale, 262 / scale, 1, 0.2, 0)
		add_userData(planche, 9, world, bodyDef_wood, fixDef_wood, 660 / scale, 224 / scale, 1, 0.2, Math.PI / 2)

		add_userData(planche, 10, world, bodyDef_stone, fixDef_stone, 800 / scale, 370 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 11, world, bodyDef_stone, fixDef_stone, 860 / scale, 370 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 12, world, bodyDef_wood, fixDef_wood, 800 / scale, 334 / scale, 1, 0.2, 0)
		add_userData(planche, 13, world, bodyDef_wood, fixDef_wood, 860 / scale, 334 / scale, 1, 0.2, 0)
		add_userData(planche, 14, world, bodyDef_wood, fixDef_wood, 830 / scale, 298 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 15, world, bodyDef_wood, fixDef_wood, 770 / scale, 298 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 16, world, bodyDef_wood, fixDef_wood, 890 / scale, 298 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 17, world, bodyDef_wood, fixDef_wood, 800 / scale, 262 / scale, 1, 0.2, 0)
		add_userData(planche, 18, world, bodyDef_wood, fixDef_wood, 860 / scale, 262 / scale, 1, 0.2, 0)
		add_userData(planche, 19, world, bodyDef_wood, fixDef_wood, 800 / scale, 224 / scale, 1, 0.2, Math.PI / 2)

		add_userData(planche, 20, world, bodyDef_wood, fixDef_wood, 730 / scale, 188 / scale, 2.6, 0.2, 0)

		add_userData(planche, 21, world, bodyDef_wood, fixDef_wood, 680 / scale, 152 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 22, world, bodyDef_wood, fixDef_wood, 780 / scale, 152 / scale, 1, 0.2, Math.PI / 2)

		add_userData(planche, 23, world, bodyDef_stone, fixDef_stone, 1088 / scale, 394 / scale, 2.2, 0.2, 0)
		add_userData(planche, 24, world, bodyDef_wood, fixDef_wood, 1088 / scale, 382 / scale, 1.8, 0.2, 0)
		add_userData(planche, 25, world, bodyDef_ice, fixDef_ice, 1088 / scale, 370 / scale, 1.4, 0.2, 0)
		add_userData(planche, 26, world, bodyDef_ice, fixDef_ice, 1052 / scale, 334 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 27, world, bodyDef_ice, fixDef_ice, 1124 / scale, 334 / scale, 1, 0.2, Math.PI / 2)
		add_userData(planche, 28, world, bodyDef_ice, fixDef_ice, 1088 / scale, 298 / scale, 1.4, 0.2, 0)
		add_userData(planche, 29, world, bodyDef_wood, fixDef_wood, 1040 / scale, 334 / scale, 1.4, 0.2, Math.PI / 2)
		add_userData(planche, 30, world, bodyDef_wood, fixDef_wood, 1136 / scale, 334 / scale, 1.4, 0.2, Math.PI / 2)
		add_userData(planche, 31, world, bodyDef_wood, fixDef_wood, 1088 / scale, 286 / scale, 1.8, 0.2, 0)
		add_userData(planche, 32, world, bodyDef_stone, fixDef_stone, 1028 / scale, 334 / scale, 1.8, 0.2, Math.PI / 2)
		add_userData(planche, 33, world, bodyDef_stone, fixDef_stone, 1148 / scale, 334 / scale, 1.8, 0.2, Math.PI / 2)
		add_userData(planche, 34, world, bodyDef_stone, fixDef_stone, 1088 / scale, 274 / scale, 2.2, 0.2, 0)

		// add_userData(planche, 23, world, bodyDef,fixDef, 900/scale, 114/scale,8, 0.2, 0)
		// add_userData(planche, 24, world, bodyDef,fixDef, 1134/scale, 260/scale,4.6667, 0.2, Math.PI/2)
		// add_userData(planche, 25, world, bodyDef,fixDef, 1028/scale, 260/scale,4.6667, 1, Math.PI/2)

		// add_userData(planche, 3, world, bodyDef,fixDef, 23.4,8.9,1.6, 0.3, -Math.PI/3)
		// add_userData(planche, 4, world, bodyDef,fixDef, 25.6,8.9,1.6, 0.3, Math.PI/3)
	}
	if (level == 1) {
		level_1();
	} else if (level == 2) {
		level_2();
	} else if (level == 3) {
		level_3();
	}
	//console.log(piggy)

	// listener нажатий и создание птиц
	function mouseCoords(e) {
		var m = {};
		var rect = canvas.getBoundingClientRect();
		m.x = e.clientX - rect.left;
		m.y = e.clientY - rect.top;
		return m;
	}
	canvas.onmousedown = function (e) {
		mouseDown = 1;
		var ctx = canvas.getContext("2d")
		var w = canvas.width;
		var h = canvas.height;
		var m = mouseCoords(e);
		my_coord_x = m.x;
		my_coord_y = m.y;
		if ((my_coord_x - glob_x) ** 2 + (my_coord_y - glob_y) ** 2 > max_bird_position ** 2) {
			var cur_pos = Math.sqrt((my_coord_x - glob_x) ** 2 + (my_coord_y - glob_y) ** 2);
			my_coord_x = (my_coord_x - glob_x) * (max_bird_position / cur_pos) + glob_x
			my_coord_y = (my_coord_y - glob_y) * (max_bird_position / cur_pos) + glob_y
		}

		if (m.x > 0 && m.x < w && m.y > 0 && m.y < h) {
			canvas.onmousemove = mouse_drag_and_drope
		}

		//console.log(m.x, m.y,  end_of_world)
		if (end_of_world == true) {

		}

	}
	function mouse_drag_and_drope(e) {
		var m = mouseCoords(e);
		console.log(window_opened)
		my_coord_x = m.x
		my_coord_y = m.y

		if ((my_coord_x - glob_x) ** 2 + (my_coord_y - glob_y) ** 2 > max_bird_position ** 2) {
			var cur_pos = Math.sqrt((my_coord_x - glob_x) ** 2 + (my_coord_y - glob_y) ** 2);
			my_coord_x = (my_coord_x - glob_x) * (max_bird_position / cur_pos) + glob_x
			my_coord_y = (my_coord_y - glob_y) * (max_bird_position / cur_pos) + glob_y
		}
		// if(window_opened == "menu2"&& m.x >200 && m.x<400 && m.y >200 && m.y<400){
		// 	m_shrink = 10;
		// 	var ctx = canvas.getContext("2d")

		// 	ctx.clearRect(0,0,)
		// 	ctx.drawImage(blured_background, 0,0,1200, 600)
		// 	ctx.drawImage(level1, 200 - m_shrink/2,200 - m_shrink/2,200 + m_shrink, 200 + m_shrink) 
		// }else if(window_opened == "menu2"){
		// 	m_shrink = 0;
		// 	var ctx = canvas.getContext("2d") 
		// ctx.drawImage(level1, 200 - m_shrink/2,200 - m_shrink/2,200 + m_shrink, 200 + m_shrink) 
		// } 




	}
	canvas.onmouseleave = function (e) {
		if (mouseDown)
			end_of_contact(e)

	}
	canvas.onmouseup = function (e) {


		end_of_contact(e)

	}
	function end_of_contact(e) {
		mouseDown = 0;
		var ctx = canvas.getContext("2d")
		var w = canvas.width;
		var h = canvas.height;

		var m = mouseCoords(e);
		glob_x1 = m.x;
		glob_y1 = m.y;


		if (bird_count < number_of_birds) {
			fixDef.shape = new b2CircleShape(bird_radius / scale);
			fixDef.density = 1.5;


			var vx = -(glob_x1 - glob_x) / proect_velocity_koef;
			var vy = -(glob_y1 - glob_y) / proect_velocity_koef;
			//console.log(vx, vy)
			if (vx ** 2 + vy ** 2 > max_velocity ** 2) {
				constanta = Math.sqrt((vx ** 2 + vy ** 2) / max_velocity ** 2)

				vx = vx / constanta;
				vy = vy / constanta;
				//console.log(vx,vy, constanta)

			}
			if ((glob_x1 - glob_x) ** 2 + (glob_y1 - glob_y) ** 2 > max_bird_position ** 2) {
				var cur_pos = Math.sqrt((glob_x1 - glob_x) ** 2 + (glob_y1 - glob_y) ** 2);
				glob_x1 = (glob_x1 - glob_x) * (max_bird_position / cur_pos) + glob_x
				glob_y1 = (glob_y1 - glob_y) * (max_bird_position / cur_pos) + glob_y
			}
			bodyDef.position.x = glob_x1 / scale;
			bodyDef.position.y = glob_y1 / scale;
			bodyDef.linearVelocity.x = vx
			bodyDef.linearVelocity.y = vy
			bodyDef.angularDamping = 4
			birds_array[bird_count] = world.CreateBody(bodyDef).CreateFixture(fixDef);

			birds_array[bird_count].m_userData = [];
			birds_array[bird_count].m_userData[0] = "bird" + bird_count;
			birds_array[bird_count].m_userData[1] = "alive"
			birds_array[bird_count].m_userData[2] = "destroyed"
			birds_array[bird_count].m_userData[9] = "bird"
			//birds_array[bird_count].m_body.m_mass = 1

			bird_count++;
		}

		//перезапуск уровня		
		if (window_opened == "menu2") {
			if (m.x > 1050)
				level_move++;
			if (m.x < 150)
				level_move--;

			// for(var i = 0; i < level_images.length; i++){
			// 	if(i + level_move%number_of_levels < 0){
			// 		level_pos[i] =  i + level_move%number_of_levels + number_of_levels
			// 	}else{
			// 		level_pos[i] =  i + level_move%number_of_levels
			// 	}
			// }
			// image1 = level_images[level_move%number_of_levels]
			// image2 = level_images[(1+level_move)%number_of_levels]
			// image3 = level_images[(2+level_move)%number_of_levels]
			console.log(level_move % number_of_levels, image1)

			ctx.drawImage(blured_background, 0, 0, 1200, 600)
			ctx.drawImage(left, 50, 250, 100, 100)
			ctx.drawImage(image1, 200, 200, 200, 200)
			ctx.drawImage(image2, 500, 200, 200, 200)
			ctx.drawImage(image3, 800, 200, 200, 200)
			ctx.drawImage(right, 1050, 250, 100, 100)

		}
		if (window_opened == "menu2" && m.x > 200 && m.x < 400 && m.y > 200 && m.y < 400) {
			//level = (1 + level_move)%number_of_levels
			level = 1
			window_opened = "level " + level
			end_of_world = false
			// image1 = level_images[level - 1]             	
			init();
		} else if (window_opened == "menu2" && m.x > 500 && m.x < 700 && m.y > 200 && m.y < 400) {
			//level = (2 + level_move)%number_of_levels
			level = 2
			window_opened = "level " + level
			end_of_world = false
			//image2 = level_images[level - 1]               	
			init();
		} else if (window_opened == "menu2" && m.x > 800 && m.x < 1000 && m.y > 200 && m.y < 400) {
			//level = (3 + level_move)%number_of_levels
			level = 3
			window_opened = "level " + level
			end_of_world = false
			//image3 = level_images[level - 1]              	
			init();
		}

		if (window_opened == "menu" && end_of_world == true && (m.x - 900) ** 2 + (m.y - 300) ** 2 < 100 ** 2) {
			end_of_world = false
			init();
		} else if (window_opened == "menu" && end_of_world == true && m.x > 200 && m.x < 400 && m.y > 200 && m.y < 400) {
			//console.log(m.x, m.y)
			ctx.drawImage(blured_background, 0, 0, 1200, 600)
			ctx.drawImage(left, 50, 250, 100, 100)
			ctx.drawImage(image1, 200, 200, 200, 200)
			ctx.drawImage(image2, 500, 200, 200, 200)
			ctx.drawImage(image3, 800, 200, 200, 200)
			ctx.drawImage(right, 1050, 250, 100, 100)
			window_opened = "menu2"
		} else if (window_opened == "menu" && end_of_world == true && (m.x - 600) ** 2 + (m.y - 300) ** 2 < 100 ** 2) {
			level = level % number_of_levels + 1
			end_of_world = false
			init();
		}

	}


	// console.log(world)
	console.log(bodyDef_stone)
	console.log(fixDef)

	//setup debug draw
	var debugDraw = new b2DebugDraw();


	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	Start_time = Date.now();
	world_time = window.setInterval(update, 1000 / 60);
	//console.log(world.SetDebugDraw(debugDraw))
};

function update() {
	//console.log("планка 1", "свин" , planche[1].m_userData[5], piggy[0].m_userData[5])
	//	console.log(piggy[0].m_userData[5])
	//console.log(planche[1].m_userData[5]) image_id1
	// update world
	world.Step(
		1 / 60   //frame-rate
		, 10       //velocity iterations
		, 10       //position iterations
	);

	world.DrawDebugData();
	var ctx = canvas.getContext("2d")
	ctx.drawImage(active_image, 0, 0, 1200, 600)
	ctx.drawImage(ground, 0, 400, 1200, 200)
	world.ClearForces();

	// создание и рисование птиц и рогатки
	var variable_i = 0;

	drag_x1 = 100;
	drag_y1 = 300;
	drag_x2 = my_coord_x;
	drag_y2 = my_coord_y;
	var temp_angle = Math.atan((200 - my_coord_x) / (300 - my_coord_y)) + Math.PI / 2;
	var scalar_multiply = (drag_x1 - sling_x) * (drag_x2 - sling_x) + (drag_y1 - sling_y) * (drag_y2 - sling_y);
	var vector_multiply = (drag_x1 - sling_x) * (drag_y2 - sling_y) - (drag_x2 - sling_x) * (drag_y1 - sling_y);
	var vector_radius1 = Math.sqrt((drag_x1 - sling_x) ** 2 + (drag_y1 - sling_y) ** 2)
	var vector_radius2 = Math.sqrt((drag_x2 - sling_x) ** 2 + (drag_y2 - sling_y) ** 2)
	if (vector_multiply != 0) {
		var direction = -Math.round(vector_multiply / Math.abs(vector_multiply));
	} else {
		var direction = 0;
	}
	if (direction != 1) {
		rope_angle = temp_angle + Math.PI;
	} else {
		rope_angle = temp_angle;
	}

	if (mouseDown && bird_count < number_of_birds) {
		var rope_len = Math.sqrt((210 - my_coord_x) ** 2 + (300 - my_coord_y) ** 2) + bird_radius;
		drawRotated(-rope_angle, rope_back, my_coord_x - bird_radius * Math.cos(rope_angle) + 1 / 2 * (210 - my_coord_x + bird_radius * Math.cos(rope_angle)), my_coord_y - 0 * bird_radius * Math.sin(rope_angle) + 1 / 2 * (300 - my_coord_y + bird_radius * Math.sin(rope_angle)), rope_len, 2 * bird_radius)
		//ctx.drawImage(rope_back, my_coord_x - bird_radius ,my_coord_y - bird_radius, 210 - my_coord_x + bird_radius, 2*bird_radius)
	}
	// картинка задней части рогатки
	ctx.drawImage(slingshot_back, 125, 280, 130, 122)


	if (birds_array[0] != undefined) {

		//console.log(world.DestroyBody(birds_array[0].GetBody()))

		//console.log(birds_array[0].GetBody().m_sleepTime)
		for (var i = variable_i; i < birds_array.length; i++) {


			if (birds_array[i].GetBody().m_sleepTime > 0.4 && birds_array[i].m_userData[1] != "dead") {
				//шарик подпрыгивает как только останавливается
				//	birds_array[0].GetBody().m_force.y = -100;
				//birds_array[0].GetBody().m_next = null;
				world.DestroyBody(birds_array[i].GetBody())
				birds_array[i].m_userData[1] = "dead"
			} else {
				// 	console.log(birds_array[i])
				if (birds_array[i].m_userData[1] != "dead" && i < number_of_birds && end_of_world == false) {
					//console.log( birds_array[i].GetBody().m_userData)
					var bird_x = birds_array[i].GetBody().GetPosition().x * scale
					var bird_y = birds_array[i].GetBody().GetPosition().y * scale
					drawRotated(birds_array[i].GetBody().GetAngle(), image_id2, bird_x, bird_y, 2 * bird_radius, 2 * bird_radius)
					//ctx.drawImage(image_id2, bird_x - bird_radius ,bird_y - bird_radius, 2*bird_radius, 2*bird_radius)
				}
			}
			if (birds_array[variable_i].m_userData[1] == "dead") {
				variable_i++;
			}
		}
		// console.log(birds_array[0].GetBody())
	}

	if (mouseDown && bird_count < number_of_birds) {
		ctx.drawImage(image_id2, my_coord_x - bird_radius, my_coord_y - bird_radius, 2 * bird_radius, 2 * bird_radius)


		var rope_len = Math.sqrt((185 - my_coord_x) ** 2 + (300 - my_coord_y) ** 2) + bird_radius;
		drawRotated(-rope_angle, rope_front_crop, my_coord_x - bird_radius * Math.cos(rope_angle) - bird_radius * Math.sin(rope_angle) / 2 + 1 / 2 * (185 - my_coord_x + bird_radius * Math.cos(rope_angle)), my_coord_y + 0 * bird_radius * Math.sin(rope_angle) + 1 / 2 * (300 - my_coord_y + bird_radius * Math.sin(rope_angle)), rope_len, 2 * bird_radius)
	}
	ctx.drawImage(slingshot_front, 125, 280, 130, 122)


	//рисование и уничтожение палок


	for (var i = 0; i < planche.length; i++) {
		planche_image = wooden_planche
		broken_planche_image = wooden_planche_broken;
		if (planche[i].m_userData[3] == "stone") {
			planche_image = stone
			broken_planche_image = broken_stone
		} else if (planche[i].m_userData[3] == "ice") {
			planche_image = ice
			broken_planche_image = broken_ice
		}

		if (planche[i].m_userData[5] > plache_health && planche[i].m_userData[1] != "dead") {
			planche[i].m_userData[1] = "dead"
			death_timer_planche[i] = Date.now();
		}
		//console.log(i,	death_timer_planche[i])      
		if (planche[i].m_userData[1] == "dead" && Date.now() - death_timer_planche[i] > 500 || end_of_world == true) {
			world.DestroyBody(planche[i].GetBody())
		} else {
			var hor_pl_x = planche[i].GetBody().GetPosition().x * scale
			var hor_pl_y = planche[i].GetBody().GetPosition().y * scale
			if (planche[i].m_userData[5] < plache_health / 3) {
				drawRotated(planche[i].GetBody().GetAngle(), planche_image, hor_pl_x, hor_pl_y, 2 * planche[i].m_userData[7] * scale, 2 * planche[i].m_userData[8] * scale)
			} else {
				drawRotated(planche[i].GetBody().GetAngle(), broken_planche_image, hor_pl_x, hor_pl_y, 2 * planche[i].m_userData[7] * scale, 2 * planche[i].m_userData[8] * scale)
			}
		}
	}

	// функция поворота картинки    
	function drawRotated(degrees, image, xx, yy, width, height) {
		x = xx - canvas.width / 2;
		y = yy - canvas.height / 2;
		ctx.save();
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.rotate(degrees);
		ctx.drawImage(image, -width / 2 + (x) * Math.cos(degrees) + (y) * Math.sin(degrees), -height / 2 - (x) * Math.sin(degrees) + (y) * Math.cos(degrees), width, height);
		ctx.restore();
	}

	// смерть и жизнь свиньи
	var num_of_dead_pigs = 0
	for (var i = 0; i < piggy.length; i++) {
		if (piggy[i].m_userData[1] == "dead")
			num_of_dead_pigs++;
		if (piggy[i].m_userData[5] >= pig_health && piggy[i].m_userData[1] != "dead") {
			//console.log(dead_pigs , piggy.length-1,piggy[i].m_userData[1])


			death_timer[i] = Date.now();
			if (dead_pigs == piggy.length - 1 && piggy[i].m_userData[1] != "dead") {
				time_to_end = death_timer[i];
			}
			piggy[i].m_userData[1] = "dead"
			//console.log("Aaa")
		}
		//console.log(Date.now() - death_timer[0])
		if (piggy[i].m_userData[1] == "dead" && Date.now() - death_timer[i] > 0) {
			//
			var pig_x = piggy[i].m_userData[7].x
			var pig_y = piggy[i].m_userData[7].y
			//if(Date.now() - death_timer < 1)
			//console.log(Date.now() - death_timer[0])
			if (Date.now() - death_timer[i] < 400) {
				console.log(piggy[i].m_userData[8])
				smoke_rad = (50 * (400 - Date.now() + death_timer[i]) + 100 * (Date.now() - death_timer[i])) / 400 * piggy[i].m_userData[8] / pig_rad
				ctx.drawImage(smoke, pig_x * scale - smoke_rad / 2, pig_y * scale - smoke_rad / 2, smoke_rad, smoke_rad)
				ctx.fillStyle = "#DDA";
				ctx.font = "15pt Arial";
				ctx.fillText("5000", pig_x * scale - 20, pig_y * scale);
			}


			world.DestroyBody(piggy[i].GetBody())


		} else if (piggy[i].m_userData[5] < pig_health / 3) {
			var pig_x = piggy[i].GetBody().GetPosition().x * scale
			var pig_y = piggy[i].GetBody().GetPosition().y * scale

			drawRotated(piggy[i].GetBody().GetAngle(), image_id1, pig_x, pig_y - 0.1 * piggy[i].m_userData[8] * scale, 2.2 * piggy[i].m_userData[8] * scale, 2.2 * piggy[i].m_userData[8] * scale)

		} else {
			var pig_x = piggy[i].GetBody().GetPosition().x * scale
			var pig_y = piggy[i].GetBody().GetPosition().y * scale

			drawRotated(piggy[i].GetBody().GetAngle(), pig_image_broken, pig_x, pig_y - 0.1 * piggy[i].m_userData[8] * scale, 2.2 * piggy[i].m_userData[8] * scale, 2.2 * piggy[i].m_userData[8] * scale)

		}
		// console.log()

		if (num_of_dead_pigs == piggy.length)
			window_opened = "menu"
	}
	dead_pigs = num_of_dead_pigs;

	// конец уровня  
	//console.log(dead_pigs, piggy.length, Date.now() - time_to_end, window_opened)
	if ((dead_pigs == piggy.length && Date.now() - time_to_end > 3000 && window_opened == "menu") || (bird_count == number_of_birds && bird_count - variable_i == 0)) {
		end_of_world = true;
		window_opened = "menu"
		level_move = 0;
		Start_time = undefined;

		var body = this.world.GetBodyList();
		while (body != null) {
			world.DestroyBody(body)
			body = body.GetNext();
		}
		if (body == null) {
			ctx.drawImage(blured_background, 0, 0, 1200, 600)
			ctx.drawImage(list_, 200, 200, 200, 200)
			ctx.drawImage(play_button, 500, 200, 200, 200)
			ctx.drawImage(replay, 800, 200, 200, 200)
			clearInterval(world_time);


			// world.Step(
			//             1 / 60   //frame-rate
			//          ,  10       //velocity iterations
			//          ,  10       //position iterations
			//       );

			//       world.DrawDebugData();
			//       var ctx = canvas.getContext("2d")
			//    	ctx.drawImage(image_id3, 0,0,200, 600)
			//       world.ClearForces();
		}
		// if(Date.now() - death_timer > 6000){
		// 	window_opened = "level 1"
		// 	end_of_world = false;
		// 	console.log(world)
		// 	init();

		// world.Step(
		//             1 / 60   //frame-rate
		//          ,  10       //velocity iterations
		//          ,  10       //position iterations
		//       );

		//       world.DrawDebugData();
		//       var ctx = canvas.getContext("2d")
		//    	 ctx.drawImage(image_id3, 0,0,1200, 600)
		//       world.ClearForces();
		//	}
	}

	//сетка
	// for(var i = 0; i < 12; i++){
	// 	ctx.beginPath();
	// 	ctx.moveTo(i*100, 0);
	// 	ctx.lineTo(i*100, 600)

	// 	ctx.stroke();
	// 	//ctx.strokeStyle = "#aaa"
	// }

	// for(var i = 0; i < 6; i++){
	// 	//ctx.strokeStyle = "#ddd"
	// 	ctx.beginPath();
	// 	ctx.moveTo(0, i*100);
	// 	ctx.lineTo(1200, i*100)
	// 	ctx.stroke();
	// }

	// подсчет очков  
	var pig_points = 0
	for (var i = 0; i < piggy.length; i++) {

		var ppoints = 0;
		if (piggy[i].m_userData[5] < pig_health) {
			ppoints = piggy[i].m_userData[5] / pig_health * 5000
		} else {
			ppoints = 5000;
		}
		pig_points += ppoints;
		//console.log(piggy[i].m_userData[5], ppoints) 
	}
	planch_points = 0;
	for (var i = 0; i < planche.length; i++) {
		var h_points = 0;
		if (planche[i].m_userData[5] < plache_health) {
			h_points = planche[i].m_userData[5] / plache_health * 500
		} else {
			h_points = 500;
		}
		planch_points += h_points;
	}

	points = Math.round(pig_points + planch_points)
	//console.log(pig_points)
	ctx.fillStyle = points_style;
	ctx.font = "15pt Arial";
	ctx.fillText("очки: " + points, 1050, 50);

};      
