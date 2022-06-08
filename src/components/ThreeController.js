import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { gsap } from 'gsap';


let camera, renderer, orbitControls, scene, refElement
let raycaster, pointer
let objects = []
let vertices = []
let isAbout = false
let isWork = false
let points = []
let originalCube, meshComponents, finalMesh, fatString
let boxWireframe, sphereOrnament
let aboutGroup = new THREE.Group()
let homeGroup = new THREE.Group()
let workGroup = new THREE.Group()
let ambientLight, directionalLight, directionalLight2, particles
let rotationSpeed = -0.2
let loadBars
let currentIntersect, customColor1, customColor2, velocityVector, worksPositions, linesMesh, linesVertexs, linesColors, focusObject = null
let testVaraible = false
const sphereRadius = 0.3
const numProjects = 20
const radio = 8
const minDistance = 4
const colorsArray = [
  "63b598", "ce7d78", "ea9e70", "a48a9e", "c6e1e8", "648177", "0d5ac1",
  "f205e6", "1c0365", "14a9ad", "4ca2f9", "a4e43f", "d298e2", "6119d0",
  "d2737d", "c0a43c", "f2510e", "651be6", "79806e", "61da5e", "cd2f00",
  "9348af", "01ac53", "c5a4fb", "996635", "b11573", "4bb473", "75d89e",
  "2f3f94", "2f7b99", "da967d", "34891f", "b0d87b", "ca4751", "7e50a8",
  "c4d647", "e0eeb8", "11dec1", "289812", "566ca0", "ffdbe1", "2f1179",
  "935b6d", "916988", "513d98", "aead3a", "9e6d71", "4b5bdc", "0cd36d",
  "250662", "cb5bea", "228916", "ac3e1b", "df514a", "539397", "880977",
  "f697c1", "ba96ce", "679c9d", "c6c42c", "5d2c52", "48b41b", "e1cf3b",
  "5be4f0", "57c4d8", "a4d17a", "225b8", "be608b", "96b00c", "088baf",
  "f158bf", "e145ba", "ee91e3", "05d371", "5426e0", "4834d0", "802234",
  "6749e8", "0971f0", "8fb413", "b2b4f0", "c3c89d", "c9a941", "41d158",
  "fb21a3", "51aed9", "5bb32d", "807fbb", "21538e", "89d534", "d36647",
  "7fb411", "0023b8", "3b8c2a", "986b53", "f50422", "983f7a", "ea24a3",
  "79352c", "521250", "c79ed2", "d6dd92", "e33e52", "b2be57", "fa06ec",
  "1bb699", "6b2e5f", "64820f", "1c2712", "21538e", "89d534", "d36647",
  "7fb411", "0023b8", "3b8c2a", "986b53", "f50422", "983f7a", "ea24a3",
  "79352c", "521250", "c79ed2", "d6dd92", "e33e52", "b2be57", "fa06ec",
  "1bb699", "6b2e5f", "64820f", "1c2712", "9cb64a", "996c48", "9ab9b7",
  "06e052", "e3a481", "0eb621", "fc458e", "b2db15", "aa226d", "792ed8",
  "73872a", "520d3a", "cefcb8", "a5b3d9", "7d1d85", "c4fd57", "f1ae16",
  "8fe22a", "ef6e3c", "243eeb", "1dc188", "dd93fd", "3f8473", "e7dbce",
  "421f79", "7a3d93", "635f6d", "93f2d7", "9b5c2a", "15b9ee", "0f5997",
  "409188", "911e20", "1350ce", "10e5b1", "fff4d7", "cb2582", "ce00be",
  "32d5d6", "17232", "608572", "c79bc2", "00f87c", "77772a", "6995ba",
  "fc6b57", "f07815", "8fd883", "060e27", "96e591", "21d52e", "d00043",
  "b47162", "1ec227", "4f0f6f", "1d1d58", "947002", "bde052", "e08c56",
  "28fcfd", "bb09bb", "36486a", "d02e29", "1ae6db", "3e464c", "a84a8f",
  "911e7e", "3f16d9", "0f525f", "ac7c0a", "b4c086", "c9d730", "30cc49",
  "3d6751", "fb4c03", "640fc1", "62c03e", "d3493a", "88aa0b", "406df9",
  "615af0", "4be477", "2a3434", "4a543f", "79bca0", "a8b8d4", "00efd4",
  "7ad236", "7260d8", "1deaa7", "06f43a", "823c59", "e3d94c", "dc1c06",
  "f53b2a", "b46238", "2dfff6", "a82b89", "1a8011", "436a9f", "1a806a",
  "4cf09d", "c188a2", "67eb4b", "b308d3", "fc7e41", "af3101", "ff0065",
  "71b1f4", "a2f8a5", "e23dd0", "d3486d", "00f7f9", "474893", "3cec35",
  "1c65cb", "5d1d0c", "2d7d2a", "ff3420", "5cdd87", "a259a4", "e4ac44",
  "1bede6", "8798a4", "d7790f", "b2c24f", "de73c2", "d70a9c", "25b675",
  "88e9b8", "c2b0e2", "86e98f", "ae90e2", "1a806b", "436a9e", "0ec0ff",
  "f812b3", "b17fc9", "8d6c2f", "d3277a", "2ca1ae", "9685eb", "8a96c6",
  "dba2e6", "76fc1b", "608fa4", "20f6ba", "07d7f6", "dce77a", "77ecca"
]

