from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import AppUser
from apps.users.serializers import AppUserSerializer


class PerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })


class InfoPublicaView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'mensaje': 'Esto es público'})


class AppUserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class AppUserListCreateView(generics.ListCreateAPIView):
    queryset = AppUser.objects.all().order_by('-created_at')
    serializer_class = AppUserSerializer
    permission_classes = [IsAdminUser]
    pagination_class = AppUserPagination
    search_fields = ['email']

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', '')
        if search:
            queryset = queryset.filter(email__icontains=search)
        return queryset

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.generate_access_code()
        instance.save(update_fields=['access_code', 'is_active'])


class AppUserDeactivateView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        try:
            app_user = AppUser.objects.get(pk=pk)
        except AppUser.DoesNotExist:
            return Response(
                {'detail': 'Usuario no encontrado.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        app_user.is_active = False
        app_user.access_code = None
        app_user.save(update_fields=['is_active', 'access_code'])
        serializer = AppUserSerializer(app_user)
        return Response(serializer.data)


class AppUserRegenerateView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        try:
            app_user = AppUser.objects.get(pk=pk)
        except AppUser.DoesNotExist:
            return Response(
                {'detail': 'Usuario no encontrado.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        app_user.generate_access_code()
        app_user.save(update_fields=['access_code', 'is_active'])
        serializer = AppUserSerializer(app_user)
        return Response(serializer.data)
