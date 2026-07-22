#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import os

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    os.chdir(Path(__file__).resolve().parents[1])
    server = ThreadingHTTPServer(('localhost', args.port), Handler)
    print(f'Serving at http://localhost:{args.port}')
    server.serve_forever()
