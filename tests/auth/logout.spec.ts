import { expect, test } from "@playwright/test";
import * as config from "../setup";
import { login, logout } from "./action/action";

test.beforeEach(async ({ page }) => {
  await page.goto(config.baseUrl);
  await login(page, config.validUsername, config.validPassword);
});

// 로그아웃 버튼 클릭으로 로그아웃
test("로그아웃 버튼 클릭", async ({ page }) => {
  await logout(page);

  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(
    (cookie) => cookie.name === "session-username"
  );
  expect(sessionCookie).toBeUndefined();
});

// 세선 만료
test("세션 만료로 로그아웃", async ({ page }) => {
  await page.context().clearCookies(); // 세션 강제 삭제
  await page.reload();

  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(
    (cookie) => cookie.name === "session-username"
  );
  expect(sessionCookie).toBeUndefined();
});
