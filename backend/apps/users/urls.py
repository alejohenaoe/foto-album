from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from apps.users.views import PerfilView


urlpatterns = [
    # Login endpoint JWT Authentication with Simple JWT ()
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', TokenObtainPairView.as_view(), name='token_blacklist'),  # Endpoint para logout (blacklist)

    # Rutas protegidas
    path('profile/', PerfilView.as_view(), name='user_profile'),
]