const gltfLoader = new GLTFLoader()

function ThreeController(refEl){
    refElement = refEl
    init()
    initAnimation()
    animate()
}

function init(){
    //Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color( 0xcfcfcf );

    //Camera
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        250
    )
    camera.position.set(24, 18, 250)
    scene.add(camera)

    //Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render( scene, camera )
    refElement.appendChild( renderer.domElement )

    //Controls
    orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.enablePan = false
    orbitControls.minDistance = 9
    orbitControls.maxDistance = 150
    orbitControls.enabled = false

    //Paricles
    particlesGenerator()

    /**
     * MESH
     */
    meshComponents = {
        geometry: new THREE.BoxGeometry(8, 8, 8),
        material: new THREE.MeshNormalMaterial({}),
        materialWire: new THREE.MeshNormalMaterial({ wireframe: true })
    }
    meshComponents.geometry.translate(4, 4, 4)
  
    originalCube = new THREE.Mesh(
        meshComponents.geometry,
        meshComponents.material 
    )
    homeGroup.add(originalCube)
    objects.push(originalCube)
    scene.add(homeGroup)

    boxWireframe = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 5),
        meshComponents.materialWire
    )
    boxWireframe.position.set(0, 0.5, 0)
    aboutGroup.add(boxWireframe)

    sphereOrnament = new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10),
        meshComponents.materialWire
    )
    sphereOrnament.position.set(0, 0.5, 0)
    aboutGroup.add(sphereOrnament)

    //POINTER
    raycaster = new THREE.Raycaster()
    pointer = new THREE.Vector2(100, 100)

    //LIGHTS
    ambientLight = new THREE.AmbientLight(0xe252ff, 0.8)
    aboutGroup.add(ambientLight)

    directionalLight = new THREE.DirectionalLight(0x7ad7ff, 0.6)
    directionalLight.castShadow = false
    directionalLight.position.set(0, 0, 0.5)
    aboutGroup.add(directionalLight)

    directionalLight2 = new THREE.DirectionalLight(0x11ff88, 0.6)
    directionalLight2.castShadow = false
    directionalLight2.position.set(-0.5, 1, 0.5)
    aboutGroup.add(directionalLight2)

    //MODEL LOADER
    gltfLoader.load(
        '/models/TEST_CABINA.glb',
        (gltf) => {
            aboutGroup.add(gltf.scene)  
        }
    )

    /**
     * LISTENERS
     */
    window.addEventListener('resize', onWindowResize)
    window.addEventListener('mousemove', updatePointer)
    window.addEventListener('pointerdown', onPointerDown)

}

//Aux functions
function customRand(min=100, max=300) {
    return Math.random() * (max - min) + min;
}
function particlesGenerator(){
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const positions = new Float32Array( particlesCount * 3 )
    for(let i = 0; i < particlesCount*3; i++) {
        positions[i] = customRand(-20, 20)
    }
    particlesGeometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) )

    const particlesMaterial = new THREE.PointsMaterial( {color: 0xff77cc, sizeAttenuation: true, size: 0.4, transparent: true, opacity: 0} )
    particles = new THREE.Points( particlesGeometry, particlesMaterial )
}
function updatePointer( event ){
  pointer.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    - (event.clientY / window.innerHeight) * 2 + 1
  )
  raycaster.setFromCamera(pointer, camera)
}

