import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime

# Initialize WebDriver
def init_driver():
    driver = webdriver.Chrome()  # Replace with the driver you are using
    driver.get("http://localhost:3000/login")
    return driver

# Write log
def write_log(test_case, result):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("login_test_log.txt", "a") as log_file:
        log_file.write(f"{timestamp} - {test_case}: {result}\n")

# Helper function to check page content
def check_page_content(driver, expected_content, timeout=7):
    try:
        WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, expected_content))
        )
        return True
    except:
        return False

# Test 1: Invalid Password
def test_invalid_password():
    driver = init_driver()
    driver.find_element(By.ID, "email").send_keys("s@s.com")
    driver.find_element(By.ID, "password").send_keys("wrongpassword")
    time.sleep(5)  # 5-second delay before clicking
    driver.find_element(By.CSS_SELECTOR, "#root > div > div > div > div > div.css-1uqiwai > div.chakra-stack.css-1811skr > div.chakra-stack.css-1j5rwhq > button").click()
    time.sleep(5)  # 5-second delay before clicking
    if not check_page_content(driver, ".css-19pkskf"):
        write_log("Test 1 (Login invalid)", "Passed")
    else:
        write_log("Test 1 (Login invalid)", "Failed")
    driver.quit()

# Test 2: Correct Credentials
def test_correct_credentials():
    driver = init_driver()
    driver.find_element(By.ID, "email").send_keys("s@s.com")
    driver.find_element(By.ID, "password").send_keys("s@s.com")
    time.sleep(5)  # 5-second delay before clicking
    driver.find_element(By.CSS_SELECTOR, "#root > div > div > div > div > div.css-1uqiwai > div.chakra-stack.css-1811skr > div.chakra-stack.css-1j5rwhq > button").click()
    time.sleep(5)  # 5-second delay before clicking
    if check_page_content(driver, ".css-19pkskf"):
        write_log("Test 2 (Login valid)", "Passed")
    else:
        write_log("Test 2 (Login valid)", "Failed")
    driver.quit()


# Running the tests
def run_tests():
    test_invalid_password()
    test_correct_credentials()

if __name__ == "__main__":
    run_tests()
