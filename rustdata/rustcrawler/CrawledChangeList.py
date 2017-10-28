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
class CrawledChangeList():
    def __init__(self, version, date):
        self.version = version
        self.date = date
        self.changes = []

    def add_change(self, type, text):
        self.changes.append((type, text))

    def get(self):
        patch = {}
        patch["version"] = self.version
        patch["date"] = self.date
        patch["changes"] = self.changes
        return patch