//HOME FUNCTIONS
function onPointerDown( event ){
    updatePointer(event)
    const intersect = getRaycasterObj()
    if( intersect ){
      if(event.button === 0){
        const vector = new THREE.Vector3()
        const voxel = new THREE.Mesh(
          new THREE.BoxGeometry(8, 8, 8),
          meshComponents.material
        )
        vector
          .copy( intersect.point )
          .add( intersect.face.normal )
          .divideScalar( 8 )
          .floor()
          .multiplyScalar( 8 )
          .addScalar( 4 )
        voxel
          .geometry
          .translate(vector.x, vector.y, vector.z)
        homeGroup.add( voxel )
        objects.push( voxel )
      }
      else if(event.button === 2 && 
              intersect.object !== originalCube){
        disposeObject(intersect.object)
      }
    }
}
function onMergeClick(){
    if(!objects.length) return
    const objectGeometries = []
    for(let i = objects.length - 1; i >= 0; i--){
      objectGeometries.push(objects[i].geometry)
      disposeObject( objects[i] )
    }
    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(objectGeometries)
    finalMesh = new THREE.Mesh(mergedGeometry, meshComponents.material)
    scene.add(finalMesh)
    objects.splice(0, objects.length)
}
function onResetClick(){
    if(finalMesh){
      finalMesh.geometry.dispose()
      finalMesh.material.dispose()
      scene.remove(finalMesh)
      finalMesh = null
    }
    if(fatString){
      fatString.geometry.dispose()
      fatString.material.dispose()
      scene.remove(fatString)
      fatString = null
      vertices.splice(0, vertices.length)
    }
    if(objects.length){
      for(let i= objects.length - 1; i >= 0; i--){
        disposeObject(objects[i])
      }
      objects.splice(0, objects.length)
    }
    originalCube = new THREE.Mesh(
      meshComponents.geometry,
      meshComponents.material 
    )
    homeGroup.add(originalCube)
    objects.push(originalCube)
  
    //HTML Management
    window.addEventListener('pointerdown', onPointerDown)
}
function onStringClick(){
    if(!finalMesh) return
    const farthestPointResult = farthestPoint()
    
    let nextPoint = pathResolve(farthestPointResult) 
    for(let i = 0; i<100; i++){ 
      nextPoint = pathResolve(nextPoint)
    }
    
    const sampleClosedSpline = new THREE.CatmullRomCurve3(vertices)
    const tubeGeometry = new THREE.TubeGeometry(
      sampleClosedSpline,
      300,
      2,
      12,
      false
    )
    fatString = new THREE.Mesh( tubeGeometry, meshComponents.material )
    scene.add(fatString)
    
    finalMesh.geometry.dispose()
    finalMesh.material.dispose()
    scene.remove(finalMesh)
    finalMesh = null
}
function aChar(){
    //CLEAR SCREEN
    clearWorkspace()
    
    //HTML Management
    window.removeEventListener('pointerdown', onPointerDown)
    
    const group1 = new THREE.Group()
    const group2 = new THREE.Group()
    const group3 = new THREE.Group()
    const group4 = new THREE.Group()
    
    const generalGeometry = new THREE.BoxGeometry(8, 8, 8)
  
    const voxel1 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel1.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel1)
    group4.add(voxel1)
    
    const voxel2 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel2.position.set(customRand(), customRand(), -customRand())
    objects.push(voxel2)
    group3.add(voxel2)
  
    const voxel3 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel3.position.set(-customRand(), customRand(), -customRand())
    objects.push(voxel3)
    group4.add(voxel3)
    
    const voxel4 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel4.position.set(-customRand(), customRand(), customRand())
    objects.push(voxel4)
    group2.add(voxel4)
  
    const voxel5 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel5.position.set(customRand(), customRand(), customRand())
    objects.push(voxel5)
    group1.add(voxel5)
  
    const voxel6 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel6.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel6)
    group1.add(voxel6)
  
    const voxel7 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel7.position.set(-customRand(), customRand(), customRand())
    objects.push(voxel7)
    group1.add(voxel7)
  
    const voxel9 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel9.position.set(customRand(), customRand(), -customRand())
    objects.push(voxel9)
    group2.add(voxel9)
  
    const voxel10 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel10.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel10)
    group3.add(voxel10)
    
    homeGroup.add(
      group1,
      group2,
      group3,
      group4
    )
    
    group3.add(originalCube)
    
    gsap.to(
      voxel1.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -4,
        y: -4,
        z: 4
      }
    )
    gsap.to(
      voxel2.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -4,
        y: 4,
        z: 4
      }
    )
    gsap.to(
      voxel3.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 12,
        y: -4,
        z: 4
      }
    )
    gsap.to(
      voxel4.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -4,
        y: 12,
        z: 4
      }
    )
    gsap.to(
      voxel5.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -4,
        y: 20,
        z: 4
      }
    )
    gsap.to(
      voxel6.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 4,
        y: 20,
        z: 4
      }
    )
    gsap.to(
      voxel7.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 12,
        y: 20,
        z: 4
      }
    )
    gsap.to(
      voxel9.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 12,
        y: 12,
        z: 4
      }
    )
    gsap.to(
      voxel10.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 12,
        y: 4,
        z: 4
      }
    )
    
    gsap.to(
      group1.position,
      {
        duration: 0.4,
        delay: 1.6,
        ease: "back.out(3)",
        z:4,
        onComplete: function(){
          gsap.to(
            group1.position,
            {
              duration: 0.5,
              ease: "back.out(4)",
              z:0
            }
          )
        }
      }
    )
    
    gsap.to(
      group2.position,
      {
        duration: 0.4,
        delay: 1.65,
        ease: "back.out(3)",
        z:4,
        onComplete: function(){
          gsap.to(
            group2.position,
            {
              duration: 0.5,
              ease: "back.out(4)",
              z:0
            }
          )
        }
      }
    )
    
    gsap.to(
      group3.position,
      {
        duration: 0.4,
        delay: 1.7,
        ease: "back.out(3)",
        z:4,
        onComplete: function(){
          gsap.to(
            group3.position,
            {
              duration: 0.5,
              ease: "back.out(4)",
              z:0
            }
          )
        }
      }
    )
    gsap.to(
      group4.position,
      {
        duration: 0.4,
        delay: 1.75,
        ease: "back.out(3)",
        z:4,
        onComplete: function(){
          particlesGenerator()
          gsap.to(
            group4.position,
            {
              duration: 0.5,
              ease: "back.out(4)",
              z:0
            }
          )
        }
      }
    )
    gsap.to(
      scene.background,
      {
        duration: 2,
        delay: 1.75,
        r:0,
        g:0,
        b:0
      }
    )
    gsap.to(
      group1.position,
      {
        duration: 1,
        delay: 3,
        ease: "power2.inOut",
        x: customRand(),
        y: customRand(),
        z: -customRand(),
        onComplete: function(){
          homeGroup.remove(group1)
          homeGroup.remove(group2)
          homeGroup.remove(group3)
          homeGroup.remove(group4)
          onResetClick()
          scene.remove(homeGroup)
          scene.add(particles)
          aTransition()
        }
      }
    )
    gsap.to(
      group2.position,
      {
        duration: 0.9,
        delay: 3,
        ease: "power2.inOut",
        x: customRand(),
        y: -customRand(),
        z: customRand()
      }
    )
    gsap.to(
      group3.position,
      {
        duration: 0.9,
        delay: 3,
        ease: "power2.inOut",
        x: -customRand(),
        y: customRand(),
        z: customRand()
      }
    )
    gsap.to(
      group4.position,
      {
        duration: 0.9,
        delay: 3,
        ease: "power2.inOut",
        x: -customRand(),
        y: -customRand(),
        z: customRand()
      }
    )

}
function cChar(){
    //CLEAR SCREEN
    clearWorkspace()
    
    //HTML Management
    window.removeEventListener('pointerdown', onPointerDown)
    // mergeButton.style.display = "none"
    
    const generalGeometry = new THREE.BoxGeometry(8, 8, 8)
    // 4, -4, 4
    const voxel1 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel1.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel1)
    // 4, -12, 4
   const voxel2 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel2.position.set(customRand(), customRand(), -customRand())
    objects.push(voxel2)
  
    //12, -12, 4
    const voxel4 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel4.position.set(-customRand(), customRand(), customRand())
    objects.push(voxel4)
    
    //20, -12, 4
    const voxel5 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel5.position.set(customRand(), customRand(), customRand())
    objects.push(voxel5)
    
    //4, 12, 4
    const voxel6 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel6.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel6)
    
    //4, 20, 4
    const voxel7 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel7.position.set(-customRand(), customRand(), customRand())
    objects.push(voxel7)
    
    //12, 20, 4
    const voxel9 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel9.position.set(customRand(), customRand(), -customRand())
    objects.push(voxel9)
    
    //20, 20, 4
    const voxel10 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel10.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel10)
    
    homeGroup.add(voxel1,
              voxel2,
              voxel4,
              voxel5,
              voxel6,
              voxel7,
              voxel9,
              voxel10
             )
    
    gsap.to(
      voxel1.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 4,
        y: -4,
        z: 4,
        onComplete:function(){
          gsap.to(
            voxel1.rotation,
            {
              duration: 2,
              delay:1,
              ease: "bounce.out",
              x: 2 * Math.PI
            }
          )
        }
      }
    )
    gsap.to(
      voxel2.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 4,
        y: -12,
        z: 4,
        onComplete:function(){
          gsap.to(
            voxel2.rotation,
            {
              duration: 2,
              delay: 1.2,
              ease: "bounce.out",
              x: 2 * Math.PI
            }
          )
        }
      }
    )
    gsap.to(
      voxel4.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 12,
        y: -12,
        z: 4,
        onComplete:function(){
          gsap.to(
            voxel4.rotation,
            {
              duration: 2,
              delay: 1.4,
              ease: "bounce.out",
              x: 2 * Math.PI
            }
          )
        }
      }
    )
    //THIS HAS THE RESET
    gsap.to(
      voxel5.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 20,
        y: -12,
        z: 4,
        onComplete:function(){
          gsap.to(
            voxel5.rotation,
            {
              duration: 2,
              delay:1.6,
              ease: "bounce.out",
              x: 2 * Math.PI,
              onComplete: function(){ onResetClick() }
            }
          )
        }
      }
    )
    gsap.to(
      originalCube.rotation,
      {
        duration:1.5,
        delay: 2.3,
        ease: "bounce.out",
        y: 2 * Math.PI
      }
    )
    gsap.to(
      voxel6.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 4,
        y: 12,
        z: 4,
        onComplete:function(){
          gsap.to(
            voxel6.rotation,
            {
              duration: 2,
              delay: 0.6,
              ease: "bounce.out",
              x: 2 * Math.PI
            }
          )
        }
      }
    )
    gsap.to(
      voxel7.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 4,
        y: 20,
        z: 4,
        onComplete:function(){
          gsap.to(
            voxel7.rotation,
            {
              duration: 2,
              delay:0.4,
              ease: "bounce.out",
              x: 2 * Math.PI
            }
          )
        }
      }
    )
    gsap.to(
      voxel9.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 12,
        y: 20,
        z: 4,
        onComplete:function(){
          gsap.to(
            voxel9.rotation,
            {
              duration: 2,
              delay: 0.2,
              ease: "bounce.out",
              x: 2 * Math.PI
            }
          )
        }
      }
    )
    gsap.to(
      voxel10.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 20,
        y: 20,
        z: 4,
        onComplete:function(){
          gsap.to(
            voxel10.rotation,
            {
              duration: 2,
              ease: "bounce.out",
              x: 2 * Math.PI
            }
          )
        }
      }
    )
}
function wChar(){
    //CLEAR SCREEN
    clearWorkspace()
    
    //HTML Management
    window.removeEventListener('pointerdown', onPointerDown)
    // mergeButton.style.display = "none"
    
    const group = new THREE.Group()
    const generalGeometry = new THREE.BoxGeometry(8, 8, 8)
  
    const voxel1 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel1.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel1)
    group.add(voxel1)
    
   const voxel2 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel2.position.set(customRand(), customRand(), -customRand())
    objects.push(voxel2)
    group.add(voxel2)
  
    const voxel3 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel3.position.set(-customRand(), customRand(), -customRand())
    objects.push(voxel3)
    group.add(voxel3)
    
  
    const voxel4 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel4.position.set(-customRand(), customRand(), customRand())
    objects.push(voxel4)
    group.add(voxel4)
    
  
    const voxel5 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel5.position.set(customRand(), customRand(), customRand())
    objects.push(voxel5)
    group.add(voxel5)
    
  
    const voxel6 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel6.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel6)
    group.add(voxel6)
    
  
    const voxel7 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel7.position.set(-customRand(), customRand(), customRand())
    objects.push(voxel7)
    group.add(voxel7)
    
    const voxel8 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel8.position.set(customRand(), customRand(), customRand())
    objects.push(voxel8)
    group.add(voxel8)
  
    
    const voxel9 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel9.position.set(customRand(), customRand(), -customRand())
    objects.push(voxel9)
    group.add(voxel9)
    
  
    const voxel10 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel10.position.set(customRand(), -customRand(), customRand())
    objects.push(voxel10)
    group.add(voxel10)
    
    const voxel11 = new THREE.Mesh(
        generalGeometry,
        meshComponents.material
    )
    voxel11.position.set(-customRand(), -customRand(), -customRand())
    objects.push(voxel11)
    group.add(voxel11)
    
    homeGroup.add(group)
    
    group.add(originalCube)
    
    gsap.to(
      voxel1.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -12,
        y: 20,
        z: 4
      }
    )
    gsap.to(
      voxel2.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -12,
        y: 12,
        z: 4
      }
    )
    gsap.to(
      voxel3.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -12,
        y: 4,
        z: 4
      }
    )
    gsap.to(
      voxel4.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -4,
        y: 4,
        z: 4
      }
    )
    gsap.to(
      voxel5.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: -4,
        y: -4,
        z: 4
      }
    )
    gsap.to(
      voxel6.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 4,
        y: 12,
        z: 4
      }
    )
    gsap.to(
      voxel7.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 12,
        y: 4,
        z: 4
      }
    )
    gsap.to(
      voxel8.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 20,
        y: 20,
        z: 4
      }
    )
    gsap.to(
      voxel9.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 12,
        y: -4,
        z: 4
      }
    )
    gsap.to(
      voxel10.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 20,
        y: 4,
        z: 4
      }
    )
    gsap.to(
      voxel11.position,
      {
        duration: 1.5,
        ease: 'power2.inOut',
        x: 20,
        y: 12,
        z: 4
      }
    )
    gsap.to(
      group.rotation,
      {
        duration: 2.5,
        delay: 1.6,
        ease: "elastic.out(1, 0.6)",
        y: -2 * (Math.PI)
      }
    )

    //THIS HAS THE RESET
    gsap.to(
      group.position,
      {
        duration: 1.5,
        delay: 4.2,
        x:customRand(),
        y:-customRand(),
        z:customRand(),
        onComplete: function(){ 
          homeGroup.remove(group)
          onResetClick()
          scene.remove(homeGroup)
          initWorks()
        }
      }
    )

    gsap.to(
      camera.position,
      {
        duration: 1.5,
        delay: 4.2,
        x:0,
        y:7,
        z:7
      }
    )
    gsap.to(
      scene.background,
      {
        duration: 2,
        delay: 3.7,
        r:0,
        g:0,
        b:0
      }
    )
}
function farthestPoint(){
    const positionAttribute = finalMesh.geometry.getAttribute( 'position' );
    const result = {
      maxValue: 0,
      x: 0,
      y: 0,
      z: 0
    }
    const origin = new THREE.Vector3(0, 0, 0)
    const vertex = new THREE.Vector3();
  
    for ( 
      let vertexIndex = 0;
      vertexIndex < positionAttribute.count;
      vertexIndex ++
    ) {
        vertex.fromBufferAttribute( positionAttribute, vertexIndex );
        let distance = origin.distanceTo(vertex)
      if(distance > result.maxValue){
        result.maxValue = distance
        result.x = vertex.x
        result.y = vertex.y
        result.z = vertex.z
      }
    }
    return result
}
function disposeObject( object ){
    object.geometry.dispose()
    object.material.dispose()
    homeGroup.remove(object)
    objects.splice(objects.indexOf( object ), 1)
    renderer.renderLists.dispose()
}
function pathResolve(initPoint){
    const positionAttribute = finalMesh.geometry.getAttribute( 'position' );
    const result = {
        minValue: 10000,
        x: 0,
        y: 0,
        z: 0
    }
    const vertex = new THREE.Vector3();
    const initialPoint = new THREE.Vector3(
            initPoint.x,
            initPoint.y,
            initPoint.z)
    vertices.push(initialPoint)

    for ( 
        let vertexIndex = 0;
        vertexIndex < positionAttribute.count;
        vertexIndex ++
    ) {
        vertex.fromBufferAttribute( positionAttribute, vertexIndex );
        const arr = vertices.filter( vertice => vertex.equals(vertice))
        if(arr.length) continue;
        let distance = initialPoint.distanceTo(vertex)
        if(distance < result.minValue && distance){
        result.minValue = distance
        result.x = vertex.x
        result.y = vertex.y
        result.z = vertex.z
        }
        if(distance === 8) break;
    }
    return result
}
function clearWorkspace(){
    if( finalMesh || fatString ) { onResetClick(); return }
    if( objects.length <= 1 ) { return }
    objects
      .filter(object => object !== originalCube)
      .forEach((voxel, idx) => {
        gsap.to(
          voxel.position,
          {
            duration: 2,
            ease: 'power2.inOut',
            x: (Math.pow(-1,idx)) * customRand(),
            y: (Math.pow(-1,idx)) * customRand(),
            z: (Math.pow(-1, idx + 1)) * customRand(),
            onComplete: () =>{
                disposeObject(voxel)
            }
          }
        )
      })
}
function getRaycasterObj(){
    let objToRet = {}
    const intersects = raycaster.intersectObjects(
      objects,
      false
    )
    if(intersects.length){
      objToRet = intersects[0]
    }
    return objToRet
}
function aTransition(){
    orbitControls.enablePan = false
    orbitControls.minDistance = 17
    orbitControls.maxDistance = 30
    orbitControls.enableDamping = true
    orbitControls.autoRotate = true
    orbitControls.maxAzimuthAngle = Math.PI * (1/4)
    orbitControls.minAzimuthAngle = -Math.PI * (1/4)
    orbitControls.autoRotateSpeed = rotationSpeed
    orbitControls.maxPolarAngle = Math.PI * (5/8)
    orbitControls.minPolarAngle = Math.PI * (1/4)
    camera.position.set(0,7,20)
    isAbout = true
    aboutGroup.scale.set(0.01,0.01,0.01)
    scene.add(aboutGroup)
    loadBars.style.opacity = 0
    gsap.to(
      aboutGroup.scale,
      {
        duration: 1.4,
        delay: 0.3,
        x: 1,
        y: 1,
        z: 1
      } 
    )
    gsap.to(
      particles.material,
      {
        duration: 1.4,
        delay: 0.3,
        opacity: 1
      }
    )
}



