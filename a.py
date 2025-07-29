import socket
import os
import subprocess

HOST = '0.0.0.0'
PORT = 65432

# Get current terminal PID to avoid killing it
current_pid = os.getppid()

print(f"🔌 Listening for commands on port {PORT}... (Listener PID: {current_pid})")

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
                    # Find all gnome-terminal processes except current one
                    output = subprocess.getoutput("pgrep -f gnome-terminal")
                    pids = [pid for pid in output.strip().split("\n") if pid and int(pid) != current_pid]

                    for pid in pids:
                        os.system(f"kill {pid}")
                    
                    print("🔁 Old gnome-terminal instances killed.")

                    # Launch new one
                    os.system("gnome-terminal -- bash -c 'node v1.js; exec bash'")
                    print("🚀 v1.js launched.")
                else:
                    print(f"⚠️ Unknown command: {data}")

            except Exception as e:
                print(f"❌ Error: {e}")
