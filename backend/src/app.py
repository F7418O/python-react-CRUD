from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS


app = Flask(__name__)

#Configuracion y conexion a la BD pythonreact
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreact'
#Obtenemos la conexion
mongoconec = PyMongo(app)

CORS(app)

#Creacion y Conexion a la collection users
db = mongoconec.db.users

@app.route('/user', methods=['POST'])
def postUser():
    user = request.json
    id = db.insert({
        'name': user['name'],
        'email': user['email'],
        'password': user['password']
    })
    return jsonify(str(ObjectId(id)))

@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for user in db.find():
        users.append({
            '_id': str(ObjectId(user['_id'])),
            'name': user['name'],
            'email': user['email'],
            'password': user['password']
        })

    return jsonify(users)

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})

    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password': user['password']
    })

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'Message': 'User deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({
        '_id': ObjectId(id)
    }, {'$set':{
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
        }
    })
    return jsonify({'Message': 'User updated'})

if __name__ == '__main__':
    app.run(debug=True)