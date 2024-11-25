from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.db import connection

class Command(BaseCommand):
    help = 'Ensures all migrations are applied'

    def handle(self, *args, **kwargs):
        self.stdout.write('Checking database connection...')
        with connection.cursor() as cursor:
            try:
                cursor.execute("SELECT COUNT(*) FROM django_migrations")
                self.stdout.write('Database connected successfully')
            except Exception as e:
                self.stdout.write(f'Database error: {e}')
                self.stdout.write('Running migrations...')
                call_command('migrate', '--noinput') 