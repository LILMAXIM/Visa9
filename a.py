import socket
import os

HOST = '0.0.0.0'
PORT = 65432

print(f"Listening on port {PORT}...")

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print(f"Connected by {addr}")
        while True:
            data = conn.recv(1024).decode().strip()
            if not data:
                break
            print(f"Received: {data}")

            if data.lower() == "launch":
                # Open terminal directly instead of using xdotool
                os.system("gnome-terminal -- bash -c 'node v1.js; exec bash'")