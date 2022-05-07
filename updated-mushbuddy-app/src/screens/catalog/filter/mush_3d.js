import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
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

const Mush3D = ({ capShape, gillsType }) => {

    // Ignoring an annoying warning that hasn't been fixed by source pkg.
    LogBox.ignoreLogs(['THREE.Quaternion: .inverse() has been renamed to invert().']);

    const [camera, setCamera] = useState(null);
    const [cap, setCap] = useState(null);
    const [gills, setGills] = useState(null);

    const [scene] = useState(new Scene());

    const objectLoader = new OBJLoader();

    let timeout;

    // Clear the animation loop when the component unmounts.
    useEffect(() => {
        return () => clearTimeout(timeout);
    }, []);

    // Sync capShape prop to state
    // Listening for changes to state in catalog_filter.js (parent component)
    // TODO: Preserve gillsType if prev. specified
    useEffect(() => {
        const loadCap = async () => {

            // Always remove the previous cap, upon selection - if any.
            if (cap != null) {
                scene.remove(cap);
            }

            if (gills != null) {
                scene.remove(gills);
            }

            if (capShape != 'none') {
            
                const capAsset = Asset.fromModule(capModels[capShape + '_' + ((gillsType === '' || gillsType === 'none') ? 'r' : gillsType.charAt(0))]);
                await capAsset.downloadAsync();

                const capObject = await objectLoader.loadAsync(capAsset.uri);

                // Assign default material
                capObject.traverse((obj) => {
                    if (obj.isMesh) {
                        obj.material = new THREE.MeshNormalMaterial();
                    }
                });

                // Rescale
                capObject.scale.set(0.15, 0.15, 0.15);

                // Add new cap
                scene.add(capObject);
                setCap(capObject);
            }
        }
        if (capShape !== '') {
            loadCap().catch(console.error);
        }
    }, [capShape]);

    // Same cap diff. gills
    // Option 1: User selects gills before selecting cap --> popup "please select a cap first"
    // Or rather don't let the user do that altogether.
    // So mandate the existence of a selected cap
    useEffect(() => {
        const loadGills = async () => {

            // Always remove the previous cap, with the outdated gills, upon selection - if any.
            if (cap != null) {
                scene.remove(cap);
            }

            if (gills != null) {
                scene.remove(gills);
            }

            const gillsAsset = Asset.fromModule(capModels[capShape + '_' + (gillsType === 'none' ? 'r' : gillsType.charAt(0))]);
            await gillsAsset.downloadAsync();

            const gillsObject = await objectLoader.loadAsync(gillsAsset.uri);

            // Assign default material
            gillsObject.traverse((obj) => {
                if (obj.isMesh) {
                    obj.material = new THREE.MeshNormalMaterial();
                }
            });

            // Rescale
            gillsObject.scale.set(0.15, 0.15, 0.15);

            // Add new cap (with this specified type of gills)
            scene.add(gillsObject);
            setGills(gillsObject);
        }
        if (gillsType !== '') {
            loadGills().catch(console.error);
        }
    }, [gillsType]);

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
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 1,
                // borderColor: 'red',
                width: '95%',
                height: '95%',
            }}
            camera={camera}
        >
            <GLView
                style={{ width: '100%', height: '100%', borderColor: 'transparent', borderWidth: 1 }}
                onContextCreate={onContextCreate}
            />
        </OrbitControlsView>
    );
}

const capModels = {
    // ridges
    'convex_r': require('../../../../assets/mushroom/caps/ridges/convex_ridges.obj'),
    'flat_r': require('../../../../assets/mushroom/caps/ridges/flat_ridges.obj'),
    'umbonate_r': require('../../../../assets/mushroom/caps/ridges/umbonate_ridges.obj'),
    'ovate_r': require('../../../../assets/mushroom/caps/ridges/ovate_ridges.obj'),
    'campanulate_r': require('../../../../assets/mushroom/caps/ridges/campanulate_ridges.obj'),
    'umbilicate_r': require('../../../../assets/mushroom/caps/ridges/umbilicate_ridges.obj'),
    'conical_r': require('../../../../assets/mushroom/caps/ridges/conical_ridges.obj'),
    'depressed_r': require('../../../../assets/mushroom/caps/ridges/depressed_ridges.obj'),
    'offset_r': require('../../../../assets/mushroom/caps/ridges/offset_ridges.obj'),
    'infundibuliform_r': require('../../../../assets/mushroom/caps/ridges/infundibuliform_ridges.obj'),
    // pores
    'convex_p': require('../../../../assets/mushroom/caps/pores/convex_pores.obj'),
    'flat_p': require('../../../../assets/mushroom/caps/pores/flat_pores.obj'),
    'umbonate_p': require('../../../../assets/mushroom/caps/pores/umbonate_pores.obj'),
    'ovate_p': require('../../../../assets/mushroom/caps/pores/ovate_pores.obj'),
    'campanulate_p': require('../../../../assets/mushroom/caps/pores/campanulate_pores.obj'),
    'umbilicate_p': require('../../../../assets/mushroom/caps/pores/umbilicate_pores.obj'),
    'conical_p': require('../../../../assets/mushroom/caps/pores/conical_pores.obj'),
    'depressed_p': require('../../../../assets/mushroom/caps/pores/depressed_pores.obj'),
    'offset_p': require('../../../../assets/mushroom/caps/pores/offset_pores.obj'),
    'infundibuliform_p': require('../../../../assets/mushroom/caps/pores/infundibuliform_pores.obj'),
    // tooth
    'convex_t': require('../../../../assets/mushroom/caps/tooth/convex_tooth.obj'),
    'flat_t': require('../../../../assets/mushroom/caps/tooth/flat_tooth.obj'),
    'umbonate_t': require('../../../../assets/mushroom/caps/tooth/umbonate_tooth.obj'),
    'ovate_t': require('../../../../assets/mushroom/caps/tooth/ovate_tooth.obj'),
    'campanulate_t': require('../../../../assets/mushroom/caps/tooth/campanulate_tooth.obj'),
    'umbilicate_t': require('../../../../assets/mushroom/caps/tooth/umbilicate_tooth.obj'),
    'conical_t': require('../../../../assets/mushroom/caps/tooth/conical_tooth.obj'),
    'depressed_t': require('../../../../assets/mushroom/caps/tooth/depressed_tooth.obj'),
    'offset_t': require('../../../../assets/mushroom/caps/tooth/offset_tooth.obj'),
    'infundibuliform_t': require('../../../../assets/mushroom/caps/tooth/infundibuliform_tooth.obj'),
};

export default Mush3D;