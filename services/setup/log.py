class Logger:
    def __init__(self, name: str):
        self.name = name

    def info(self, message: str):
        print(f"ℹ️ [{self.name}]: {message}")
    
    def success(self, message: str):
        print(f"✅ [{self.name}]: {message}")

    def error(self, message: str):
        print(f"❌ [{self.name}]: {message}")

    def log(self, message: str):
        print(f"📜 [{self.name}]: {message}")