import time
import json

from http import HTTPStatus
import tornado.web

class RootHandler(tornado.web.RequestHandler):

    def get(self):

        endpoints = """<h3>Endpoints</h3>
        <ul>
            <li>(GET) /</li>
            <li>(GET|POST) /recipes</li>
            <li>(GET|POST) /units</li>
            <li>(GET|POST) /temperature/{unit_id}</li>
            <li>(GET|POST) /ph/{unit_id}</li>
            <li>(GET|POST) /alcohol/{unit_id}</li>
            <li>(GET|POST) /sugar/{unit_id}</li>
        </ul>
        <h3>Version: 0.0.1</h3>
        """

        self.write(endpoints)
        self.set_status(HTTPStatus.OK)


class RecipesHandler(tornado.web.RequestHandler):

    def get(self):

        # TODO make call to DB to get real data
        recipes = {'recipes': [ \
        {'id': 1, 'name': 'recipe1', 'description': 'Bonne', 'target_temperature': 41.3, 'target_ph': 6.7, 'target_alcohol': 9.5, 'target_sugar': 27}, \
        {'id': 2, 'name': 'recipe2', 'description': 'Excellente', 'target_temperature': 39.1, 'target_ph': 6.6, 'target_alcohol': 5, 'target_sugar': 12}]}

        self.write(recipes)
        self.set_status(HTTPStatus.OK)


    def post(self):

        recipes = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        recipe_name = recipes['name']
        recipe_description = recipes['description']
        recipe_temperature = recipes['target_temperature']
        recipe_ph = recipes['target_ph']
        recipe_alcohol = recipes['target_alcohol']
        recipe_sugar = recipes['target_sugar']

        # Validation of received values
        if not isinstance(recipe_name, str):
            self.write("Recipe name must be of type string.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(recipe_description, str):
            self.write("Recipe description must be of type string.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(recipe_temperature, float):
            self.write("Recipe temperature must be of type float.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(recipe_ph, float):
            self.write("Recipe ph must be of type float.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(recipe_alcohol, float):
            self.write("Recipe alcohol must be of type float.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(recipe_sugar, float):
            self.write("Recipe sugar must be of type float.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to post data and return id 

        self.write({'id': -1})
        self.set_status(HTTPStatus.OK)


class UnitsHandler(tornado.web.RequestHandler):

    def get(self):

        # TODO make call to DB to get real data
        units = {'units': [ \
        {'id': 3, 'recipe_id': 1, 'description': 'Biere dans mon sous-sol', 'start_date': '2017/03/19', 'is_active': True, 'location': 'Sherbrooke'}, \
        {'id': 4, 'recipe_id': 1, 'description': 'Vin de pissenlit', 'start_date': '2017/02/23', 'is_active': True, 'location': 'Magog'}, \
        {'id': 5, 'recipe_id': 2, 'description': 'Porto rouge', 'start_date': '2017/03/16', 'is_active': True, 'location': 'Drumundville'}]}

        self.write(units)
        self.set_status(HTTPStatus.OK)


    def post(self):

        units = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        unit_recipe_id = units['recipe_id']
        unit_description = units['description']
        unit_start_date = units['start_date']
        unit_is_active = units['is_active']
        unit_location = units['location']

        # Validation of received values
        if not isinstance(unit_recipe_id, int):
            self.write("Unit recipe ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(unit_description, str):
            self.write("Unit description must be of type string.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(unit_start_date, str):
            self.write("Unit start date must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(unit_is_active, bool):
            self.write("Unit is active must be of type bool.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(unit_location, str):
            self.write("Unit location must be of type string.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to post data and return id 

        self.write({'id': -1})
        self.set_status(HTTPStatus.OK)


class TemperatureHandler(tornado.web.RequestHandler):

    def get(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to get real data
        temperature = {'temperature': [ \
        {'id': 6, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 0), 'value': 10.0}, \
        {'id': 7, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 30), 'value': 10.5}, \
        {'id': 8, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 60), 'value': 12.0}, \
        {'id': 9, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 90), 'value': 15.1}, \
        {'id': 10, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 120), 'value': 18.6}, \
        {'id': 11, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 150), 'value': 23.3}, \
        {'id': 12, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 180), 'value': 22.1}]}

        self.write(temperature)
        self.set_status(HTTPStatus.OK)


    def post(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        temperature = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        temperature_timestamp = temperature['timestamp']
        temperature_value = temperature['value']

        if not isinstance(temperature_timestamp, int):
            self.write("Temperature timestamp must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(temperature_value, float):
            self.write("Temperature value must be of type float.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to post data and return id 

        self.write({'id': -1})
        self.set_status(HTTPStatus.OK)


class PHHandler(tornado.web.RequestHandler):

    def get(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to get real data
        ph = {'ph': [ \
        {'id': 13, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 0), 'value': 6.6}, \
        {'id': 14, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 30), 'value': 6.7}, \
        {'id': 15, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 60), 'value': 6.5}, \
        {'id': 16, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 90), 'value': 6.7}]}

        self.write(ph)
        self.set_status(HTTPStatus.OK)


    def post(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        ph = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        ph_timestamp = ph['timestamp']
        ph_value = ph['value']

        if not isinstance(ph_timestamp, int):
            self.write("PH timestamp must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(ph_value, float):
            self.write("PH value must be of type float.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to post data and return id 

        self.write({'id': -1})
        self.set_status(HTTPStatus.OK)


class AlcoholHandler(tornado.web.RequestHandler):

    def get(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to get real data
        alcohol = {'alcohol': [ \
        {'id': 17, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 0), 'value': 1.1}, \
        {'id': 18, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 30), 'value': 1.4}, \
        {'id': 19, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 60), 'value': 2.0}, \
        {'id': 20, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 90), 'value': 2.9}, \
        {'id': 21, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 120), 'value': 2.9}, \
        {'id': 22, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 150), 'value': 3.3}, \
        {'id': 23, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 180), 'value': 3.8}, \
        {'id': 24, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 210), 'value': 4.1}, \
        {'id': 25, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 240), 'value': 4.7}, \
        {'id': 26, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 270), 'value': 5.0}]}

        self.write(alcohol)
        self.set_status(HTTPStatus.OK)


    def post(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        alcohol = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        alcohol_timestamp = alcohol['timestamp']
        alcohol_value = alcohol['value']

        if not isinstance(alcohol_timestamp, int):
            self.write("Alcohol timestamp must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(alcohol_value, float):
            self.write("Alcohol value must be of type float.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to post data and return id 

        self.write({'id': -1})
        self.set_status(HTTPStatus.OK)


class SugarHandler(tornado.web.RequestHandler):

    def get(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to get real data
        sugar = {'sugar': [ \
        {'id': 27, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 0), 'value': 0.25}, \
        {'id': 28, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 30), 'value': 0.31}, \
        {'id': 29, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 60), 'value': 0.32}, \
        {'id': 30, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 90), 'value': 0.33}, \
        {'id': 31, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 120), 'value': 0.34}, \
        {'id': 32, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 150), 'value': 0.46}, \
        {'id': 33, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 180), 'value': 0.47}, \
        {'id': 34, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 210), 'value': 0.53}, \
        {'id': 35, 'parent_unit_id': parent_unit_id, 'timestamp': (int(round(time.time() * 1000)) + 240), 'value': 0.58}]}

        self.write(sugar)
        self.set_status(HTTPStatus.OK)


    def post(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        sugar = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        sugar_timestamp = sugar['timestamp']
        sugar_value = sugar['value']

        if not isinstance(sugar_timestamp, int):
            self.write("Sugar timestamp must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(sugar_value, float):
            self.write("Sugar value must be of type float.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # TODO make call to DB to post data and return id 

        self.write({'id': -1})
        self.set_status(HTTPStatus.OK)
