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
var light = new THREE.DirectionalLight( 0xdddddd, 0.8 );
    light.position.set( 20, 20, 0 );
    scene.add( light );

//star :
var geometry = new THREE.SphereGeometry(10, 50, 50)

    //textures :
var loader = new THREE.TextureLoader();
var texture = loader.load("./assets/8k_earth_daymap.jpg");
var normal = loader.load("./assets/8k_earth_normal_map.tif");
var specular = loader.load("./assets/8k_earth_specular_map.tif");

var material = new THREE.MeshPhongMaterial( {
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 15,
    map: texture,
    specularMap: specular,
    normalMap: normal
});

var star = new THREE.Mesh(geometry, material);
scene.add(star);
camera.position.z = 50;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var render = function () {
  requestAnimationFrame( render );
  //cube.rotation.x += 0.1;
  //cube.rotation.y += 0.1;
  controls.update();
  renderer.render( scene, camera );
};

render();

