const fileToJson = (myFile) => {
    console.log(myFile);

    return {
        lastModified: myFile.lastModified,
        lastModifiedDate: myFile.lastModifiedDate,
        name: myFile.name,
        size: myFile.size,
        type: myFile.type,
        path: myFile.path,
    };
};

export default { fileToJson };
