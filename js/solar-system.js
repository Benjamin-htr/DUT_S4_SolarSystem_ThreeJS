var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//ambient :
var light = new THREE.AmbientLight( 0xb4e7f2 );
scene.add( light );

//directionnal light :
var light = new THREE.DirectionalLight( 0xfdfcf0, 1 );
    light.position.set(20,10,20);
    scene.add( light );

//terre :
var Earthgeometry = new THREE.SphereGeometry(5, 50, 50)

    //textures :
var loader = new THREE.TextureLoader();
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
earth.position.x = 50;
scene.add(earth);

    //les nuages :
var Cloudsgeometry = new THREE.SphereGeometry(5.05, 50, 50)
var Cloudstexture = loader.load("./assets/8k_earth_clouds.jpg");
var Cloudsmaterial = new THREE.MeshPhongMaterial( {
    map: Cloudstexture,
    transparent: true,
    opacity: 0.4
});
var clouds = new THREE.Mesh(Cloudsgeometry, Cloudsmaterial);

earth.add(clouds);


//lune :
var Moongeometry = new THREE.SphereGeometry( 1, 50, 50 );

var Moontexture = loader.load("./assets/8k_moon.jpg");
var Moonmaterial = new THREE.MeshPhongMaterial({
    map: Moontexture,
    transparent: true,
    opacity: 1
});

var moon = new THREE.Mesh(Moongeometry, Moonmaterial);
moon.position.x = 20;
earth.add(moon);







camera.position.z = 70;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var render = function () {
  requestAnimationFrame( render );
  //cube.rotation.x += 0.1;
  //cube.rotation.y += 0.1;
  controls.update();
  renderer.render( scene, camera );
};

render();

