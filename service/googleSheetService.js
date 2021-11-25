const { default: axios } = require("axios");
const { baseSheetURL } = require("../config/config");
const { firebaseApp } = require("./firebase");
const fs = require("fs");

const GoogleSheetService = {
  uploadFormData: async (requestData, files) => {
    const { confirmTerms, ...remainingData } = requestData;

    // upload files to Firebase
    const filesArray = splitFiles(files);
    const firebaseResponse = await firebaseUpload(filesArray);

    // google Sheet POST obj
    const sheetRequestObj = {
      ...remainingData,
      fileurl: firebaseResponse.number,
      ...firebaseResponse.fileNames,
    };

    return axios.post(baseSheetURL, sheetRequestObj).then((response) => {
      return response.data;
    });
  },
};

function splitFiles(filesArray) {
  if (filesArray && filesArray.length > 0) {
    return {
      file1: filesArray[0],
      file2: filesArray[1],
      file3: filesArray[2],
    };
  }
  return {};
}

async function firebaseUpload(files) {
  const fileNames = {
    file1: "",
    file2: "",
    file3: "",
  };
  const number = Math.round(Math.random() * 1000000000);
  if (Object.keys(files).length > 0) {
    const storage = firebaseApp.storage();
    const storageRef = storage.ref();
    const fileref = storageRef.child(number.toString());
    const { file1, file2, file3 } = files;
    if (file1 != null) {
      const fileName = `file1.${file1.originalname.split(".").pop()}`;
      await fileref.child(fileName).put(fs.readFileSync(file1.path));
      fs.unlink(file1.path, (err) => console.log(err));
      fileNames.file1 = fileName;
    }
    if (file2 != null) {
      const fileName = `file2.${file2.originalname.split(".").pop()}`;
      await fileref.child(fileName).put(fs.readFileSync(file2.path));
      fs.unlink(file2.path, (err) => console.log(err));
      fileNames.file2 = fileName;
    }
    if (file3 != null) {
      const fileName = `file3.${file3.originalname.split(".").pop()}`;
      await fileref.child(fileName).put(fs.readFileSync(file3.path));
      fs.unlink(file3.path, (err) => console.log(err));
      fileNames.file3 = fileName;
    }
  }

  return { number: number, fileNames };
}

module.exports = GoogleSheetService;
