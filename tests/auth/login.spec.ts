import { expect, test } from "@playwright/test";
import * as config from "../setup";
import { assertLoginError, login } from "./action/action";

test.beforeEach(async ({ page }) => {
  await page.goto(config.baseUrl);
});

// 로그인 성공 테스트
test("로그인 성공", async ({ page }) => {
  await login(page, config.validUsername, config.validPassword);

  // 세션 쿠키 생성 확인
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(
    (cookie) => cookie.name === "session-username"
  );
  expect(sessionCookie).toBeDefined();

  // 페이지 이동 확인
  await expect(page).toHaveURL(config.baseUrl + "/inventory.html");
});

// 로그인 실패: 없는 아이디
test("없는 아이디 입력", async ({ page }) => {
  await login(page, config.invalidUsername, config.validPassword);
  await assertLoginError(
    page,
    "Epic sadface: Username and password do not match any user in this service"
  );
});

// 로그인 실패: 틀린 비밀번호
test("틀린 비밀번호 입력", async ({ page }) => {
  await login(page, config.validUsername, config.invalidPassword);
  await assertLoginError(
    page,
    "Epic sadface: Username and password do not match any user in this service"
  );
});

// 로그인 실패: 제한된 유저
test("제한된 유저로 로그인", async ({ page }) => {
  await login(page, config.lockedOutUser, config.validPassword);
  await assertLoginError(
    page,
    "Epic sadface: Sorry, this user has been locked out."
  );
});

// 로그인 실패: 아이디 없이 로그인 시도
test("아이디 입력 안하고 로그인 시도", async ({ page }) => {
  await login(page, "", config.validPassword);
  await assertLoginError(page, "Epic sadface: Username is required");
});

// 로그인 실패: 비밀번호 없이 로그인 시도
test("비밀번호 입력 안하고 로그인 시도", async ({ page }) => {
  await login(page, config.validUsername, "");
  await assertLoginError(page, "Epic sadface: Password is required");
});

// 로그인 실패: SQL 인젝션 시도
test("SQL 인젝션 시도", async ({ page }) => {
  await login(page, "' OR '1'='1", "' OR '1'='1");
  await assertLoginError(
    page,
    "Epic sadface: Username and password do not match any user in this service"
  );
});

// 쿠키 초기화
test.afterEach(async ({ page }) => {
  await page.context().clearCookies();
});
