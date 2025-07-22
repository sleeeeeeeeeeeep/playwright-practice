import { expect, type Page } from "@playwright/test";
import { baseUrl } from "../../setup";

// 로그인 함수
export async function login(page: Page, username: string, password: string) {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

// 로그인 에러 검증 함수
export async function assertLoginError(page: Page, expectedMessage: string) {
  const errorLocator = page.locator('[data-test="error"]');
  await expect(page).toHaveURL(baseUrl);
  await expect(errorLocator).toHaveText(expectedMessage);
}

// 로그아웃 함수(로그인이 되어 있어야 함)
export async function logout(page: Page) {
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
}
