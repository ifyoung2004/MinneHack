from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('chooseEvent.html', character="Character Name", quote="I'm saying this") 

@app.route('/hi', methods=['GET'])
def hello_world2():
    user_name = request.args.get("userName", "unknown")
    return render_template('main.html', user=user_name) 