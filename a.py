import socket
import os

HOST = '0.0.0.0'
PORT = 65432

print(f"🔌 Listening for commands on port {PORT}...")

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()

    while True:
        conn, addr = s.accept()
        print(f"✅ Connected by {addr}")

        with conn:
            try:
                data = conn.recv(1024).decode().strip()
                if not data:
                    continue

                print(f"📥 Received command: {data}")

                if data.lower() == "launch":
# kill all current gnome terminal
os.system("gnome-terminal -- bash -c 'pkill gnome-terminal; exec bash'")
                    # Launch a terminal that runs node v1.js and keeps terminal open
                    os.system("gnome-terminal -- bash -c 'node v1.js; exec bash'")
                    print("🚀 v1.js launched.")
                else:
                    print(f"⚠️ Unknown command: {data}")

            except Exception as e:
                print(f"❌ Error: {e}")
