import json


def check_user(key, ip):
    with open('sessions.json', 'r') as f:
        data = json.load(f)
        if data[key] not in data:
            return False
        elif data[key] != data[ip]:
            return False
        return True


def set_user(key, ip):
    with open('sessions.json', 'r') as f:
        data = json.load(f)
    data[key] = ip
    with open('sessions.json', 'w') as f:
        f = json.dump(data)


