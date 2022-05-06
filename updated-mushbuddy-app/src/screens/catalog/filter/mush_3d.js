import React, { useState, useEffect } from 'react';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
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

const Mush3D = ({ capShape }) => {
    const [camera, setCamera] = useState(null);
    const [cap, setCap] = useState(null);

    const [scene] = useState(new Scene());

    const objectLoader = new OBJLoader();

    let timeout;

    // Clear the animation loop when the component unmounts.
    useEffect(() => {
        return () => clearTimeout(timeout);
    }, []);

    // Sync capShape prop to state
    // Listening for changes to state in catalog_filter.js (parent component)
    useEffect(() => {
        const loadCap = async () => {
            const capAsset = Asset.fromModule(capModels[capShape + '_r']);
            await capAsset.downloadAsync();

            const capObject = await objectLoader.loadAsync(capAsset.uri);
            capObject.traverse((obj) => {
                if (obj.isMesh) {
                    obj.material = new THREE.MeshNormalMaterial();
                }
            });

            // Rescale
            capObject.scale.set(0.15, 0.15, 0.15);

            // Remove previous cap, if any
            if (cap != null) {
                scene.remove(cap);
            }

            // Add new cap
            scene.add(capObject);
            setCap(capObject);
        }
        if (capShape !== '') {
            loadCap().catch(console.error);
        }
    }, [capShape]);

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
        
        // Add fog
        scene.fog = new Fog(sceneColor, 1, 1000);

        // Add grid
        scene.add(new GridHelper(10, 20));

        // Add lights
        const ambientLight = new AmbientLight(0x101010);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

        // Add stem

        // Load in asset
        const stemAsset = Asset.fromModule(require('../../../../assets/mushroom/stem.obj'));
        await stemAsset.downloadAsync();

        // Load in object

        const stemObject = await objectLoader.loadAsync(stemAsset.uri);

        // Default material assignment
        stemObject.traverse((obj) => {
            if (obj.isMesh) {
                //obj.material.color.setHex(0xD04122);
                obj.material = new THREE.MeshNormalMaterial();
            }
        });

        // Rescale
        stemObject.scale.set(0.15, 0.15, 0.15);

        // Add to scene
        scene.add(stemObject);

        //camera.lookAt(object.position);

        const render = () => {
            timeout = requestAnimationFrame(render);
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        render();
    }

    return (
        <OrbitControlsView
            style={{
                //flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'red',
                //borderRadius: 12,
                //width: 275,
                marginLeft: 34,
                marginRight: 34,
            }}
            camera={camera}
        >
            <GLView
                style={{ width: 275, height: 275, borderColor: 'transparent', borderWidth: 1 }}
                onContextCreate={onContextCreate}
            />
        </OrbitControlsView>
    );
}

const capModels = {
    'convex_r': require('../../../../assets/mushroom/caps/convex_ridges.obj'),
    'flat_r': require('../../../../assets/mushroom/caps/flat_ridges.obj'),
    'umbonate_r': require('../../../../assets/mushroom/caps/umbonate_ridges.obj'),
    'ovate_r': require('../../../../assets/mushroom/caps/ovate_ridges.obj'),
    'campanulate_r': require('../../../../assets/mushroom/caps/campanulate_ridges.obj'),
    'umbilicate_r': require('../../../../assets/mushroom/caps/umbilicate_ridges.obj'),
    'conical_r': require('../../../../assets/mushroom/caps/conical_ridges.obj'),
    'depressed_r': require('../../../../assets/mushroom/caps/depressed_ridges.obj'),
    'offset_r': require('../../../../assets/mushroom/caps/offset_ridges.obj'),
    'infundibuliform_r': require('../../../../assets/mushroom/caps/infundibuliform_ridges.obj'),
};

export default Mush3D;