import { test, expect, Page } from "@playwright/test";
import { _electron } from "@playwright/test";
import { join } from "path";

let page: Page;
test.describe("Todo app", () => {
  test.beforeAll(async () => {
    const mainPath = join(__dirname, "..", "main.js");
    const electronApp = await _electron.launch({ args: [mainPath] });
    page = await electronApp.firstWindow();
  });

  test("should display the correct title", async () => {
    const title = await page.title();
    expect(title).toBe("Todo List");
  });

  test("should add a new todo item", async () => {
    const input = page.locator("#todo-input");
    await expect(input).toBeVisible();

    await input.fill("Buy groceries");
    //timeout to see the input being filled
    await page.waitForTimeout(1000);

    const addButton = page.getByRole("button", { name: "Add" });
    await addButton.click();
    //timeout to see the item being added
    await page.waitForTimeout(1000);

    const todoItem = page.getByText("Buy groceries");
    await expect(todoItem).toBeVisible();
  });
});
