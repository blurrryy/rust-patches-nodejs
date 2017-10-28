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
import requests
from bs4 import BeautifulSoup
from .CrawledChangeList import CrawledChangeList
class GetPatches():
    def __get_data(self,url):
        r = requests.get(url)
        return BeautifulSoup(r.text, "html.parser")

    def fetch(self):
        doc = self.__get_data("https://rust.facepunch.com/changes/")
        changelists =  doc.find_all("changelist")
        for list in changelists:
            changeList = CrawledChangeList(list.version.text.strip(),list.information.text.strip())
            changes = list.find("ul").find_all("li")
            for change in changes:
                changeList.add_change(change.changetype.text, change.p.text[1:])
            yield changeList.get()