if (BABYLON.Engine.isSupported()) {

    var soundMap = [
            { id: 11562879, sustain:true,  url: "sounds/Harder better faster stronger/beat.mp3"},

            { id: 9437311, sustain:true, url: "sounds/Harder better faster stronger/Harder1.mp3"},
            { id: 9437567, sustain:true, url: "sounds/Harder better faster stronger/Better1.mp3"},
            { id: 9437823, sustain:true, url: "sounds/Harder better faster stronger/Faster1.mp3"},
            { id: 9438079, sustain:true, url: "sounds/Harder better faster stronger/Stronger1.mp3"},
            { id: 9438335, sustain:true, url: "sounds/Harder better faster stronger/DoIt1.mp3"},
            { id: 9438591, sustain:true, url: "sounds/Harder better faster stronger/MakeIt1.mp3"},
            { id: 9438847, sustain:true, url: "sounds/Harder better faster stronger/MakesUs1.mp3"},
            { id: 9439103, sustain:true, url: "sounds/Harder better faster stronger/WorkIt1.mp3"},
            { id: 9439359, sustain:true, url: "sounds/Harder better faster stronger/WorkIs1.mp3"},

            { id: 9441407, sustain:true, url: "sounds/Harder better faster stronger/Harder2.mp3"},
            { id: 9441663, sustain:true, url: "sounds/Harder better faster stronger/Better2.mp3"},
            { id: 9441919, sustain:true, url: "sounds/Harder better faster stronger/Faster2.mp3"},
            { id: 9442175, sustain:true, url: "sounds/Harder better faster stronger/Stronger2.mp3"},
            { id: 9442431, sustain:true, url: "sounds/Harder better faster stronger/DoIt2.mp3"},
            { id: 9442687, sustain:true, url: "sounds/Harder better faster stronger/MakeIt2.mp3"},
            { id: 9442943, sustain:true, url: "sounds/Harder better faster stronger/MakesUs2.mp3"},
            { id: 9443199, sustain:true, url: "sounds/Harder better faster stronger/WorkIt2.mp3"},
            { id: 9443455, sustain:true, url: "sounds/Harder better faster stronger/WorkIs2.mp3"},

            { id: 9445503, sustain:true, url: "sounds/Harder better faster stronger/After1.mp3"},
            { id: 9449599, sustain:true, url: "sounds/Harder better faster stronger/After2.mp3"},
            { id: 9453695, sustain:true, url: "sounds/Harder better faster stronger/After3.mp3"},

            { id: 9445759, sustain:true, url: "sounds/Harder better faster stronger/MoreThan1.mp3"},
            { id: 9449855, sustain:true, url: "sounds/Harder better faster stronger/MoreThan2.mp3"},
            { id: 9453951, sustain:true, url: "sounds/Harder better faster stronger/MoreThan3.mp3"},

            { id: 9446015, sustain:true, url: "sounds/Harder better faster stronger/Never1.mp3"},
            { id: 9450111, sustain:true, url: "sounds/Harder better faster stronger/Never2.mp3"},
            { id: 9454207, sustain:true, url: "sounds/Harder better faster stronger/Never3.mp3"},

            { id: 9446271, sustain:true, url: "sounds/Harder better faster stronger/Our1.mp3"},
            { id: 9450367, sustain:true, url: "sounds/Harder better faster stronger/Our2.mp3"},
            { id: 9454463, sustain:true, url: "sounds/Harder better faster stronger/Our3.mp3"}
        ]
        ;


    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    window.addEventListener("resize", function () {
        engine.resize();
    });

    BABYLON.SceneLoader.Load("models/launchpad/", "launchpad.babylon", engine, function (scene) {

        for(var snd in soundMap){
            soundMap[snd].sound = new BABYLON.Sound(soundMap[snd].id, soundMap[snd].url, scene, null, {loop: false, autoplay: false});
        }

        engine.runRenderLoop(
            function() {
                scene.render();
            });

        scene.executeWhenReady(function () {
            scene.activeCamera.attachControl(canvas);
            engine.runRenderLoop(function() {
                scene.render();
            });
        });

        window.addEventListener("mouseup", function () {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if (pickResult !== null && pickResult.pickedMesh !== null && !isNaN(pickResult.pickedMesh.id)) {
                var pickedMeshId = pickResult.pickedMesh.id;

                var ev = {data: []};
                ev.data[0] = pickedMeshId >>> 16;
                ev.data[1] = (pickedMeshId - (ev.data[0] << 16) >>> 8);
                ev.data[2] = 0;
                lightUpRealLaunchpad(ev);
                playMusic(ev);
                ev.data[2] = (pickedMeshId - (ev.data[0] << 16) - (ev.data[1] << 8));
                lightDownModel(ev);
            }
        });

        window.addEventListener("mousedown", function () {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if(pickResult !== null && pickResult.pickedMesh !== null && !isNaN(pickResult.pickedMesh.id)){
                var pickedMeshId = pickResult.pickedMesh.id;

                var ev = { data : []};
                ev.data[0] = pickedMeshId >>> 16;
                ev.data[1] = (pickedMeshId - (ev.data[0] << 16) >>> 8);
                ev.data[2] = (pickedMeshId - (ev.data[0] << 16) - (ev.data[1] << 8));
                lightUpRealLaunchpad(ev);
                playMusic(ev);
                lightUpModel(ev);
            }
        });

        function lightUpModel(ev) {
            var meshId = (ev.data[0] << 16) + (ev.data[1] << 8) + ev.data[2];

            for(var mesh in scene.meshes)
            {
                if(scene.meshes[mesh].id === meshId.toString()){
                    scene.meshes[mesh].material.diffuseColor.r =
                        scene.meshes[mesh].material.diffuseColor.b = 0;
                    scene.meshes[mesh].material.diffuseColor.g = 0.66;
                }
            }
        };

        function lightDownModel(ev) {
            var meshId = (ev.data[0] << 16) + (ev.data[1] << 8) + ev.data[2];

            for(var mesh in scene.meshes)
            {
                if(scene.meshes[mesh].id === meshId.toString()){
                    scene.meshes[mesh].material.diffuseColor.r =
                        scene.meshes[mesh].material.diffuseColor.g =
                        scene.meshes[mesh].material.diffuseColor.b = 0.64;
                }
            }
        }

        function lightUpRealLaunchpad(ev){
            if(LaunchpadOutput)
                LaunchpadOutput.send( ev.data );
        }


        var midi=null;
        var inputs=null;
        var outputs=null;
        var input=null;
        var LaunchpadOutput;

        function playMusic(ev){
            var soundId = (ev.data[0] << 16) + (ev.data[1] << 8) + 127;
            for(var snd in soundMap){
                if(soundMap[snd].id === soundId){
                    if(!soundMap[snd].sustain && ev.data[2] === 0)
                        soundMap[snd].sound.stop();
                    if(ev.data[2] > 0){
                        if(!soundMap[snd].sound.isCompleted)
                            soundMap[snd].sound.stop();
                        soundMap[snd].sound.play();
                    }
                }
            }
        }

        navigator.requestMIDIAccess().then(success, failure);
        function handleMIDIMessage(ev) {
            var num = (ev.data[0] << 16) + (ev.data[1] << 8) + ev.data[2];
            playMusic(ev);
            lightUpRealLaunchpad(ev);
            if(ev.data[2] > 0) {
                lightUpModel(ev);
            }else{
                ev.data[2] = 127;
                lightDownModel(ev);
            }
        }

        function success( midiAccess ) {
            var iterator, data, port;
            midi = midiAccess;

            inputs = midi.inputs;
            iterator = inputs.values();
            while((data = iterator.next()).done === false){
                port = data.value;
            }

            if(inputs.size > 0) {
                iterator = inputs.values();
                input = iterator.next().value;
                input.addEventListener("midimessage", handleMIDIMessage);
            }

            outputs = midi.outputs;

            if(outputs.size > 0) {
                iterator = outputs.values();
                LaunchpadOutput = iterator.next().value;
            }
        }

        function failure( error ) {
            alert(
                "MIDI failed to start. Did you forget to install the Jazz plugin?");
        }
    }, function (progress) {
    });
}
