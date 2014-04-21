window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

function gotFS(fileSystem) {
   fileSystem.root.getDirectory("citylook", {create: true}, gotDir);
}

function gotDir(dirEntry) {
    dirEntry.getFile("login.txt", {create: true, exclusive: true}, gotFile);
}

function gotFile(fileEntry) {
    // Do something with fileEntry here
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
        writer.truncate(11);
        writer.onwriteend = function(evt) {
            writer.seek(0);
            writer.write(testo);
            writer.onwriteend = function(evt){
                console.log("contents of file now '"+testo+"'");
            }
        };
    };
    writer.write("some sample text");
}

function fail(error) {
    console.log(error.code);
}

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, null);
}

function onSuccess() {
    fileSystem.root.getDirectory("ABCfolder", {create: true}, gotDir);
	fileSystem.root.getDirectory("ABCfolder/ABCsubfolder", {create: true}, gotDir);
}