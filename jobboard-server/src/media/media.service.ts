import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fileType, uploadType } from '../profiles/dto/update-profile.dto';

dotenvConfig({ path: '.env' });

const config = {
  region: 'ap-south-1',
  bucketName: 'jobboardprojects3',
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
};

@Injectable()
export class MediaService {
  private s3 = new S3Client({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId!,
      secretAccessKey: config.secretAccessKey!,
    },
    apiVersion: 'v4',
  });

  async create(
    file: Express.Multer.File,
    userid: string,
    uploadType: uploadType,
  ) {
    let folder: string;

    switch (uploadType.type) {
      case fileType.PHOTO:
        folder = 'profile';
        break;
      case fileType.PDF:
        folder = 'resume';
        break;
      default:
        throw new Error('Invalid upload type');
    }

    const key = `${userid}/${folder}/${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      const res = await this.s3.send(command);
      console.log(res, 'FROM S3 <<<<<<<');
      return {
        key,
        url: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${key}`,
      };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error; // It's often better to throw the error than to return it
    }
  }
}
