
$(function() {
	

	// set the scene size
	var WIDTH = 400,
		HEIGHT = 300;

	// set some camera attributes
	var VIEW_ANGLE = 45,
		ASPECT = 1.3,
	  	NEAR = 0.1,
	  	FAR = 10000;

	$(window).on('resize', function() {
		var width = $container.width(),
			height = $container.height()

		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	});

	// get the DOM element to attach to
	// - assume we've got jQuery to hand
	var $container = $('#container');

	// create a WebGL renderer, camera
	// and a scene
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize($container.width(), $container.height());
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	var scene = new THREE.Scene();


	function render() {
		renderer.render(scene, camera);
	};

	var balloons = [];
	var t = 0;
	(function loop() {
		requestAnimationFrame(loop);
		render();
	
		if (grp) {
			grp.rotateOnAxis(new THREE.Vector3(0,1,0), 0.005);
		}		

		for(var i=0; i<balloons.length; i++) {
			var b = balloons[i];
			b.position.y += 0.03;

			b.lookAt(camera.position.clone().setY(0));
		}

		if (horse1) {
            horses.rotateOnAxis(new THREE.Vector3(0,1,0), 0.005);
            for(var i= 0; i<4; i++) {
                var dh = Math.cos(t / 25 + i) * 0.2;
                var h = horses.children[i];
                var v = horses.worldToLocal(camera.position.clone());
                v = v.setY(0);
                h.position.setY(3.5 + dh);
                h.lookAt(v);
            }
		}

		t++;

		if (discolights && discolights.length > 0) {
			var l = Math.floor(t / 20) % 3;
			
			for(var i=0; i<3; i++) {
				if (i==l) {
					discolights[i].intensity = 2;
					discolights[i].castShadow = true;
				} else {
					discolights[i].intensity = 0;
					discolights[i].castShadow = false;
				}
			}
		}

	})();

	// add the camera to the scene
	scene.add(camera);

	// the camera starts at 0,0,0
	// so pull it back
	camera.position.y = 7;
	camera.position.z = 20;

	camera.lookAt(new THREE.Vector3(0,2,0));

	// attach the render-supplied DOM element
	$container.append(renderer.domElement);


	scene.fog = new THREE.FogExp2( 0x000000, 0.002 );
	renderer.setClearColor( scene.fog.color, 1 );
	
	var texture = THREE.ImageUtils.loadTexture( "i1.png" );
	var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, overdraw: true });
	var geo = new THREE.PlaneGeometry(12, 14);

	for(var i=0; i<50; i++) {
		var mesh = new THREE.Mesh( geo, material );
		mesh.position.x = Math.random() * 200 - 100;
		mesh.position.y = Math.random() * 200 + 20;
		mesh.position.z = Math.random() * 500 - 450;
		//mesh.castShadow = true;
		mesh.color = 0xff0000;
		scene.add(mesh);
		balloons.push(mesh)
	}

	

	var controls = new THREE.OrbitControls( camera );
	controls.rotateSpeed = 0.2;
	controls.target = new THREE.Vector3(0, 5, 0);
	controls.addEventListener( 'change', render );
	controls.update();
	// add the sphere to the scene
	// scene.add(sphere);


	// // create a point light
	// var pointLight = new THREE.PointLight(0xAAAAAA);
	// // set its position
	// pointLight.position.x = 0;
	// pointLight.position.y = 1500;
	// pointLight.position.z = 0;

	// // add to the scene
	// scene.add(pointLight);

	light = new THREE.AmbientLight( 0xaabbcc );
	scene.add( light );

	light = new THREE.SpotLight( 0xffffff, 0.5, 500, Math.PI, 0 );
	light.position.set( 40, 30, 40 );
	light.target.position.set( 0, 0, 0 );

	// light.shadowCameraVisible = true;
	light.shadowCameraNear = 0.1;
	light.shadowCameraFar = 2000;
	light.shadowCameraFov = 70;
	light.shadowBias = 0.001;
	light.shadowDarkness = 0.3;

	var SHADOW_MAP_SIZE = 2048;
	light.shadowMapWidth = SHADOW_MAP_SIZE;
	light.shadowMapHeight = SHADOW_MAP_SIZE;
	light.castShadow = true;
	scene.add(light);


	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFShadowMap;


	var planeMaterial = new THREE.MeshPhongMaterial( { color: 0x626B47 } );
	planeMaterial.ambient = planeMaterial.color;
	var ground = new THREE.Mesh(
		new THREE.PlaneGeometry(3000,3000), 
		planeMaterial
	);
	ground.lookAt(new THREE.Vector3(0,10,0));
	ground.castShadow = false;
	ground.receiveShadow = true;
	scene.add(ground);


	var grp = new THREE.Object3D();


	var poses = [
		new THREE.Vector3(2, 5.5, 0),
		new THREE.Vector3(-2, 5.5, 2),
		new THREE.Vector3(0, 5.5, -2)
	];
	var discolights = [];
	var colors = [0xff0000, 0x00ff00, 0x0000ff];
	for(var i=0; i<0; i++) {
		var light2 = new THREE.SpotLight( colors[i], 2, 10, Math.PI, 10 );

		light2.position = poses[i];

		light2.target.position.set( 0, 0, 0 );
		
		light2.intensity = 2;
		light2.castShadow = true;

		light2.shadowMapWidth = SHADOW_MAP_SIZE;
		light2.shadowMapHeight = SHADOW_MAP_SIZE;
		// light2.shadowCameraVisible = true;
		light2.shadowBias = 0.0001;
		light2.shadowDarkness = 0.5;
		light2.shadowCameraNear = 0.1;
		light2.shadowCameraFar = 10;
		light2.shadowCameraFov = 120;
		discolights.push(light2);
		grp.add(light2);
	}
	scene.add(grp);


	// var cube = new THREE.Mesh(
	// 	new THREE.CubeGeometry(5,5,5), 
	// 	new THREE.MeshPhongMaterial( { color: 0xaaa } )
	// );
	// cube.castShadow = true;
	// cube.receiveShadow = true;
	// scene.add(cube);

	var carouselObj = null;

	var carouselTexture = THREE.ImageUtils.loadTexture( "carousel.jpg" );

	new THREE.OBJLoader().load("carousel.obj", function(obj) {
		carouselObj = obj;
		obj.scale = new THREE.Vector3(0.1,0.1,0.1);
		obj.position = new THREE.Vector3(0, 0, 0);

		var carousel = obj.getObjectByName("Cylinder001");
		carousel.material.map = carouselTexture;
		//carousel.material = new THREE.MeshPhongMaterial( { color: 0xaaa } );

		carousel.castShadow = true;
		carousel.receiveShadow = true;

		grp.add(obj);
	});


    var horses = new THREE.Object3D();
    var s = 0.3;
	var horse1 = new THREE.Mesh( 
		new THREE.PlaneGeometry(11, 18), 
		new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture( "horse1.png" ), transparent: true, overdraw: true })
	);
	horse1.scale = new THREE.Vector3(s, s, s);
	horse1.position = new THREE.Vector3(3, 3.5, 0);
    horses.add(horse1);

	var horse2 = new THREE.Mesh( 
		new THREE.PlaneGeometry(11, 18), 
		new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture( "horse2.png" ), transparent: true, overdraw: true })
	);
	horse2.scale = new THREE.Vector3(s, s, s);
	horse2.position = new THREE.Vector3(-3, 3.5, 0);
    horses.add(horse2);

	var horse3 = new THREE.Mesh( 
		new THREE.PlaneGeometry(11, 18), 
		new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture( "horse4.png" ), transparent: true, overdraw: true })
	);
	horse3.scale = new THREE.Vector3(s, s, s);
	horse3.position = new THREE.Vector3(0, 3.5, -3);
	horse3.castShadow = true;
    horses.add(horse3);

	var horse4 = new THREE.Mesh( 
		new THREE.PlaneGeometry(11, 18), 
		new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture( "horse3.png" ), transparent: true, overdraw: true })
	);
	horse4.scale = new THREE.Vector3(s, s, s);
	horse4.position = new THREE.Vector3(0, 3.5, 3);
    horses.add(horse4);

    scene.add(horses);



    var texture = THREE.ImageUtils.loadTexture( "wheel.png" );
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, overdraw: true });
    var geo = new THREE.PlaneGeometry(10, 10);
    var mesh = new THREE.Mesh( geo, material );
    mesh.position = new THREE.Vector3(-20,5,-90);
    //mesh.castShadow = true;
    //scene.add(mesh);

});