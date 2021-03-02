const fs = require('fs');
const axios = require('axios')
const FormData = require('form-data');
const gsheet_secret = fs.readFileSync('secrets/gscript_url.json');
const url = JSON.parse(gsheet_secret).url;

exports.gsheet_post = function(req, res) {
    let timestart = Date.now();
    let params = formParams(req.body);
    //console.log(params);
    //console.log(Object.keys(params));
    let formData = new FormData();
    Object.keys(params).forEach(key => {
        let value = params[key];
        if (Array.isArray(value)){
            value.forEach(el => {
                formData.append(key, el);
            });
        } else {
            formData.append(key, value);
        }
    });
    let files = req.files;
    files.forEach(f => {
        let data = fs.readFileSync(f.path, 'base64');
        fs.rmSync(f.path);
        formData.append("files", JSON.stringify({
            originalName: f.originalname,
            mimetype: f.mimetype,
            data: data
        }));
    });
    let timeend = Date.now();
    console.log(timeend-timestart);
    try {
        axios.post(url, formData, {
            headers: {
                ...formData.getHeaders(),
            }
        })
        .then(response => {
            console.log(response.data)
            res.send("Form Submitted ");
        })
        .catch(error => console.log(error))  
    } catch (error) {
        console.log(error);
    }
};

function formParams(requestBody) {
    return ["city",
        "project",
        "address",
        "projectno",
        "fullname",
        "phone",
        "email",
        "issueCategory",
        "issueDesc",
        "customerDate"].reduce( (paramAcc, nextParam) => {
        paramAcc[nextParam] = requestBody[nextParam];
        return paramAcc;
    }, {});
}
