import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime

# Initialize WebDriver
def init_driver():
    driver = webdriver.Chrome()  # Replace with the driver you are using
    return driver

# Function to log in as Job Seeker
def login_job_seeker(driver):
    driver.get("http://localhost:3000/login")
    driver.find_element(By.ID, "email").send_keys("s@sss.com")
    driver.find_element(By.ID, "password").send_keys("s@sss.com")
    time.sleep(5)  # Wait before clicking
    driver.find_element(By.CSS_SELECTOR, "#root > div > div > div > div > div.css-1uqiwai > div.chakra-stack.css-1811skr > div.chakra-stack.css-1j5rwhq > button").click()
    time.sleep(5)  # Wait for login to complete

# Function to write log
def write_navbar_log(url):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("navbar_test_log.txt", "a") as log_file:
        log_file.write(f"{timestamp} - Visited: {url}\n")

# Function to navigate through navbar links
def navigate_navbar(driver):
    driver.get("http://localhost:3000/JobListings")
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "nav.css-1y6oau7"))
    )
    navbar_links = driver.find_elements(By.CSS_SELECTOR, "nav.css-1y6oau7 a")
    links = [link.get_attribute('href') for link in navbar_links]

    for link in links:
        driver.get(link)
        write_navbar_log(link)  # Log the visited page
        time.sleep(5)  # Wait for 5 seconds

# Running the script
def run_script():
    driver = init_driver()
    login_job_seeker(driver)  # Perform Job Seeker login
    navigate_navbar(driver)  # Navigate navbar
    driver.quit()

if __name__ == "__main__":
    run_script()
