import os

from flask import Flask, render_template, request, make_response, send_from_directory, session
from flask_bootstrap import Bootstrap

from api.api_worker import check_key

app = Flask(__name__)
bootstrap = Bootstrap(app)

from api.registration import *


@app.route('/favicon.ico')
def favicon_ico():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


@app.route('/', methods=['POST', 'GET'])
@app.route('/myitems', methods=['POST', 'GET'])
@app.route('/contracts', methods=['POST', 'GET'])
@app.route('/trade', methods=['POST', 'GET'])
@app.route('/articles', methods=['POST', 'GET'])
@app.route('/auctions', methods=['POST', 'GET'])
@app.route('/wiki_cars', methods=['POST', 'GET'])
@app.route('/wiki_wheels', methods=['POST', 'GET'])
@app.route('/wiki_bumpers', methods=['POST', 'GET'])
@app.route('/settings', methods=['POST', 'GET'])
def index():
    res = make_response(render_template('main.html'))
    if request.values.get('login'):
        if check_key(request.values.get('login'), request.values.get('pass')):
            res.set_cookie('login', request.values.get('login'))
            res.set_cookie('pass', request.values.get('pass'))
            return res
        else:
            return render_template('auth.html')
    elif request.cookies.get('login'):
        if check_key(request.cookies.get('login'), request.cookies.get('pass')):
            return res
        else:
            return render_template('auth.html')
    else:
        return render_template('auth.html')


@app.route('/logout')
def logout():
    res = make_response(render_template('auth.html'))
    res.delete_cookie('login')
    res.delete_cookie('pass')
    return res


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=9874)
