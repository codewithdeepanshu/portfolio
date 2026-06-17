from django.urls import path
from .views import ContactCreateView, ChatAgentView

urlpatterns = [
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
    path('chat/', ChatAgentView.as_view(), name='chat-agent'),
]

