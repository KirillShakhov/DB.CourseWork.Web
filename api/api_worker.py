from requests import get

from server_config import SERVER_PROTOCOL, SERVER_IP, SERVER_PORT


def create_req(command, d, list=(), list_name='name'):
    requ = SERVER_PROTOCOL + SERVER_IP + ':' + SERVER_PORT + "/api/v1/" + command + '?' + '&'.join(
        [i + '=' + d[i] for i in d.keys()]) + '&' + '&'.join(
        [list_name + '=' + i for i in list])

    print([i + '=' + d[i] for i in d.keys()])
    print([list_name + '=' + i for i in list])

    print(requ)


    req = get(requ)
    return req.json()


'''For users'''


def add_profile_group(token, name):
    return create_req("profile_group/add", {"token": token, "name": name})


def add_proxy_group(token, name):
    return create_req("proxy_group/add", {"token": token, "name": name})


def show_profile_groups(token):
    return create_req("profile_group/show", {"token": token})


def show_proxy_groups(token):
    return create_req("proxy_group/show", {"token": token})


def check_key(login, _pass):
    a = auth(login, _pass)
    if a['status'] == 'error':
        return False
    else:
        return True


def remove_profile_group(token, _id):
    return create_req("profile_group/remove", {"token": token, "id": _id})


def remove_proxy_group(token, _id):
    return create_req("proxy_group/remove", {"token": token, "id": _id})


def add_profile(token, group_id, name, email, phoneNumber, firstName, lastName,
                fstAddress, houseNumber, apartmentNumber, city, zipCode, cardNumber,
                month, year, cvv):
    return create_req("profile/add", {"token": token, "group_id": group_id, "name": name,
                                      "email": email, "phoneNumber": phoneNumber, "firstName": firstName,
                                      "lastName": lastName, "fstAddress": fstAddress, "houseNumber": houseNumber,
                                      "apartmentNumber": apartmentNumber, "city": city, "zipCode": zipCode,
                                      "cardNumber": cardNumber, "month": month, "year": year, "cvv": cvv})


def edit_profile(token, _id, name, email, phoneNumber, firstName, lastName,
                 fstAddress, houseNumber, apartmentNumber, city, zipCode, cardNumber,
                 month, year, cvv):
    return create_req("profile/edit", {"token": token, "id": _id, "name": name,
                                       "email": email, "phoneNumber": phoneNumber, "firstName": firstName,
                                       "lastName": lastName, "fstAddress": fstAddress, "houseNumber": houseNumber,
                                       "apartmentNumber": apartmentNumber, "city": city, "zipCode": zipCode,
                                       "cardNumber": cardNumber, "month": month, "year": year, "cvv": cvv})


def show_profiles(token, group_id):
    return create_req('profile/show', {"token": token, "group_id": group_id})


def show_profile_by_id(token, _id):
    return create_req('profile/show/id', {"token": token, "id": _id})


def show_proxies(token, group_id):
    return create_req('proxy/show', {"token": token, "group_id": group_id})


def remove_profile(token, _id):
    return create_req('profile/remove', {"token": token, "id": _id})


def add_proxies(token, name):
    return create_req("proxy_group/add", {"token": token, "name": name})


def remove_proxies(token, _id):
    return create_req("proxy_group/remove", {"token": token, "id": _id})


def add_proxy(token, group_id, host, port, login, password):
    if not (login or password):
        return create_req("proxy/add",
                          {"token": token, "group_id": group_id, "host": host,
                           "port": port})
    else:
        return create_req("proxy/add",
                          {"token": token, "group_id": group_id, "host": host,
                           "port": port, "login": login, "pass": password})


def show_proxy(token, _id):
    return create_req('proxy/show', {"token": token, "group_id": _id})


def remove_proxy(token, _id):
    return create_req("proxy/remove", {"token": token, "id": _id})


def check_proxy(token, _id, url):
    return create_req("proxy/check", {"token": token, "id": _id, "url": url})


