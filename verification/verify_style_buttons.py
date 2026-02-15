from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        page.on("console", lambda msg: print(f"PAGE CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        try:
            print("Navigating to http://localhost:8080")
            page.goto("http://localhost:8080")

            # Wait for password input
            print("Waiting for password input...")
            page.wait_for_selector("input[type=password]")

            # Enter password
            print("Entering password...")
            page.fill("input[type=password]", "photo")

            # Submit form (click the button)
            print("Submitting password...")
            page.click("button[type=submit]")

            # Wait for the first style button to be visible
            print("Waiting for style buttons...")
            # Using text selector to find the button
            page.wait_for_selector("text=1. Architectural Genius", timeout=10000)

            # Take a screenshot of the initial state
            print("Taking initial screenshot...")
            page.screenshot(path="verification/initial_state.png")

            # Click the second style button
            print("Clicking second style button...")
            # Click on the button containing the text
            page.click("text=2. Cinematic Contact Sheet")

            # Wait a bit for potential transition or state update
            page.wait_for_timeout(1000)

            # Take a screenshot after selection
            print("Taking selection screenshot...")
            page.screenshot(path="verification/style_selected.png")

            print("Done.")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
