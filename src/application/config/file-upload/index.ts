// import aws from 'aws-sdk'
// import crypto from 'crypto'
// import multer from 'multer'
// import multerS3 from 'multer-s3'
import path from 'path'

export const destination = path.resolve(
  __dirname,
  '..',
  '..',
  'temp',
  'uploads'
)

const storageTypes = {
  // local: multer.diskStorage({
  //   destination: (req, file, callback) => {
  //     callback(null, destination)
  //   },
  //   filename: (req, file, callback) => {
  //     crypto.randomBytes(16, (err, hash) => {
  //       if (err) callback(err)
  //       file.key = `${hash.toString('hex')}-${file.originalname}`
  //       callback(null, file.key)
  //     })
  //   }
  // }),
  // s3: multerS3({
  //   s3: new aws.S3(),
  //   bucket: 'health-sheet',
  //   acl: 'public-read',
  //   key: (req, file, callback) => {
  //     crypto.randomBytes(16, (err, hash) => {
  //       if (err) callback(err)
  //       file.key = `${hash.toString('hex')}-${file.originalname}`
  //       callback(null, file.key)
  //     })
  //   }
  // })
}

export default {
  dest: destination,
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: { fileSize: 10 * 1024 * 1024 }
}
