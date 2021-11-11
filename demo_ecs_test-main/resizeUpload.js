const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const Jimp = require('jimp');
const { v4: uuidv4 } = require("uuid");

const height = 500;
const imageType = "image/png";
require('dotenv').config();
const bucket = process.env.Bucket;

async function resizeUpload(path,callback){
    console.log(path);
    
    let photoUrl = path;
    let objectId = uuidv4();
    let objectKey = `resize-${height}-${objectId}.png`;
  
    fetchImage(photoUrl)
      .then(image => image.resize(width, height).getBufferAsync(image.getMIME()))
      .then(resizedBuffer => uploadToS3(resizedBuffer, objectKey))
      .then(function(response) {
        console.log(`Image ${objectKey} was uploaed and resized`);
        console.log(response);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(response)
        });
      })
      .catch(error => console.log(error));
}

/**
 * @param {*} data
 */
 function uploadToS3(data, key) {
    return s3
      .putObject({
        Bucket: bucket,
        Key: key,
        Body: data,
        ContentType: imageType
      })
      .promise();
  }
  


/**
 * @param {url}
 * @returns {Promise}
 */
 function fetchImage(url) {
    return Jimp.read(url);
  }

async function getAllImagesBucket(path, route){

    const nameFiles = Date.now().toString();
    const img = await Jimp.read(path);
    const resized = img.resize(250, Jimp.AUTO).quality(0);
    const bufferResized = await resized.getBase64Async(Jimp.MIME_JPEG);
    const buffer = Buffer.from(bufferResized.replace(/^data:image\/\w+;base64,/, ""),'base64');

    const response = await new Promise(function (resolve) {
        
        const params = {
            Bucket: bucket,
            Key: `resize/${route}/${nameFiles}.jpeg`,
            Body: buffer,
            ContentType: 'image/jpeg',
            ContentEncoding: 'base64',
            ACL: 'public-read',
            Metadata: {
                CacheControl: 'no-cache'
            }
        };
    
        return s3.upload(params, function(err, data){
            if(err) {
                return err;
            } else{
                return resolve(data.Location);
            }
        })

    })

    return response;

}

module.exports.resizeUpload = resizeUpload;