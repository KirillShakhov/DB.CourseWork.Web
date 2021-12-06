from flask import request

from api.api_worker import reg, auth, myinfo, edit_myinfo, colors, wheels_create, wheels, bumpers_create, bumpers, \
    cars_groups, cars_groups_create, cars_groups_remove, cars_create, cars_groups_get, item_create, items_get, \
    item_remove, trade_remove, trade_get, trade_create, trade_buy, contract_remove, contract_get, contract_create, \
    contract_items, contract_confirm, auction_get, auction_items, auction_remove, auction_create, article_remove, \
    article_create, article_get
from app import app


@app.route('/reg', methods=['POST'])
def reg_():
    login, _pass = request.values.get('login'), \
                   request.values.get('pass')
    return reg(login, _pass)


@app.route('/auth', methods=['POST'])
def auth_():
    login, _pass = request.values.get('login'), \
                   request.values.get('pass')
    return auth(login, _pass)


@app.route('/info', methods=['GET'])
def myinfo_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    return myinfo(login, _pass)


@app.route('/editinfo', methods=['POST'])
def edit_myinfo_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    username = request.values.get('username')
    first_name = request.values.get('first_name')
    last_name = request.values.get('last_name')
    email = request.values.get('email')
    biography = request.values.get('biography')
    creator = request.values.get('creator')
    return edit_myinfo(login, _pass, username, first_name, last_name, email, biography, creator)


@app.route('/colors', methods=['GET'])
def colors_():
    return colors()


@app.route('/wheels/create', methods=['POST'])
def wheels_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    name = request.values.get('name')
    cc = request.values.get('cc')
    photo = request.values.get('photo')
    color = request.values.get('color')
    return wheels_create(login, _pass, name, cc, photo, color)


@app.route('/wheels', methods=['GET'])
def wheels_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    return wheels(login, _pass)


@app.route('/bumpers/create', methods=['POST'])
def bumpers_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    name = request.values.get('name')
    photo = request.values.get('photo')
    color = request.values.get('color')
    return bumpers_create(login, _pass, name, photo, color)


@app.route('/bumpers', methods=['GET'])
def bumpers_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    return bumpers(login, _pass)


@app.route('/cars/groups', methods=['GET'])
def cars_groups_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    return cars_groups(login, _pass)


@app.route('/cars/groups/get', methods=['GET'])
def cars_groups_get_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return cars_groups_get(login, _pass, _id)


@app.route('/cars/groups/create', methods=['POST'])
def cars_groups_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    name = request.values.get('name')
    description = request.values.get('description')
    date_of_start = request.values.get('date_of_start')
    date_of_finish = request.values.get('date_of_finish')
    return cars_groups_create(login, _pass, name, description, date_of_start, date_of_finish)


@app.route('/cars/groups/remove', methods=['POST'])
def cars_groups_remove_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return cars_groups_remove(login, _pass, _id)


@app.route('/cars/create', methods=['POST'])
def cars_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    name = request.values.get('name')
    series = request.values.get('series')
    bumpers = request.values.get('bumpers')
    wheels = request.values.get('wheels')
    first_color = request.values.get('first_color')
    second_color = request.values.get('second_color')
    return cars_create(login, _pass, name, series, bumpers, wheels, first_color, second_color)


@app.route('/items/create', methods=['POST'])
def item_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    id_car = request.values.get('id_car')
    id_bumper = request.values.get('id_bumper')
    id_wheels = request.values.get('id_wheels')
    description = request.values.get('description')
    real_photo = request.values.get('real_photo')
    return item_create(login, _pass, id_car, id_bumper, id_wheels, description, real_photo)


@app.route('/items', methods=['GET'])
def items_get_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    return items_get(login, _pass)


@app.route('/items/remove', methods=['POST'])
def item_remove_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return item_remove(login, _pass, _id)


@app.route('/trade/get', methods=['GET'])
def trade_get_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    find = request.values.get('find')
    return trade_get(login, _pass, find)


@app.route('/trade/remove', methods=['POST'])
def trade_remove_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return trade_remove(login, _pass, _id)


@app.route('/trade/create', methods=['POST'])
def trade_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    price = request.values.get('price')
    return trade_create(login, _pass, _id, price)


@app.route('/trade/buy', methods=['POST'])
def trade_buy_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return trade_buy(login, _pass, _id)


@app.route('/contract/get', methods=['GET'])
def contract_get_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    return contract_get(login, _pass)


@app.route('/contract/items', methods=['GET'])
def contract_get_items_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return contract_items(login, _pass, _id)


@app.route('/contract/remove', methods=['POST'])
def contract_remove_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return contract_remove(login, _pass, _id)

@app.route('/contract/confirm', methods=['POST'])
def contract_confirm_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return contract_confirm(login, _pass, _id)


@app.route('/contract/create', methods=['POST'])
def contract_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    to_user = request.values.get('to_user')
    from_money = request.values.get('from_money')
    to_money = request.values.get('to_money')
    closing_date = request.values.get('closing_date')
    closing_time = request.values.get('closing_time')
    items = request.values.getlist('items[]')
    print(items)
    return contract_create(login, _pass, to_user, from_money, to_money, closing_date, closing_time, items)






@app.route('/auction/get', methods=['GET'])
def auction_get_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    return auction_get(login, _pass)


@app.route('/auction/items', methods=['GET'])
def auction_get_items_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return auction_items(login, _pass, _id)


@app.route('/auction/remove', methods=['POST'])
def auction_remove_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return auction_remove(login, _pass, _id)


@app.route('/auction/create', methods=['POST'])
def auction_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    to_user = request.values.get('to_user')
    from_money = request.values.get('from_money')
    to_money = request.values.get('to_money')
    closing_date = request.values.get('closing_date')
    closing_time = request.values.get('closing_time')
    items = request.values.getlist('items[]')
    print(items)
    return auction_create(login, _pass, to_user, from_money, to_money, closing_date, closing_time, items)



@app.route('/article/get', methods=['GET'])
def articles_get_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    return article_get(login, _pass)


@app.route('/article/remove', methods=['POST'])
def articles_remove_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    _id = request.values.get('id')
    return article_remove(login, _pass, _id)


@app.route('/article/create', methods=['POST'])
def articles_create_():
    login, _pass = request.cookies.get('login'), \
                   request.cookies.get('pass')
    title = request.values.get('title')
    text = request.values.get('text')
    car = request.values.get('car')
    return article_create(login, _pass, title, text, car)


