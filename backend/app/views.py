from django.shortcuts import render
from selenium import webdriver
from time import sleep
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def getData():
    driver = webdriver.Chrome(executable_path="./chromedriver.exe")
    driver.get("https://stopcorona.tn.gov.in/beds.php")
    data=[]
    row=[]
    sleep(2)
    while True:
        rows = len(driver.find_elements_by_xpath("/html/body/section[2]/div/div/main/div/table/tbody/tr"))
        next = driver.find_element_by_class_name("next")
        names = next.get_attribute("class").split(" ")
        cols = len(driver.find_elements_by_xpath("/html/body/section[2]/div/div/main/div/table/tbody/tr[1]/td"))
        for i in range(1, rows+1):
            row=[]
            for j in range(1, cols+1):
                value = driver.find_element_by_xpath("/html/body/section[2]/div/div/main/div/table/tbody/tr["+str(i)+"]/td["+str(j)+"]").text
                row.append(value)
            data.append(row)
        if "disabled" in names:
            break
        else:
            next.click()
    return Response({"data":data})
