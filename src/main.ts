import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let mixer: THREE.AnimationMixer

init()
render()

function init() {

    const container = document.createElement('div')
    document.body.appendChild(container)

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20)
    camera.position.set(0, 2, 3)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    const light = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(light)


    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }))
    mesh.rotation.x = - Math.PI / 2
    scene.add(mesh)

    const loader = new GLTFLoader().setPath('models/')
    loader.load('BrainStem.gltf', function (gltf) {
        scene.add(gltf.scene)

        render()
    })

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', render) // use if there is no animation loop
    controls.minDistance = 2
    controls.maxDistance = 10
    controls.target.set(0, 1, 0)
    controls.update()

    window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

    render()
}

function render() {
    renderer.render(scene, camera)
}