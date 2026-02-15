from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    action = request.args.get("action", "start")
    gamestates = {
        "start": {
            "character": "Character Name",
            "quote": "Save my life?",
            "options": [{
                "text": "Trigger Minigame",
                "option": "minigame"
            },
            {
                "text": "Don't Trigger Minigame",
                "option": "no"
            }]
        },
        "no": {
            "character": "Character Name",
            "quote": "Are you sure?",
            "options": [{
                "text": "Don't want to",
                "option": "done"
            },
            {
                "text": "Changed my mind",
                "option": "minigame"
            }]
        },
        "done": {
            "character": "Character Name",
            "quote": "OK, sounds good"
        }
    }
    print(action)

    return render_template(
        "main.html",
        gamestate = gamestates[action]
    )

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