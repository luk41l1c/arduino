import http.server, os, serial, time, json

ser = serial.Serial('COM4', 9600)
time.sleep(2)

BaseHandler = http.server.BaseHTTPRequestHandler
class Handler(BaseHandler):
    def _set_headers(self, type):
        self.send_response(200)
        self.send_header('Content-type', type)
        self.end_headers()
    def do_GET(self):
        filename = self.path.split("/")[-1]
        if filename == "" : filename = "index.html"
        if os.access(filename, os.R_OK) and not os.path.isdir(filename):
            ext = filename.split(".")[-1]                       # Klijent zahteva fajl
            mode = "r"
            if ext in ["html","htm"]: content_type = "text/html"
            elif ext in ["txt","js","py","php"]: content_type = "text/plain"
            elif ext in ["css"]: content_type = "text/css"
            elif ext in ["ico","jpg","jpeg","png","gif"]:
                content_type = "image/x-icon"
                mode = "rb"
            content = open(filename, mode).read()
            if mode == "r": content = str.encode(content)
            self._set_headers(content_type)
            self.wfile.write(content)
        else:                                 # Ajax zahtev
            odgovor = {"metod":"GET", "path": self.path, "sadrzaj": ""}
            self._set_headers("text/json")
            self.wfile.write(str.encode(str(odgovor)))
    def do_POST(self):
        putanja = self.path
        metod = self.command
        duzina_sadrzaja = int(self.headers['Content-Length'])
        komanda = self.rfile.read(duzina_sadrzaja).decode("utf-8")
        #print(komanda)
        d = json.loads(komanda)
        print(d)
        ser.write(str.encode(d["zadata_komanda"]))
        odgovor = {"metod": metod, "putanja": putanja, "sadrzaj": komanda}
        self._set_headers("text/json")
        self.wfile.write(str.encode(str(odgovor)))
        
try:
    httpd = http.server.HTTPServer(('',8888), Handler)
    print("Server startovan...port: 8888")
    httpd.serve_forever()
except:
    print("Server stopiran")

ser = serial.Serial('COM4', 9600)
time.sleep(2)

while True:
    komanda = input("Komanda: ")
    ser.write(str.encode(komanda))
    
