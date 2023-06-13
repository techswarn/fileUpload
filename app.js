
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@aws-sdk/client-s3";
import 'dotenv/config'


require('dotenv').config('.env')

console.log(process.env.ACCESS_ID)

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_ID,
      secretAccessKey: process.env.ACCESS_SECRET_KEY
    }
});
console.log(s3Client)

const createBucketParams = (file) => {
    return {
        Bucket: "backend",
        Key: file,
        Body: "content"
    }
}

const uploadFunc = async(bucketParams) => {
    try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        console.log(
          "Successfully uploaded object: " +
            bucketParams.Bucket +
            "/" +
            bucketParams.Key
        );
        return data;
      } catch (err) {
        console.log("Error", err);
      }
    console.log('uploading')
}

const uploadInput = document.getElementById("uploadInput");
const upload = document.querySelector(".form-submit")
let files = []
uploadInput.addEventListener(
  "change",
  () => {
    const bucketParams = createBucketParams(uploadInput.files[0].name)
    console.log(bucketParams)
    upload.addEventListener("click", () => {
        const res = uploadFunc(bucketParams)
        console.log(res)
    })
  },
  false
);
