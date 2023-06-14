
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@aws-sdk/client-s3";
import 'dotenv/config'

require('dotenv').config('.env')

const uploadInput = document.getElementById("uploadInput");
const upload = document.querySelector(".form-submit")
const alert = document.getElementById("alert-success")

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_ID,
      secretAccessKey: process.env.ACCESS_SECRET_KEY
    }
});

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
        alert.classList.add("alert-success")
        alert.innerHTML = "Successfully uploaded object: " + bucketParams.Bucket + "/" + bucketParams.Key
        return data;
      } catch (err) {
        console.log("Error", err);
        alert.innerHTML = "Error, please check console for more details"
      }
    console.log('uploading')
}

let files = []
uploadInput.addEventListener(
  "change",
  () => {
    alert.classList.remove("alert-success")
    console.log(uploadInput.files[0].name)
    const bucketParams = createBucketParams(uploadInput.files[0].name)
    console.log(bucketParams)
    upload.addEventListener("click", async () => {        
        try {
          const data = await uploadFunc(bucketParams)
          console.log(data)
        } catch(err) {
          console.log(err)
        }

    })
  },
  false
);
