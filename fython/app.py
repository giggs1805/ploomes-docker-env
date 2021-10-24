from flask import Flask
from random import randint
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
df = pd.read_csv('pokemon.csv')
START = 1
# END = df['#'].max() + 1
END = df['#'].max() + 1

@app.route("/api/set_generations")
def set_generations(val):
    pass

@app.route("/api/set_max_number")
def set_max_number(val):
    pass

@app.route("/api/random_encounter")
def random_encounter():
    pokemonId = randint(START, END)
    pokemon = df[df['#'] == pokemonId].iloc[0]
    print(pokemon)
    isShiny = randint(0, 100) > 90
    shinyString = 'shiny/' if isShiny else ''
    pokemon['Shiny'] = isShiny
    pokemon['sprite'] = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{shinyString}{pokemonId}.png"
    return pokemon.to_json()

if __name__ == '__main__':
    # app.run(port=3060, debug=True)
    app.run(host="0.0.0.0",port=3060, debug=True)
# preciso trocar esse endereço depois(?)