//ABOUT FUNCTIONS
function toggleRotation(){
    orbitControls.update()
    const azimut = orbitControls.getAzimuthalAngle()

    if(azimut >= ( Math.PI * (1/4) - 0.001 ) && rotationSpeed === -0.2){
        rotationSpeed = 0.2
        orbitControls.autoRotateSpeed = rotationSpeed
    }else if(azimut <= ( - Math.PI * (1/4) + 0.001 ) && rotationSpeed === 0.2){
        rotationSpeed = -0.2
        orbitControls.autoRotateSpeed = rotationSpeed
    }
}
function hoverSpheres(){
    for(const point of points){
        const screenPosition = point.position.clone()
        screenPosition.project(camera)

        //HTML Managemnt
        const translateX = screenPosition.x * window.innerWidth * 0.5
        const translateY = - screenPosition.y * window.innerHeight * 0.5
        point.element.style.transform = `translate(${translateX}px, ${translateY}px)`

        //Raycaster hover
        raycaster.setFromCamera(pointer, camera)
        const intersects = raycaster.intersectObject(point.mesh, true)
        if(intersects.length){
            point.element.classList.add('visible')
        }else{
            point.element.classList.remove('visible')
        }
    }
}
function initAbout(){
    points.push(...[
        {
            position: new THREE.Vector3(-1.35, 2.8, 0.4),
            element: document.querySelector('.point-1'),
        },
        {
            position: new THREE.Vector3(1.9, 2.8, 0.4),
            element: document.querySelector('.point-2')
        },
        {
            position: new THREE.Vector3(-2.1, 0, 0.3),
            element: document.querySelector('.point-3')
        },
        {
            position: new THREE.Vector3(2.75, 0.2, 0.0),
            element: document.querySelector('.point-4')
        },
        {
            position: new THREE.Vector3(0, -2, 0),
            element: document.querySelector('.point-5')
        },
        {
            position: new THREE.Vector3(0, 0, 0),
            element: document.querySelector('.point-6')
        }
    ]
)
    //HOVER-MESH
    const sphereGeometry = new THREE.SphereGeometry(1, 8, 8)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.0 })

    for(const point of points){
        const sphere = new THREE.Mesh(
            sphereGeometry,
            sphereMaterial
        )
        sphere.position.set(point.position.x, point.position.y, point.position.z)
        point.mesh = sphere
        aboutGroup.add(sphere)
    }
    loadBars = document.querySelector('.bars-6')
}
function endAbout(){
    isAbout = false
    orbitControls.minDistance = 9
    orbitControls.maxDistance = 150
    orbitControls.enablePan = false
    orbitControls.enableDamping = false
    orbitControls.autoRotate = false
    orbitControls.maxAzimuthAngle = Infinity
    orbitControls.minAzimuthAngle = Infinity
    orbitControls.autoRotateSpeed = rotationSpeed
    orbitControls.maxPolarAngle = Math.PI
    orbitControls.minPolarAngle = 0
    onResetClick()
    gsap.to(
      aboutGroup.scale,
      {
        duration: 1.4,
        x: 0.01,
        y: 0.01,
        z: 0.01,
        onComplete: () =>{
            scene.remove(aboutGroup)
        }
      }
    )
    gsap.to(
      particles.material,
      {
        duration: 1.4,
        opacity: 0,
        onComplete: () =>{
          scene.remove(particles)
        }
      }
    )

    gsap.to(
      scene.background,
      {
        duration: 1.4,
        r:0.812,
        g:0.812,
        b:0.812,
        onComplete: () =>{
          camera.position.set(24, 18, 250)
          scene.add(homeGroup)
          initAnimation()
          orbitControls.update()
        }
      }
    )
    
}

