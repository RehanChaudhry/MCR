import Env from "envs/env";

export default {
  SHOULD_PRINT_LOGS: true,
  SHOULD_ENABLE_FORCE_UPDATE: Env.SHOULD_ENABLE_FORCE_UPDATE,
  S3_BUCKET_URL:
    "https://my-college-roomie-dev.s3.us-west-2.amazonaws.com/"
};
