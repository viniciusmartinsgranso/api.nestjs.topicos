import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { environment } from '../../../environment/environment';

@Injectable()
export class MediaService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      credentials: {
        secretAccessKey: environment.S3_SECRET_ACCESS_KEY,
        accessKeyId: environment.S3_ACCESS_KEY_ID,
      },
      region: environment.AWS_REGION,
    });
  }

  public async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    const params = {
      Bucket: environment.S3_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
    };

    try {
      const uploadResult = await this.s3.upload(params).promise();
      return {
        url: uploadResult.Location,
      };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }
}
