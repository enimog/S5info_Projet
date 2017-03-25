from http import HTTPStatus

import tornado.ioloop
import tornado.web

from handlers import RootHandler, RecipesHandler, UnitsHandler, \
TemperatureHandler, PHHandler, AlcoholHandler, SugarHandler

api_port = 8080


def make_api_server():

    return tornado.web.Application([
        (r"/", RootHandler),
        (r"/recipes", RecipesHandler),
        (r"/units", UnitsHandler),
        (r"/temperature/([^/]+)", TemperatureHandler),
        (r"/ph/([^/]+)", PHHandler),
        (r"/alcohol/([^/]+)", AlcoholHandler),
        (r"/sugar/([^/]+)", SugarHandler),
    ])


if __name__ == "__main__":

    try:
        print("Tornado Server Starting...")
        api_server = make_api_server()
        api_server.listen(api_port)
        print("Tornado Server Running at port: " + str(api_port))
        tornado.ioloop.IOLoop.current().start()
    except:
        print("Tornado Server Stopped.")
        tornado.ioloop.IOLoop.current().stop()
