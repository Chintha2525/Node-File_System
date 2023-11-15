
//Modules

const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors())
app.use(express.json());



//endpoint to create a text files

app.post('/create', (request, response) => {

    //Create Current Timestamp
    const CurrentTimeStamp = new Date().toLocaleString();

    //txt File name create
    const date = String(new Date()).split(" ");
    const CurrentDate = date[2] + date[1] + date[3]
    const CurrentTime = date[4]
    const FileName = `${CurrentDate}-${CurrentTime.split(":").join("'")}`;

    //Create text file =>> File name=current date-time and content=Current-date-time-details
    const txtFile = `./FileFolder/${FileName}.txt`

    try {
        if (!fs.existsSync(txtFile)) {

            fs.writeFile(`${txtFile}`, `${CurrentTimeStamp}`, err => {
                if (err) {
                    console.error(err);
                    return response.status(404).json({ Message: "Text file creation failed" })
                }
                return response.status(201).json({ Message: `Text file ${FileName}.txt created successfully ` })
            })
        }
    } catch (err) {
        console.error(err);
        return response.status(404).json({ Message: "Text file exist" })
    }
})


//endpoint to filter and get text files
app.get('/', (request, response) => {

    const textFileFolder = [];
    const files = fs.readdirSync('./FileFolder');
    files.forEach(file => {
        if (path.extname(file) == '.txt') {
            textFileFolder.push(file);
        }
    })
    response.status(200).send(textFileFolder);
})

//Server for listen
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server running")
});
