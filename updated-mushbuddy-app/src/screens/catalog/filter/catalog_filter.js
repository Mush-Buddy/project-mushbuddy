import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import styles from '../../../components/stylesheets/catalog_styles/filter_style';
import Carousel from './carousel';

import Options from './index_options';

//import { GLView } from 'expo-gl';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import ExpoTHREE from 'expo-three';
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
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const CatalogFilter = ({ navigation }) => {
    const [cap, setCap] = useState('');
    const [hymenium, setHymenium] = useState('');
    const [gillType, setGillType] = useState('');
    const [veil, setVeil] = useState('');

    const clearCap = useRef(null);
    const clearHymenium = useRef(null);
    const clearGillType = useRef(null);
    const clearVeil = useRef(null);

   let timeout;

   useEffect(() => {
       return () => clearTimeout(timeout);
   }, []);

    const resetSelections = () => {

        setCap('');
        setHymenium('');
        setGillType('');
        setVeil('');

        clearCap.current();
        clearHymenium.current();
        clearGillType.current();
        clearVeil.current();
    }

    const returnToCatalog = () => {
        navigation.navigate('MushroomCatalog');
    }

    const onCapSelected = (selectedLabel) => {
        setCap(selectedLabel);
    }

    const onHymeniumSelected = (selectedLabel) => {
        setHymenium(selectedLabel);
    }

    const onGillTypeSelected = (selectedLabel) => {
        setGillType(selectedLabel);
    }

    const onVeilSelected = (selectedLabel) => {
        setVeil(selectedLabel);
    }

    const processCriteria = () => {

        var criteria = {};

        if (cap !== '') {
            criteria['capShape'] = cap;
        }

        if (hymenium !== '') {
            criteria['gillsType'] = hymenium;
        }

        // Needs reworking; temporary solution for now.
        if (gillType !== '') {
            criteria['gillsAttachment'] = 'Yes'; // TEMP
        }

        if (veil !== '') {
            criteria['veilType'] = veil;
        }

        return criteria;
    }

    const renderModel = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <GLView
                    style={{ width: 200, height: 200, borderColor: 'red', borderWidth: 1 }}
                    onContextCreate={async (gl) => {
                        const sceneColor = 0x6ad6f0;

                        // Create a WebGLRenderer
                        const renderer = new Renderer({ gl });
                        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
                        renderer.setClearColor(sceneColor);

                        // Parameters: Field of view (vertical), aspect ratio, near plane, far plane
                        const camera = new PerspectiveCamera(45, gl.drawingBufferWidth / gl.drawingBufferHeight, 1, 1000);
                        camera.position.set(5, 0, 5);

                        const scene = new Scene();
                        scene.fog = new Fog(sceneColor, 1, 1000);
                        scene.add(new GridHelper(10, 10));

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

                        const materialAsset = Asset.fromModule(require('../../../../assets/mushroom/Pilz.mtl'));
                        await materialAsset.downloadAsync();

                        const objectLoader = new OBJLoader();
                        const materialLoader = new MTLLoader();

                        const mush_material = await materialLoader.loadAsync(materialAsset.uri);
                        mush_material.preload();
                        //objectLoader.setMaterials(material);

                        const object = await objectLoader.loadAsync(asset.uri);
                        object.traverse((obj) => {
                            if (obj.isMesh) {
                                //obj.material = mush_material;
                                obj.material.color.setHex(0xD04122);
                            }
                        })
                        // object.traverse = (child) => {
                        //     if (child instanceof THREE.Mesh) {
                        //         child.material.color.setHex(0xD04122);
                        //     }
                        // };
                        //object.material = mush_material;
                        //object.scale.set(0.025, 0.025, 0.025);
                        scene.add(object);
                        camera.lookAt(object.position);

                        const render = () => {
                            timeout = requestAnimationFrame(render);
                            renderer.render(scene, camera);
                            gl.endFrameEXP();
                        };
                        render();
                    }}
                />
            </View>
        );
    }

    // const renderModel = () => {
    //     return (
    //         <GLView
    //             style={{ width: 300, height: 300 }}
    //             onContextCreate={onContextCreate}
    //         />
    //     );
    // }

    // const onContextCreate = (gl) => {
    //     gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    //     gl.clearColor(0, 1, 1, 1);

    //     // Create vertex shader (shape & position)
    //     const vert = gl.createShader(gl.VERTEX_SHADER);
    //     gl.shaderSource(
    //         vert,
    //         `
    //         void main(void) {
    //             gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    //             gl_PointSize = 150.0;
    //         }
    //         `
    //     );

    //     gl.compileShader(vert);

    //     // Create fragment shader (color)
    //     const frag = gl.createShader(gl.FRAGMENT_SHADER);
    //     gl.shaderSource(
    //         frag,
    //         `
    //         void main(void) {
    //             gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    //         }
    //         `
    //     );
    //     gl.compileShader(frag);

    //     // Link together into a program
    //     const program = gl.CreateProgram();
    //     gl.attachShader(program, vert);
    //     gl.attachShader(program, frag);
    //     gl.linkProgram(program);
    //     gl.useProgram(program);

    //     gl.clear(gl.COLOR_BUFFER_BIT);
    //     gl.drawArrays(gl.POINTS, 0, 1);

    //     gl.flush();
    //     gl.endFrameEXP();
    // }

    // const renderModelView = () => {
    //     return (
    //         <ModelView
    //             model={{
    //                 uri: 'moon.obj',
    //             }}
    //             texture={{
    //                 uri: 'map.jpg',
    //             }}

    //             scale={0.01}
    //             translateZ={-2}
    //             rotateZ={270}
    //             style={{flex:1}}

    //         />
    //     );
    // }

    const renderButtons = () => {
        return (
            <View style={styles.bottomBar}>
                {renderClearButton()}
                {renderSubmitButton()}
            </View>
        );
    }

    const renderClearButton = () => {
        return (
            <LinearGradient
                colors={['#7a95e4', '#787ee3']}
                style={styles.button}
            >
                <TouchableOpacity
                    onPress={resetSelections}
                >
                    <Text style={styles.buttonText}>
                        Clear selections
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    // TODO: Handle submit
    const renderSubmitButton = () => {
        //processCriteria();
        return (
            <LinearGradient
                colors={['#5cc76d', '#60af85']}
                style={styles.button}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('filteredPage', processCriteria())}
                >
                    <Text style={styles.buttonText}>
                        Filter by these selections
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    // Button to go back to viewing main catalog
    const renderUpperNavigation = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => { returnToCatalog(); }}
                    style={styles.backButton}
                >
                    <Icon name='arrow-back' size={30} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Filter
                </Text>
            </View>
        );
    }

    // Selectable options for cap shape (11)
    const renderCapOptions = (options) => {
        return (
            <Carousel
                carouselType='cap'
                items={options}
                onSelect={onCapSelected}
                clearCarousel={clearCap}
            />
        );
    }

    const renderHymeniumOptions = (options) => {
        return (
            <Carousel
                carouselType='hymenium'
                items={options}
                onSelect={onHymeniumSelected}
                clearCarousel={clearHymenium}
            />
        );
    }

    const renderGillTypeOptions = (options) => {
        return (
            <Carousel
                carouselType='gillAttachment'
                items={options}
                onSelect={onGillTypeSelected}
                clearCarousel={clearGillType}
            />
        );
    }

    const renderVeilOptions = (options) => {
        return (
            <Carousel
                carouselType='veil'
                items={options}
                onSelect={onVeilSelected}
                clearCarousel={clearVeil}
            />
        );
    }

    const renderSubheader = (subheader) => {
        return (
            <Text style={styles.subheaderText}>
                {subheader}
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderUpperNavigation()}

                {renderModel()}

                <View style={styles.carouselsContainer}>
                    {renderSubheader('What type of cap does your mushroom have?')}
                    {renderCapOptions(Options.cap)}
                </View>

                <View style={styles.carouselsContainer}>
                    {renderSubheader('What type of spore-bearing surface (hymenium) does your mushroom have?')}
                    {renderHymeniumOptions(Options.hymenium)}
                </View>

                <View style={styles.carouselsContainer}>
                    {renderSubheader('How does the spore-bearing surface (hymenium) you chose above attach to the stem?')}
                    {renderGillTypeOptions(Options.gillAttachment)}
                </View>
                <View style={styles.carouselsContainer}>
                    {renderSubheader('Is a veil (universal or partial) present?')}
                    {renderVeilOptions(Options.veil)}
                </View>

                {renderButtons()}

            </ScrollView>
        </View>
    );
}

export default CatalogFilter;