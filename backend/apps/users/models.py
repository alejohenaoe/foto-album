import secrets
from django.db import models


class AppUser(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    access_code = models.CharField(max_length=6, unique=True, editable=False, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def generate_access_code(self):
        while True:
            code = "".join(secrets.choice("0123456789") for _ in range(6))
            if not AppUser.objects.filter(access_code=code).exists():
                self.access_code = code
                self.is_active = True
                break

    def __str__(self):
        return f"{self.name} ({self.email})"
