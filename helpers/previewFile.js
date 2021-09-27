const previewFile = (file, elementType) => {

    console.log(elementType)

    if(file == '') {
        return elementType.src = '';
    }

    if (file) {
        var reader = new FileReader();

        reader.onload = function(event) {
            elementType.src = event.target.result;
        }

        reader.readAsDataURL(file);
    }

};

const previewManyFile = (file, elementType, index) => {
    if (file) {
        var reader = new FileReader();
        reader.onload = (evt) => {
            if (index < 3) {
                elementType[index].src = evt.target.result; //Populate the File boxes
            }
        };
        reader.readAsDataURL(file);
    }
}


export {
    previewFile,
    previewManyFile
}