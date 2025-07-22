import * as dotenv from "dotenv";

// .env 파일 로드
dotenv.config();

// 환경변수가 없으면 에러
if (!process.env.BASE_URL) {
  throw new Error("BASE_URL 환경변수 에러, .env 파일 확인 필요");
}

// 환경 변수 검증 함수
const validateEnvVar = (varName: string) => {
  if (!process.env[varName]) {
    throw new Error(`환경변수 오류: ${varName}`);
  }
  return process.env[varName]!;
};

export const baseUrl = validateEnvVar("BASE_URL");
export const validUsername = validateEnvVar("VALID_USERNAME");
export const validPassword = validateEnvVar("VALID_PASSWORD");
export const lockedOutUser = validateEnvVar("LOCKED_OUT_USER");
export const invalidUsername = validateEnvVar("INVALID_USERNAME");
export const invalidPassword = validateEnvVar("INVALID_PASSWORD");
