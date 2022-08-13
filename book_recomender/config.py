import os
from dotenv import dotenv_values


basedir = os.path.abspath(os.path.dirname(__file__))

dotenv_path = r"C:\Users\User\Desktop\afrive_book_store\.env"
config = dotenv_values(dotenv_path)



class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    # SECRET_KEY = 'this-really-needs-to-be-changed'
    SQLALCHEMY_DATABASE_URI = config.get('DATABASE_URL')
    


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    