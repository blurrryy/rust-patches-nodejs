"""
  _     _
 | |   | |
 | |__ | |     _ __ _   _
 | '_ \| |    | '__| | | |
 | |_) | |____| |  | |_| |
 |_.__/|______|_|   \__, |
                     __/ |
                    |___/

Rust Patchnotes Crawler for Python
(c) blurrryy
"""
import rustcrawler
from pymongo import MongoClient
rc = rustcrawler.GetPatches()

"""
Setup the MongoDB Connection by changing the following line.
Default: client = MongoClient('localhost', 27017)

Change the collection by changing the line after.
Default: col = client['rust']['patchnotes']
"""

client = MongoClient('localhost', 27017)
col = client['rust']['patchnotes']

written = 0
print("\n***\nStart Rust Patchnotes Crawling...\n***\n")
for patch in rc.fetch():
    if col.find_one({"date": patch["date"]}):
        print("Skipping " + patch["version"]+ " (" + patch["date"] + ")")
        continue
    id = col.insert_one(patch).inserted_id
    written += 1
    print(patch["version"] + " (" + patch["date"] + ")  written as Id: " + str(id))
print('\n***\nWriting finished: ' + str(written) + " documents added.\n***")
