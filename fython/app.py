from flask import Flask, request
from random import randint
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
df = pd.read_csv('pokemon.csv')
START = 1
END = df['#'].max() + 1


class Session:
    def __init__(self, name, defaults):
        self.ct = name
        self.cr = defaults

    def __eq__(self, other):
        if isinstance(other, str):
            return self.ct == other
        else:
            return self.ct == other.ct

    def getTrainer(self):
        return self.ct

    def getRolls(self):
        return self.cr

    def minusRoll(self):
        self.cr -= 1


sessionList = []
Globals = { "rolls": 10 , "gens": 6 }


@app.route("/api/subtract", methods=["POST"])
def subtractOne():
    req = request.json["name"]
    index = sessionList.index(req)
    sessionList[index].minusRoll()
    rollsLeft = str(sessionList[index].getRolls())
    print(req, index, sessionList[index].getRolls())
    # sessionList[index]
    return rollsLeft, 200


@app.route("/api/config", methods=["POST"])
def setGlobals():
    req = request.json["name"]
    Globals['rolls'] = req
    Globals['gens'] = 6


@app.route("/api/trainer", methods=["POST"])
def checkDupes():
    trainer = request.json["name"]
    # print(trainer["name"])
    if(trainer not in sessionList):
        print("appending")
        sessionList.append(Session(trainer, Globals['rolls']))
    return '', 200


@app.route("/api/random_encounter")
def random_encounter():
    pokemonId = randint(START, END)
    pokemon = df[df['#'] == pokemonId].iloc[0]
    # print(pokemon)
    isShiny = randint(0, 100) > 90
    shinyString = 'shiny/' if isShiny else ''
    pokemon['Shiny'] = isShiny
    pokemon['sprite'] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{shinyString}{pokemonId}.png"
    return pokemon.to_json()

if __name__ == '__main__':
    # app.run(port=3060, debug=True)
    app.run(host="0.0.0.0",port=3060, debug=True)
# preciso trocar esse endereço depois(?)