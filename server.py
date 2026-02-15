from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    options = [
        {
            "text": "Trigger Minigame",
            "option": "minigame"
        },
        {
            "text": "Don't Trigger Minigame",
            "option": ""
        },
    ]
    return render_template('chooseEvent.html', character="Character Name", quote="Do you want to play the minigame?", options=options) 

@app.route('/hi', methods=['GET'])
def hello_world2():
    user_name = request.args.get("userName", "unknown")
    return render_template('main.html', user=user_name) 

@app.route("/minigame")
def minigame():
    return render_template('minigameTemplate.html') 

@app.route("/matchminigame")
def matchminigame():
    return render_template('minigameMatch.html') 

@app.route("/success")
def success():
    return render_template('success.html') 