def tasks_modules(token):
    return create_req('tasks/modules', {"token": token})


def get_filters(token):
    return create_req('tasks/filters', {"token": token})


def limit_tasks(token):
    return create_req('tasks/limit', {"token": token})


def add_tasks(token, name, module, item_id, amount, profileGroup_id, accountGroup_id, proxyGroup_id, filter, sizes):
    data = {"token": token, "name": name, "module": module, "item_id": item_id,
            "amount": amount,
            "proxyGroup_id": proxyGroup_id, "filter": filter, "sizes": sizes};
    if profileGroup_id:
        data["profileGroup_id"] = profileGroup_id
    if accountGroup_id:
        data["accountGroup_id"] = accountGroup_id
    return create_req('tasks/add', data)


def edit_tasks(token, _id, name, module, item_id, amount, profileGroup_id, accountGroup_id, proxyGroup_id, filter,
               sizes):
    data = {"token": token, "id": _id, "name": name, "module": module, "item_id": item_id,
            "amount": amount,
            "proxyGroup_id": proxyGroup_id, "filter": filter, "sizes": sizes};
    if profileGroup_id:
        data["profileGroup_id"] = profileGroup_id
    if accountGroup_id:
        data["accountGroup_id"] = accountGroup_id
    return create_req('tasks/edit', data)


def show_tasks(token):
    return create_req('tasks/show', {"token": token})


def show_tasks_by_id(token, _id):
    return create_req('tasks/show/id', {"token": token, "id": _id})


def remove_tasks(token, _id):
    return create_req("tasks/remove", {"token": token, "group_id": _id})


def run_tasks(token, _id):
    return create_req("tasks/run", {"token": token, "group_id": _id})


def stop_tasks(token, _id):
    return create_req("tasks/stop", {"token": token, "group_id": _id})


def status_tasks(token):
    return create_req("tasks/status", {"token": token})


def tasks_checked(token, _idGroup, _idTask):
    return create_req("tasks/checked",
                      {"token": token, "group_id": _idGroup, "task_id": _idTask})


# Accounts


def show_account_group(token, module):
    return create_req('account_group/show', {"token": token, "module": module})


def show_account(token, group_id):
    return create_req('accounts/show', {"token": token, "group_id": group_id})


def account_modules(token):
    return create_req('account_group/modules', {"token": token})


def add_account_group(token, name, module):
    return create_req("account_group/add", {"token": token, "name": name, "module": module})


def add_account(token, name, group_id, login, _pass, cookies):
    map = {"token": token, "name": name, "group_id": group_id}
    if login:
        map["login"] = login
    if _pass:
        map["pass"] = _pass
    if cookies:
        map["cookies"] = cookies
    return create_req("accounts/add", map)


def remove_account_group(token, _id):
    return create_req("account_group/remove", {"token": token, "id": _id})


def remove_account(token, _id):
    return create_req("accounts/remove", {"token": token, "id": _id})


def add_monitor(token, name, group_id_list):
    map = {"token": token, "name": name}

    return create_req("monitors/add", map)


'''For admins'''


def reg(login, _pass):
    return create_req("auth/reg", {"login": login, "pass": _pass})


def auth(login, _pass):
    return create_req("auth", {"login": login, "pass": _pass})


def myinfo(login, _pass):
    return create_req("info", {"login": login, "pass": _pass})


def edit_myinfo(login, _pass, username, first_name, last_name, email, biography, creator):
    return create_req("info/edit", {"login": login,
                                    "pass": _pass,
                                    "username": username,
                                    "first_name": first_name,
                                    "last_name": last_name,
                                    "email": email,
                                    "biography": biography,
                                    "creator": creator,
                                    })


def colors():
    return create_req("colors", {})


# wheels


def wheels_create(login, _pass, name, cc, photo, color):
    return create_req("wheels/create", {"login": login,
                                        "pass": _pass,
                                        "name": name,
                                        "cc": cc,
                                        "photo": photo,
                                        "color": color,
                                        })


