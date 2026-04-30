from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


class PerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # request.user es llenado automáticamente por Simple JWT
        # al validar el token del header Authorization
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })

# Vista pública — no requiere token (sobreescribe el default del settings)
class InfoPublicaView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'mensaje': 'Esto es público'})