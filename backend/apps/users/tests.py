from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.users.models import AppUser


class AppUserAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.admin = User.objects.create_superuser(
            username='admin',
            password='admin123',
            email='admin@test.com',
        )

        self.regular_user = User.objects.create_user(
            username='user',
            password='user123',
            email='user@test.com',
        )

        self.list_url = reverse('app-user-list-create')

    def _get_admin_token(self):
        response = self.client.post(
            reverse('token_obtain_pair'),
            {'username': 'admin', 'password': 'admin123'},
            format='json',
        )
        return response.data['access']

    def _auth_admin(self):
        token = self._get_admin_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    def _auth_regular(self):
        response = self.client.post(
            reverse('token_obtain_pair'),
            {'username': 'user', 'password': 'user123'},
            format='json',
        )
        token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')


class CreateAppUserTests(AppUserAPITestCase):
    def test_create_app_user_as_admin_returns_201_and_generates_code(self):
        self._auth_admin()
        data = {'email': 'juan@test.com', 'name': 'Juan Pérez', 'phone': '3001234567'}
        response = self.client.post(self.list_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], 'juan@test.com')
        self.assertEqual(response.data['name'], 'Juan Pérez')
        self.assertEqual(response.data['phone'], '3001234567')
        self.assertTrue(response.data['is_active'])
        code = response.data['access_code']
        self.assertEqual(len(code), 6)
        self.assertTrue(code.isdigit())

    def test_create_app_user_as_non_admin_returns_403(self):
        self._auth_regular()
        data = {'email': 'juan@test.com', 'name': 'Juan Pérez', 'phone': '3001234567'}
        response = self.client.post(self.list_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_app_user_unauthenticated_returns_401(self):
        data = {'email': 'juan@test.com', 'name': 'Juan Pérez', 'phone': '3001234567'}
        response = self.client.post(self.list_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_app_user_missing_fields_returns_400(self):
        self._auth_admin()
        response = self.client.post(self.list_url, {'email': 'solo@mail.com'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ListAppUserTests(AppUserAPITestCase):
    def test_list_app_users_returns_paginated_results(self):
        self._auth_admin()
        for i in range(15):
            user = AppUser.objects.create(
                email=f'user{i}@test.com',
                name=f'User {i}',
                phone='3000000000',
            )
            user.generate_access_code()
            user.save()

        response = self.client.get(self.list_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 10)
        self.assertIsNotNone(response.data['next'])

    def test_search_app_users_by_email(self):
        self._auth_admin()
        user1 = AppUser.objects.create(
            email='maria@test.com', name='María', phone='3001111111',
        )
        user1.generate_access_code()
        user1.save()
        user2 = AppUser.objects.create(
            email='carlos@test.com', name='Carlos', phone='3002222222',
        )
        user2.generate_access_code()
        user2.save()

        response = self.client.get(f'{self.list_url}?search=maria')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['email'], 'maria@test.com')


class DeactivateAppUserTests(AppUserAPITestCase):
    def test_deactivate_app_user_sets_is_active_false(self):
        self._auth_admin()
        user = AppUser.objects.create(
            email='test@test.com', name='Test', phone='3000000000',
        )
        user.generate_access_code()
        user.save()

        url = reverse('app-user-deactivate', kwargs={'pk': user.pk})
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data['is_active'])
        self.assertIsNone(response.data['access_code'])

    def test_deactivate_nonexistent_user_returns_404(self):
        self._auth_admin()
        url = reverse('app-user-deactivate', kwargs={'pk': 9999})
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class RegenerateAppUserTests(AppUserAPITestCase):
    def test_regenerate_code_creates_new_code_and_activates(self):
        self._auth_admin()
        user = AppUser.objects.create(
            email='test@test.com', name='Test', phone='3000000000',
        )
        user.generate_access_code()
        user.save()
        old_code = user.access_code
        user.is_active = False
        user.save()

        url = reverse('app-user-regenerate', kwargs={'pk': user.pk})
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_code = response.data['access_code']
        self.assertEqual(len(new_code), 6)
        self.assertTrue(new_code.isdigit())
        self.assertNotEqual(new_code, old_code)
        self.assertTrue(response.data['is_active'])

    def test_regenerate_code_non_admin_returns_403(self):
        self._auth_regular()
        user = AppUser.objects.create(
            email='test@test.com', name='Test', phone='3000000000',
        )
        user.generate_access_code()
        user.save()

        url = reverse('app-user-regenerate', kwargs={'pk': user.pk})
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
