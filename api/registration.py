from flask import request

from api.api_worker import reg, auth, myinfo, edit_myinfo, colors, wheels_create, wheels, bumpers_create, bumpers, \
    cars_groups, cars_groups_create, cars_groups_remove, cars_create, cars_groups_get, item_create
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
