export const isDev = process.env.NODE_ENV !== "production";

export const PublicPaths = new Set(["/sign-in", "/sign-up"]);
export const SharedPaths = new Set(["/"]);
export const SharedWildcardPaths = ["/blog-detail"];

export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const UPLOAD_PRESET = process.env.UPLOAD_PRESET;