def wheels(login, _pass):
    return create_req("wheels", {
        "login": login,
        "pass": _pass
    })


def bumpers_create(login, _pass, name, photo, color):
    return create_req("bumpers/create", {"login": login,
                                         "pass": _pass,
                                         "name": name,
                                         "photo": photo,
                                         "color": color,
                                         })


def bumpers(login, _pass):
    return create_req("bumpers", {
        "login": login,
        "pass": _pass
    })


def cars_groups(login, _pass):
    return create_req("cars/groups", {
        "login": login,
        "pass": _pass
    })


def cars_groups_get(login, _pass, _id):
    return create_req("cars/groups", {
        "login": login,
        "pass": _pass,
        "id": _id
    })


def cars_groups_create(login, _pass, name, description, date_of_start, date_of_finish):
    return create_req("cars/groups/create", {"login": login,
                                             "pass": _pass,
                                             "name": name,
                                             "description": description,
                                             "date_of_start": date_of_start,
                                             "date_of_finish": date_of_finish
                                             })


def cars_groups_remove(login, _pass, id):
    return create_req("cars/groups/remove", {"login": login,
                                             "pass": _pass,
                                             "id": id
                                             })


def cars_create(login, _pass, name, series, bumpers, wheels1, first_color, second_color):
    data = {"login": login,
            "pass": _pass,
            "name": name,
            "series": series
            }
    if (bumpers != None): data['bumpers'] = bumpers
    if (wheels1 != None): data['wheels'] = wheels1
    if (first_color != None): data['first_color'] = first_color
    if (second_color != None): data['second_color'] = second_color
    return create_req("cars/create", data)


def item_create(login, _pass, id_car, id_bumper, id_wheels, description, real_photo):
    data = {"login": login,
            "pass": _pass,
            "description": description,
            "real_photo": real_photo
            }
    if (id_car != None): data['id_car'] = id_car
    if (id_bumper != None): data['id_bumper'] = id_bumper
    if (id_wheels != None): data['id_wheels'] = id_wheels
    return create_req("items/create", data)


def item_remove(login, _pass, _id):
    data = {"login": login,
            "pass": _pass,
            "id": _id
            }
    return create_req("items/remove", data)


def items_get(login, _pass):
    data = {"login": login,
            "pass": _pass
            }
    return create_req("items", data)


def trade_get(login, _pass, find):
    data = {"login": login,
            "pass": _pass
            }
    if (find != None): data['find'] = find
    return create_req("trade", data)


def trade_create(login, _pass, _id, price):
    data = {"login": login,
            "pass": _pass,
            "id": _id,
            "price": price
            }
    return create_req("trade/create", data)


def trade_remove(login, _pass, _id):
    data = {"login": login,
            "pass": _pass,
            "id": _id
            }
    return create_req("trade/remove", data)


def trade_buy(login, _pass, _id):
    data = {"login": login,
            "pass": _pass,
            "id": _id
            }
    return create_req("trade/buy", data)


def contract_get(login, _pass):
    data = {"login": login,
            "pass": _pass
            }
    return create_req("contract", data)


def contract_items(login, _pass, _id):
    data = {"login": login,
            "pass": _pass,
            "id": _id
            }
    return create_req("contract/items", data)


def contract_create(login, _pass, to_user, from_money, to_money, closing_date, closing_time, items):
    data = {"login": login,
            "pass": _pass,
            "from_money": from_money,
            "to_money": to_money,
            "closing_date": closing_date
            }
    if (to_user != None): data['to_user'] = to_user
    if (closing_time != None): data['closing_time'] = closing_time
    return create_req("contract/create", data, items, 'items')


def contract_remove(login, _pass, _id):
    data = {"login": login,
            "pass": _pass,
            "id": _id
            }
    return create_req("contract/remove", data)