//WORKS FUNCTIONS
function initWorks(){
  orbitControls.minDistance = 7
  orbitControls.maxDistance = 20

  velocityVector = 
    new Array(numProjects)
    .fill(0)
    .map(ele => ({
      x:customRand(-0.007,0.007),
      y:customRand(-0.007,0.007),
      z:customRand(-0.007,0.007)
      })
    )
  //Spheres initialization
  const sphereGeometry = new THREE.SphereGeometry( sphereRadius, 16, 16 )
  
  //Array of spheres
  worksPositions = new Array(numProjects)
              .fill(0)
              .map(element => new THREE.Mesh(
                    sphereGeometry, 
                    new THREE.MeshBasicMaterial()
                  ))
  worksPositions.forEach(sphere => {
                    sphere.position.set(
                      customRand(-3,3),
                      customRand(-3,3),
                      customRand(-3,3)
                    )
                  })
  workGroup.add(...worksPositions)

  //Lines Generator
  linesVertexs = combinatorFloat32(numProjects)
  linesColors = new Float32Array(linesVertexs.length)
  const geometry = new THREE.BufferGeometry()
  geometry
    .setAttribute('position', 
                  new THREE
                  .BufferAttribute(linesVertexs,3)
                  .setUsage( THREE.DynamicDrawUsage ))
  geometry
    .setAttribute('color', 
                  new THREE
                  .BufferAttribute(linesColors,3)
                  .setUsage( THREE.DynamicDrawUsage ))
  const material = new THREE.LineBasicMaterial( { 
          vertexColors: true,
					blending: THREE.AdditiveBlending,
          depthWrite: false,
					transparent: true
  } )

  linesMesh = new THREE.LineSegments( geometry, material )
  workGroup.add(linesMesh)

  //Wireframe box
  const helper = new THREE.BoxHelper( 
    new THREE.Mesh( new THREE.BoxGeometry( radio, radio, radio) ) 
  )
  helper.material.color.setHex( 0xffffff )
  helper.material.blending = THREE.AdditiveBlending
  helper.material.transparent = true
  workGroup.add(helper)

  window.addEventListener('pointerdown', onClickSphere)
  isWork = true
  workGroup.scale.set(1, 1, 1)

  scene.add(workGroup)

}
function combinatorFloat32( numOfVertex = 10 ){
  let arrVertex = new Array(numOfVertex)
  .fill(0)
  .map(ele => ([
      customRand(-4,4),
      customRand(-4,4),
      customRand(-4,4)
      ])
    )
  
  const arrLength = arrVertex.length
  const resultArr = []
  
  for(let i = 0; i < arrLength; i++){
    for(let j = i + 1; j < arrLength; j++){
      resultArr.push([arrVertex[i],arrVertex[j]])
    }
  }
  return new Float32Array(resultArr.flat(2))
}
function moveSpheres(){
  for(let idx = 0; idx < worksPositions.length; idx++){
    
    worksPositions[idx].position.x += velocityVector[idx].x
    worksPositions[idx].position.y += velocityVector[idx].y
    worksPositions[idx].position.z += velocityVector[idx].z
    
    velocityVector[idx].x *= 
      Math.abs(worksPositions[idx].position.x) < (radio/2 - sphereRadius) ? 1 : -1
    velocityVector[idx].y *= 
      Math.abs(worksPositions[idx].position.y) < (radio/2 - sphereRadius) ? 1 : -1
    velocityVector[idx].z *= 
      Math.abs(worksPositions[idx].position.z) < (radio/2 - sphereRadius) ? 1 : -1
    
    let offset = 0
    for(let i = 1; i <= idx; i++){
      offset += numProjects - i
    }
    offset *= 6
    
    for(let i = 0; i < numProjects - 1 - idx; i++){
      linesVertexs[ offset + (i*6) ] = worksPositions[idx].position.x
      linesVertexs[ offset + (i*6) + 1 ] = worksPositions[idx].position.y
      linesVertexs[ offset + (i*6) + 2 ] = worksPositions[idx].position.z
      
      linesVertexs[ offset + (i*6) + 3 ] = worksPositions[idx + i + 1].position.x
      linesVertexs[ offset + (i*6) + 4 ] = worksPositions[idx + i + 1].position.y
      linesVertexs[ offset + (i*6) + 5 ] = worksPositions[idx + i + 1].position.z
      
      let dx = worksPositions[idx].position.x - worksPositions[idx + i + 1].position.x
      let dy = worksPositions[idx].position.y - worksPositions[idx + i + 1].position.y
      let dz = worksPositions[idx].position.z - worksPositions[idx + i + 1].position.z
      const distance = Math.sqrt(dx*dx + dy*dy + dz*dz)
      let alpha = 1.0 - ((distance*distance*distance)/(minDistance*minDistance*minDistance))
      alpha = alpha < 0 ? 0 : alpha
      
      linesColors[ offset + (i*6) ] = alpha
      linesColors[ offset + (i*6) + 1 ] = alpha
      linesColors[ offset + (i*6) + 2 ] = alpha
      linesColors[ offset + (i*6) + 3 ] = alpha
      linesColors[ offset + (i*6) + 4 ] = alpha
      linesColors[ offset + (i*6) + 5 ] = alpha
    }
    
  }
  linesMesh
    .geometry
    .attributes
    .position
    .needsUpdate = true
  linesMesh
    .geometry
    .attributes
    .color
    .needsUpdate = true
}
function focusSphere(){
  const intersects = raycaster.intersectObjects(worksPositions, false)
  currentIntersect = intersects.length ? intersects[0] : null
  worksPositions.forEach(sphere => sphere.material.color.set(0xffffff))
  if(currentIntersect || focusObject){
    customColor1 = customColor1 ? 
      customColor1 :
      `#${colorsArray[Math.floor(customRand(0,colorsArray.length))]}`
    customColor2 = customColor2 ?
      customColor2 :
      `#${colorsArray[Math.floor(customRand(0,colorsArray.length))]}`
    
    currentIntersect?.object.material.color.set(customColor1)
    focusObject?.material.color.set(customColor2)
  }
  if(!currentIntersect){
    customColor1 = null
  }
  if(!focusObject){
    customColor2 = null
  }
}
function onClickSphere( event ){
  updatePointer(event)
  const intersects = raycaster.intersectObjects(worksPositions, false)
  let sphereChoosen = intersects.length ? intersects[0] : null
  if(!sphereChoosen) return;
  if(sphereChoosen.object.uuid === focusObject?.uuid) return;
  
  gsap.killTweensOf(orbitControls.target, "x,y,z")
  orbitControls.enabled = false
  const idx = worksPositions.indexOf(sphereChoosen.object)
  let auxVelocity = velocityVector[idx]
  velocityVector[idx] = {
    x:0,
    y:0,
    z:0
  }
  focusObject = null
  gsap.to(
    orbitControls.target,
    {
      duration:1.5,
      x:sphereChoosen.object.position.x,
      y:sphereChoosen.object.position.y,
      z:sphereChoosen.object.position.z,
      onComplete:()=>{
        focusObject = sphereChoosen.object
        orbitControls.enabled = true
        velocityVector[idx] = auxVelocity
        testVaraible = true
      },
      onInterrupt: ()=>{
        velocityVector[idx] = auxVelocity
      }
    }
  )
  
}
function endWorks(){
    isWork = false
    orbitControls.minDistance = 9
    orbitControls.maxDistance = 150
    orbitControls.enablePan = false
    orbitControls.enableDamping = false
    orbitControls.autoRotate = false
    orbitControls.maxAzimuthAngle = Infinity
    orbitControls.minAzimuthAngle = Infinity
    orbitControls.autoRotateSpeed = rotationSpeed
    orbitControls.maxPolarAngle = Math.PI
    orbitControls.minPolarAngle = 0
    onResetClick()
    gsap.to(
      workGroup.scale,
      {
        duration: 1.4,
        x: 0.01,
        y: 0.01,
        z: 0.01,
        onComplete: () =>{
            scene.remove(workGroup)
        }
      }
    )
    gsap.to(
      particles.material,
      {
        duration: 1.4,
        opacity: 0,
        onComplete: () =>{
          scene.remove(particles)
        }
      }
    )

    gsap.to(
      scene.background,
      {
        duration: 1.4,
        r:0.812,
        g:0.812,
        b:0.812,
        onComplete: () =>{
          camera.position.set(24, 18, 250)
          scene.add(homeGroup)
          initAnimation()
          orbitControls.update()
          for(let i= workGroup.children.length - 1; i >= 0; i--){
            disposeObject(workGroup.children[i])
          }
          workGroup.children.splice(0, workGroup.children.length)
        }
      }
    )
}

