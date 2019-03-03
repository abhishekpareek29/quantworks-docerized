import json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
from flaskext.mysql import MySQL

mysql = MySQL()
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['DEBUG'] = True
app.config['MYSQL_DATABASE_HOST'] = '68.183.25.229'
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'virus.exe'
app.config['MYSQL_DATABASE_DB'] = 'quantworks'
app.config['MYSQL_DATABASE_CHARSET'] = 'utf8'
mysql.init_app(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

def count_male_female():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT gender, count(gender) as count FROM user_details GROUP BY gender")
    rows = cursor.fetchall()

    items = []
    for row in rows:
        items.append({row[0]: row[1]})

    return jsonify({'items': items})

@app.route('/api/v1/user-details', methods=['GET'])
def user_details():
    count = count_male_female()

    return count

@app.route('/api/v1/gender-dist', methods=['GET'])
def gender_dist():

    cursor = mysql.connect().cursor()
    cursor.execute("SELECT gender, count(gender) as count FROM user_details GROUP BY gender")
    rows = cursor.fetchall()

    items = []
    for row in rows:
        items.append({row[0]: row[1]})

    return jsonify({'items': items})

@app.route('/api/v1/store-details', methods=['POST'])
def store_details():
    if request.method == 'POST':
        content = request.get_json(force=True)
        username = content['username']
        first_name = content['first_name']
        last_name = content['last_name']
        gender = content['gender']

        values = username, first_name, last_name, gender
        cursor = mysql.connect().cursor()
        cursor.execute("INSERT INTO user_details (username, first_name, last_name, gender) VALUES (%s, %s, %s, %s)", values)

        # count = count_male_female()

    return 'female'


# Sample user detail database.
# https://sample-videos.com/download-sample-sql.php

