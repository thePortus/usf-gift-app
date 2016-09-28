from rest_framework import serializers
from voluptuous import Schema, MultipleInvalid, Invalid


class SchemaValidator:

    def __init__(self, *args, **kwargs):
        self._schema = Schema(*args, **kwargs)

    def __call__(self, data):
        try:
            self._schema(data)
        except MultipleInvalid as e:
            raise serializers.ValidationError(str(e))
        except Invalid as e:
            raise serializers.ValidationError(str(e))
