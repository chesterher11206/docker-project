from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import os


options = Options()
options.headless = True
# chrome_options = Options()  
# chrome_options.add_argument("--headless")  
# chrome_options.add_argument('--no-sandbox')
# chrome_options.add_argument("--disable-setuid-sandbox")
driver = webdriver.Firefox(options=options)
driver.get("https://google.com")
print(driver.current_url)
driver.close()