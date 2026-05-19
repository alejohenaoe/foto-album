from rest_framework import serializers

from apps.users.models import AppUser


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = [
            'id', 'email', 'name', 'phone',
            'access_code', 'is_active', 'created_at',
        ]
        read_only_fields = ['id', 'access_code', 'is_active', 'created_at']