function onResetCamera(){
  focusObject = null
  gsap.killTweensOf(orbitControls.target, "x,y,z")
  gsap.to(
    orbitControls.target,
    {
      duration:1.3,
      x:0,
      y:0,
      z:0,
      onComplete: ()=>{
        testVaraible = false
        orbitControls.enabled = true
      }
    }
  )
}


//Listeners functions
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    
    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
}


function initAnimation(){
  onResetClick()
  gsap.to(
    camera.position,
    {
      duration: 2,
      ease: 'power2.inOut',
      onComplete: function(){orbitControls.enabled = true},
      x: 4.5,
      y: 3.7,
      z: 50
    }
  )
  gsap.to(
    originalCube.rotation,
    {
      duration: 2,
      ease: 'power2.inOut',
      x: 2 * (Math.PI),
      y: -2 * (Math.PI),
      z: 2 * (Math.PI)
    }
  )
}

function animate(){
  if(isAbout){
      toggleRotation()
      hoverSpheres()
  }
  if(isWork){
    moveSpheres()
    focusSphere()
    if(focusObject){ 
      orbitControls
      .target
      .set(focusObject.position.x,focusObject.position.y,focusObject.position.z)
    }
    orbitControls.update()
  }
  

    //Renderer
  renderer.render(scene, camera)

  // Call tick again on the next frame
  /*animationFrame = */window.requestAnimationFrame(animate)
}

export default ThreeController

export {onMergeClick, onResetClick, onStringClick, aChar, cChar, wChar, initAbout, endAbout, testVaraible, onResetCamera, endWorks}