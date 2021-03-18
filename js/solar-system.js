var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

//ambient :
/* var light = new THREE.AmbientLight( 0xb4e7f2, 0.3 );
scene.add( light ); */

//directionnal light :
/* var light = new THREE.DirectionalLight( 0xfdfcf0, 1 );
    light.position.set(20,10,20);
    scene.add( light ); */

//soleil : 
var Sungeometry = new THREE.SphereGeometry( 10, 50, 50 );

    //textures :
var loader = new THREE.TextureLoader();
var Suntexture = loader.load("./assets/8k_sun.jpg");

    //mesh :
var Sunmaterial = new THREE.MeshBasicMaterial({
    map: Suntexture,
    transparent: true,
    opacity: 1
});

var sun = new THREE.Mesh(Sungeometry, Sunmaterial);
sun.receiveShadow = true;

const pointLight = new THREE.PointLight( 0xffffff);
//pointLight.position.set( 10, 10, 10 );
sun.add( pointLight );


const pointLightHelper = new THREE.PointLightHelper( pointLight);
scene.add( pointLightHelper );
//terre :
var Earthgeometry = new THREE.SphereGeometry(5, 50, 50)

    //textures :
var texture = loader.load("./assets/8k_earth_daymap.jpg");
var normal = loader.load("./assets/8k_earth_normal_map.tif");
var specular = loader.load("./assets/8k_earth_specular_map.tif");

    //mesh:
var Earthmaterial = new THREE.MeshPhongMaterial( {
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 25,
    map: texture,
    specularMap: specular,
    normalMap: normal
});

var earth = new THREE.Mesh(Earthgeometry, Earthmaterial);
earth.castShadow = true;
earth.receiveShadow = true;
earth.position.x = 40;
//sun.add(earth);

    //les nuages :
var Cloudsgeometry = new THREE.SphereGeometry(5.05, 50, 50)
var Cloudstexture = loader.load("./assets/8k_earth_clouds.jpg");
var Cloudsmaterial = new THREE.MeshPhongMaterial( {
    map: Cloudstexture,
    transparent: true,
    opacity: 0.4
});
var clouds = new THREE.Mesh(Cloudsgeometry, Cloudsmaterial);

//earth.add(clouds);


//lune :
var Moongeometry = new THREE.SphereGeometry( 1, 50, 50 );

var Moontexture = loader.load("./assets/8k_moon.jpg");
var Moonmaterial = new THREE.MeshPhongMaterial({
    map: Moontexture,
    transparent: true,
    opacity: 1
});

var moon = new THREE.Mesh(Moongeometry, Moonmaterial);
moon.receiveShadow = true;
moon.position.x = 10;
//earth.add(moon);

/* var moonLight = new THREE.SpotLight( 0x008000, 5, 10 );
moonLight.angle = Math.PI / 11;
moonLight.position.set(1, 0, 0);
moonLight.target = earth
moonLight.castShadow = true;


const spotLightHelper = new THREE.SpotLightHelper( moonLight);
scene.add( spotLightHelper );

moon.add(moonLight); */

//Stars :
var Stargeometry = new THREE.SphereGeometry(200, 50, 50);
var Starmaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("./assets/8k_stars_milky_way.jpg"),
    side: THREE.DoubleSide,
    shininess: 0
});

var stars = new THREE.Mesh(Stargeometry, Starmaterial);
scene.add(stars);



const solarSystem = new THREE.Object3D();
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 40;
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;

moonOrbit.add(moon)
//earthOrbit.add(earth)
earthOrbit.add(moonOrbit)
solarSystem.add(sun)
solarSystem.add(earthOrbit)
solarSystem.add(earth)

scene.add(solarSystem);
camera.position.z = 70;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var render = function () {
    requestAnimationFrame( render );
    //rota nuages :
    clouds.rotation.y += .0015;
    clouds.rotation.z += .00100;
    
    //terre / elle-même :
    //earth.rotation.y +=0.01;
    
    //terre / soleil :
    //solarSystem.rotation.z +=0.005;

    //lune / terre :
    //moonOrbit.rotation.y -= 0.01;

    controls.update();
    renderer.render( scene, camera );
};

render();

