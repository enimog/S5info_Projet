import time
import json

from http import HTTPStatus
import tornado.web
import sqlite3


SENSOR_TYPE_TEMPERATURE = 1
SENSOR_TYPE_PH = 2
SENSOR_TYPE_ALCOHOL = 3
SENSOR_TYPE_SUGAR = 4


class BaseHandler(tornado.web.RequestHandler):

    db_conn = None

    def initialize(self):
        self.db_conn = sqlite3.connect('E:\\MaximeBreton\\OneDrive\\Documents\\universite\\s5\\projet\\Project.db')
        #self.db_conn = sqlite3.connect('C:\\Users\\Maxime\\OneDrive\\Documents\\universite\\s5\projet\\Project.db')

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with, Content-Type")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS')


    def options(self):

        self.set_status(204)
        self.finish()

    def on_finish(self):
        self.db_conn.close()


class RootHandler(BaseHandler):

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


class RecipesHandler(BaseHandler):

    def get(self):

        cursor = self.db_conn.execute('SELECT * from recipe')

        recipes_list = []
        for row in cursor:
            temp_recipe = {'id': row[0], 'name': row[1], 'description': row[2], 'target_temperature': row[3], 'target_ph': row[4], 'target_alcohol': row[5], 'target_sugar': row[6]}
            recipes_list.append(temp_recipe)

        recipes = {'recipes': recipes_list}

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

        if not (isinstance(recipe_temperature, float) or isinstance(recipe_temperature, int)):
            self.write("Recipe temperature must be of type float or int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not (isinstance(recipe_ph, float) or isinstance(recipe_ph, int)):
            self.write("Recipe ph must be of type float or int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not (isinstance(recipe_alcohol, float) or isinstance(recipe_alcohol, int)):
            self.write("Recipe alcohol must be of type float or int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not (isinstance(recipe_sugar, float) or isinstance(recipe_sugar, int)):
            self.write("Recipe sugar must be of type float or int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # Insert into DB
        query = "INSERT INTO recipe (name, description, target_temperature, target_ph, target_alcohol, target_sugar) VALUES ('" + \
        recipe_name + "','" + \
        recipe_description + "'," + \
        str(recipe_temperature) + "," + \
        str(recipe_ph) + "," + \
        str(recipe_alcohol) + "," + \
        str(recipe_sugar) + ")"
        
        self.db_conn.execute(query)
        new_id = None
        cursor = self.db_conn.execute("SELECT last_insert_rowid()")
        for row in cursor:
            new_id = row[0]
        self.db_conn.commit()

        self.write({'id': new_id})
        self.set_status(HTTPStatus.OK)


class UnitsHandler(BaseHandler):

    def get(self):

        cursor = self.db_conn.execute('SELECT * from fermentation_unit')

        units_list = []
        for row in cursor:
            temp_unit = {'id': row[0], 'name': row[1], 'description': row[2], \
            'recipe_id': row[3], 'start_date': row[4], 'is_active': bool(row[5]), \
            'location': row[6], 'temperature': row[7], 'ph': row[8], \
            'alcohol': row[9], 'sugar': row[10]}
            units_list.append(temp_unit)

        units = {'units': units_list}

        self.write(units)
        self.set_status(HTTPStatus.OK)


    def post(self):

        units = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        unit_name = units['name']
        unit_description = units['description']
        unit_recipe_id = units['recipe_id']
        unit_start_date = int(round(time.time() * 1000))
        unit_is_active = units['is_active']
        unit_location = units['location']

        # Validation of received values
        if not isinstance(unit_name, str):
            self.write("Unit recipe name must be of type string.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(unit_description, str):
            self.write("Unit description must be of type string.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(unit_recipe_id, int):
            self.write("Unit recipe ID must be of type int.")
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


        recipe_temperature = 0
        recipe_ph = 0
        recipe_alcohol = 0
        recipe_sugar = 0
        if unit_recipe_id > 0:
            cursor = self.db_conn.execute('SELECT * from recipe where id = ' + str(unit_recipe_id))

            for row in cursor:
                recipe_temperature = row[3]
                recipe_ph = row[4]
                recipe_alcohol = row[5]
                recipe_sugar = row[6]

        # Insert into DB
        query = "INSERT INTO fermentation_unit (name, description, recipe_id, start_date, is_active, location, temperature, ph, alcohol, sugar) VALUES ('" + \
        unit_name + "','" + \
        unit_description + "'," + \
        str(unit_recipe_id) + "," + \
        str(unit_start_date) + "," + \
        str(int(unit_is_active)) + ",'" + \
        unit_location + "'," + \
        str(recipe_temperature) + "," + \
        str(recipe_ph) + "," + \
        str(recipe_alcohol) + "," + \
        str(recipe_sugar) + ")"
        
        self.db_conn.execute(query)
        new_id = None
        cursor = self.db_conn.execute("SELECT last_insert_rowid()")
        for row in cursor:
            new_id = row[0]
        self.db_conn.commit()

        self.write({'id': new_id})
        self.set_status(HTTPStatus.OK)


    def put(self):

        update = json.loads(self.request.body.decode('utf-8'))

        unit_id = update['unit_id']
        field = update['field']
        value = update['value']

        if not isinstance(unit_id, int):
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not isinstance(field, str):
            self.write("Unit is active must be of type string.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if not (isinstance(value, float) or isinstance(value, int) or isinstance(value, bool)):
            self.write("Unit location must be of type float or int or bool.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        if field == 'is_active':
            query = "UPDATE fermentation_unit SET " + field + " = " + str(int(value)) + " WHERE id = " + str(unit_id)
        else:
            query = "UPDATE fermentation_unit SET " + field + " = " + str(value) + " WHERE id = " + str(unit_id)

        self.db_conn.execute(query)
        self.db_conn.commit()

        self.write({'id': unit_id})
        self.set_status(HTTPStatus.OK)


class TemperatureHandler(BaseHandler):

    def get(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        cursor = self.db_conn.execute("SELECT * FROM (SELECT * FROM measure where \
        parent_unit_id = " + str(parent_unit_id) + " and sensor_type = " + str(SENSOR_TYPE_TEMPERATURE) \
        + " order by timestamp desc) limit 100")

        measure_list = []
        for row in cursor:
            temp_measure = {'id': row[1], 'parent_unit_id': row[2], \
            'timestamp': row[3], 'value': row[4]}
            measure_list.append(temp_measure)

        measures = {'temperature': measure_list}

        self.write(measures)
        self.set_status(HTTPStatus.OK)


    def post(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return
        
        print(self.request.body)
        temperature = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        temperature_timestamp = int(round(time.time() * 1000))
        temperature_value = temperature['value']

        if not (isinstance(temperature_value, float) or isinstance(temperature_value, int)):
            self.write("Temperature value must be of type float or int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # Insert into DB
        query = "INSERT INTO measure (parent_unit_id, sensor_type, timestamp, value) VALUES (" + \
        str(parent_unit_id) + "," + \
        str(SENSOR_TYPE_TEMPERATURE) + "," + \
        str(temperature_timestamp) + "," + \
        str(temperature_value) + ")"

        self.db_conn.execute(query)
        new_id = None
        cursor = self.db_conn.execute("SELECT last_insert_rowid()")
        for row in cursor:
            new_id = row[0]
        self.db_conn.commit()

        self.write({'id': new_id})
        self.set_status(HTTPStatus.OK)


class PHHandler(BaseHandler):

    def get(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        cursor = self.db_conn.execute("SELECT * FROM (SELECT * FROM measure where \
        parent_unit_id = " + str(parent_unit_id) + " and sensor_type = " + str(SENSOR_TYPE_PH) \
        + " order by timestamp desc) limit 100")

        measure_list = []
        for row in cursor:
            temp_measure = {'id': row[1], 'parent_unit_id': row[2], \
            'timestamp': row[3], 'value': row[4]}
            measure_list.append(temp_measure)

        measures = {'ph': measure_list}

        self.write(measures)
        self.set_status(HTTPStatus.OK)


    def post(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        ph = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        ph_timestamp = int(round(time.time() * 1000))
        ph_value = ph['value']

        if not (isinstance(ph_value, float) or isinstance(ph_value, int)):
            self.write("PH value must be of type float or int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # Insert into DB
        query = "INSERT INTO measure (parent_unit_id, sensor_type, timestamp, value) VALUES (" + \
        str(parent_unit_id) + "," + \
        str(SENSOR_TYPE_PH) + "," + \
        str(ph_timestamp) + "," + \
        str(ph_value) + ")"

        self.db_conn.execute(query)
        new_id = None
        cursor = self.db_conn.execute("SELECT last_insert_rowid()")
        for row in cursor:
            new_id = row[0]
        self.db_conn.commit()

        self.write({'id': new_id})
        self.set_status(HTTPStatus.OK)


class AlcoholHandler(BaseHandler):

    def get(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        cursor = self.db_conn.execute("SELECT * FROM (SELECT * FROM measure where \
        parent_unit_id = " + str(parent_unit_id) + " and sensor_type = " + str(SENSOR_TYPE_ALCOHOL) \
        + " order by timestamp desc) limit 100")

        measure_list = []
        for row in cursor:
            temp_measure = {'id': row[1], 'parent_unit_id': row[2], \
            'timestamp': row[3], 'value': row[4]}
            measure_list.append(temp_measure)

        measures = {'alcohol': measure_list}

        self.write(measures)
        self.set_status(HTTPStatus.OK)


    def post(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        alcohol = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        alcohol_timestamp = int(round(time.time() * 1000))
        alcohol_value = alcohol['value']

        if not (isinstance(alcohol_value, float) or isinstance(alcohol_value, int)):
            self.write("Alcohol value must be of type float or int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # Insert into DB
        query = "INSERT INTO measure (parent_unit_id, sensor_type, timestamp, value) VALUES (" + \
        str(parent_unit_id) + "," + \
        str(SENSOR_TYPE_ALCOHOL) + "," + \
        str(alcohol_timestamp) + "," + \
        str(alcohol_value) + ")"

        self.db_conn.execute(query)
        new_id = None
        cursor = self.db_conn.execute("SELECT last_insert_rowid()")
        for row in cursor:
            new_id = row[0]
        self.db_conn.commit()

        self.write({'id': new_id})
        self.set_status(HTTPStatus.OK)


class SugarHandler(BaseHandler):

    def get(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        cursor = self.db_conn.execute("SELECT * FROM (SELECT * FROM measure where \
        parent_unit_id = " + str(parent_unit_id) + " and sensor_type = " + str(SENSOR_TYPE_SUGAR) \
        + " order by timestamp desc) limit 100")

        measure_list = []
        for row in cursor:
            temp_measure = {'id': row[1], 'parent_unit_id': row[2], \
            'timestamp': row[3], 'value': row[4]}
            measure_list.append(temp_measure)

        measures = {'sugar': measure_list}

        self.write(measures)
        self.set_status(HTTPStatus.OK)


    def post(self, slug):

        try:
            parent_unit_id = int(slug)
        except:
            self.write("Unit ID must be of type int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        sugar = json.loads(self.request.body.decode('utf-8'))

        # Parsing received values
        sugar_timestamp = int(round(time.time() * 1000))
        sugar_value = sugar['value']

        if not (isinstance(sugar_value, float) or isinstance(sugar_value, int)):
            self.write("Sugar value must be of type float or int.")
            self.set_status(HTTPStatus.BAD_REQUEST)
            return

        # Insert into DB
        query = "INSERT INTO measure (parent_unit_id, sensor_type, timestamp, value) VALUES (" + \
        str(parent_unit_id) + "," + \
        str(SENSOR_TYPE_SUGAR) + "," + \
        str(sugar_timestamp) + "," + \
        str(sugar_value) + ")"

        self.db_conn.execute(query)
        new_id = None
        cursor = self.db_conn.execute("SELECT last_insert_rowid()")
        for row in cursor:
            new_id = row[0]
        self.db_conn.commit()

        self.write({'id': new_id})
        self.set_status(HTTPStatus.OK)
