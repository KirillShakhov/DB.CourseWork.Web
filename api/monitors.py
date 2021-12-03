from flask import request, redirect

from api.api_worker import check_key, account_modules
from app import app


@app.route('/add_monitor', methods=['GET'])
def account_modules_():
    if not request.cookies.get('key') or not check_key(request.cookies.get('key')):
        return redirect('/')
    return account_modules(token=request.cookies.get('key'))
