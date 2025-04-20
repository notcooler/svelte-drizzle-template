import boto3
import mimetypes
import sys
import traceback
import os
from botocore.exceptions import ClientError
from log import Logger

LOGGER = Logger("s3")

BUCKET_NAMES = ["my-bucket"]
ENDPOINT_URL = "http://s3:4566"
IMAGE_FOLDER = "/setup/images"


def create_bucket(s3):
    for bucket_name in BUCKET_NAMES:
        try:
            s3.create_bucket(
                Bucket=bucket_name
            )
            LOGGER.success(f"Bucket '{bucket_name}' created.")
        except ClientError as e:
            if e.response['Error']['Code'] == 'BucketAlreadyOwnedByYou':
                LOGGER.log(
                    f"Bucket '{bucket_name}' already exists and is owned by you.")
            else:
                LOGGER.error(f"Failed to create bucket '{bucket_name}': {e}")
                traceback.print_exc(file=sys.stderr)


def set_cors(s3):
    for bucket_name in BUCKET_NAMES:
        cors_config = {
            "CORSRules": [
                {
                    "AllowedOrigins": ["*"],
                    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
                    "AllowedHeaders": ["*"],
                    "ExposeHeaders": ["ETag"],
                    "MaxAgeSeconds": 3000
                }
            ]
        }
        try:
            s3.put_bucket_cors(Bucket=bucket_name,
                               CORSConfiguration=cors_config)
            LOGGER.success(
                f"CORS configuration applied to bucket '{bucket_name}'.")
        except Exception as e:
            LOGGER.error(f"Failed to set CORS for bucket '{bucket_name}': {e}")
            traceback.print_exc(file=sys.stderr)


def upload_images(s3):
    if not os.path.exists(IMAGE_FOLDER):
        LOGGER.error(f"Folder '{IMAGE_FOLDER}' does not exist.")
        return

    for bucket_name in os.listdir(IMAGE_FOLDER):
        bucket_path = os.path.join(IMAGE_FOLDER, bucket_name)
        if not os.path.isdir(bucket_path):
            continue

        # create_bucket(s3, bucket_name)
        # set_cors(s3, bucket_name)
        if bucket_name not in BUCKET_NAMES:
            LOGGER.error(
                f"Bucket '{bucket_name}' is not in the list of bucket names.")
            continue

        for file_name in os.listdir(bucket_path):
            file_path = os.path.join(bucket_path, file_name)
            content_type, _ = mimetypes.guess_type(file_path)
            content_type = content_type or "application/octet-stream"
            if os.path.isfile(file_path):
                try:
                    s3.upload_file(
                        file_path,
                        bucket_name,
                        file_name,
                        ExtraArgs={"ContentType": content_type}
                    )
                    LOGGER.success(
                        f"Uploaded '{file_name}' to bucket '{bucket_name}' with content type {content_type}.")
                except Exception as e:
                    LOGGER.error(f"Failed to upload '{file_name}': {e}")
                    traceback.print_exc(file=sys.stderr)


def main():
    s3 = boto3.client(
        "s3",
        region_name="us-east-1",
        endpoint_url=ENDPOINT_URL,
        aws_access_key_id="test",
        aws_secret_access_key="test",
    )

    create_bucket(s3)
    set_cors(s3)
    upload_images(s3)

    resp = s3.head_object(Bucket="my-bucket", Key="samuel-ferrara-1527pjeb6jg-unsplash.jpg")
    print(resp["ContentType"])
