import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime

# Function to initialize WebDriver
def init_driver():
    driver = webdriver.Chrome()  # Replace with the driver you are using
    driver.get("http://localhost:3000/signup")
    return driver

# Function to write log
def write_log(test_case, result):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("test_log.txt", "a") as log_file:
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

# Helper function to fill the form
def fill_form(driver, first_name, last_name, email, role, password):
    driver.find_element(By.ID, "firstName").send_keys(first_name)
    driver.find_element(By.ID, "lastName").send_keys(last_name)
    driver.find_element(By.ID, "email").send_keys(email)
    select = Select(driver.find_element(By.ID, "role"))
    select.select_by_value(role.lower())
    driver.find_element(By.ID, "password").send_keys(password)

# Test 1: No entry, direct sign up
def test_no_entry():
    driver = init_driver()
    time.sleep(5) 
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    if not check_page_content(driver, ".css-i3jkqk"):
        write_log("Test 2 (Jobseeker Invalid Email)", "Passed")
    else:
        write_log("Test 2 (Jobseeker Invalid Email)", "Failed")
    driver.quit()

# Test 2: Jobseeker with invalid email
def test_jobseeker_invalid_email():
    driver = init_driver()
    fill_form(driver, "Steve", "Smith", "invalid-email", "Jobseeker", "Password123!")
    time.sleep(5) 
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    if not check_page_content(driver, ".css-i3jkqk"):
        write_log("Test 2 (Jobseeker Invalid Email)", "Passed")
    else:
        write_log("Test 2 (Jobseeker Invalid Email)", "Failed")
    driver.quit()

# Test 3: Valid Jobseeker
def test_valid_jobseeker():
    driver = init_driver()
    fill_form(driver, "Abc", "DEF", "Abc.Abc@gmail.com", "Jobseeker", "Password123!")
    time.sleep(5) 
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    if check_page_content(driver, ".css-i3jkqk"):
        write_log("Test 3 (Valid Jobseeker)", "Passed")
    else:
        write_log("Test 3 (Valid Jobseeker)", "Failed")
    driver.quit()

# Test 4: Employer with invalid email
def test_employer_invalid_email():
    driver = init_driver()
    fill_form(driver, "Emma", "Brown", "invalid-email", "Employer", "Password123!")
    time.sleep(5) 
    driver.find_element(By.CSS_SELECTOR, "button[type='button']").click()
    if not check_page_content(driver, ".css-uvd5q1"):
        write_log("Test 4 (Employer Invalid Email)", "Passed")
    else:
        write_log("Test 4 (Employer Invalid Email)", "Failed")
    driver.quit()

# Test 5: Valid Employer
def test_valid_employer():
    driver = init_driver()
    fill_form(driver, "ADE", "SSS", "ADE.SSS@gmail.com", "Employer", "Password123!")
    time.sleep(5) 
    driver.find_element(By.CSS_SELECTOR, "button[type='button']").click()
    if check_page_content(driver, ".css-h94677"):
        write_log("Test 5 (Valid Employer)", "Passed")
    else:
        write_log("Test 5 (Valid Employer)", "Failed")
    driver.quit()

# Test 6: Invalid Entries
def test_invalid_entries():
    driver = init_driver()
    fill_form(driver, "", "", "invalid", "Jobseeker", "")
    time.sleep(5) 
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    if not check_page_content(driver, ".css-h94677"):
        write_log("Test 4 (Employer Invalid Email)", "Passed")
    else:
        write_log("Test 4 (Employer Invalid Email)", "Failed")
    driver.quit()

# Running the tests
def run_tests():
    test_no_entry()
    test_jobseeker_invalid_email()
    test_valid_jobseeker()
    test_employer_invalid_email()
    test_valid_employer()
    test_invalid_entries()

if __name__ == "__main__":
    run_tests()