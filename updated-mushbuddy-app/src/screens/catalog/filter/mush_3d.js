import React, { useState, useEffect } from 'react';
import { GLView } from 'expo-gl';
import { Renderer  } from 'expo-three';
import * as THREE from 'three';
import {
    AmbientLight,
    Fog,
    GridHelper,
    PerspectiveCamera,
    PointLight,
    Scene,
    SpotLight,
} from 'three';
import { Asset } from 'expo-asset';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import OrbitControlsView from 'expo-three-orbit-controls';

// import { ExpoWebGLRenderingContext } from 'expo-gl';
// import { TextureLoader } from 'expo-three';
// import ExpoTHREE from 'expo-three';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const Mush3D = () => {
    const [camera, setCamera] = useState(null);

    let timeout;

    // Clear the animation loop when the component unmounts.
    useEffect(() => {
        return () => clearTimeout(timeout);
    }, []);

    const onContextCreate = async (gl) => {
        const sceneColor = 0x6ad6f0;

        // Create a WebGLRenderer
        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
        renderer.setClearColor(sceneColor);

        // Parameters: Field of view (vertical), aspect ratio, near plane, far plane
        const camera = new PerspectiveCamera(42.5, gl.drawingBufferWidth / gl.drawingBufferHeight, 1, 1000);
        camera.position.set(0, 0, 5);

        setCamera(camera);

        const scene = new Scene();
        scene.fog = new Fog(sceneColor, 1, 1000);

        scene.add(new GridHelper(10, 20));

        const ambientLight = new AmbientLight(0x101010);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

        //const asset = Asset.fromModule(require('../../../../assets/moon.obj'));
        const asset = Asset.fromModule(require('../../../../assets/mushroom/Pilz.obj'));
        await asset.downloadAsync();

        // const materialAsset = Asset.fromModule(require('../../../../assets/mushroom/Pilz.mtl'));
        // await materialAsset.downloadAsync();

        const objectLoader = new OBJLoader();

        // const materialLoader = new MTLLoader();
        // const mush_material = await materialLoader.loadAsync(materialAsset.uri);
        // mush_material.preload();

        const object = await objectLoader.loadAsync(asset.uri);
        object.traverse((obj) => {
            if (obj.isMesh) {
                //obj.material.color.setHex(0xD04122);
                obj.material = new THREE.MeshNormalMaterial();
            }
        });

        //object.scale.set(0.025, 0.025, 0.025);
        scene.add(object);
        camera.lookAt(object.position);

        const render = () => {
            timeout = requestAnimationFrame(render);
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        render();
    }

    return (
        <OrbitControlsView
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            camera={camera}
        >
            <GLView
                style={{ width: 200, height: 200, borderColor: 'transparent', borderWidth: 1 }}
                onContextCreate={onContextCreate}
            />
        </OrbitControlsView>
    );
}

export default Mush3D;