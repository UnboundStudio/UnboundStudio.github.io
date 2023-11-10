import csv

with open("/Users/amanmehta/Documents/GitHub/amalegalsolutions.github.io/assets/keywords.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row[0])