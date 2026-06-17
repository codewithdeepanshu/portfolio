from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactMessageSerializer

class ContactCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            # Save message to database
            message_obj = serializer.save()
            
            # Formulate email subject and message
            email_subject = f"Portfolio Contact: {message_obj.subject or 'No Subject'} - From {message_obj.name}"
            email_body = (
                f"You have received a new message from your portfolio website.\n\n"
                f"Name: {message_obj.name}\n"
                f"Email: {message_obj.email}\n"
                f"Subject: {message_obj.subject}\n\n"
                f"Message:\n{message_obj.message}\n"
            )
            
            # Send email (by default it will log to console in settings.py configuration)
            try:
                send_mail(
                    subject=email_subject,
                    message=email_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.ADMIN_EMAIL],
                    fail_silently=False,
                )
            except Exception as e:
                # Log email failure but don't fail the request since database save succeeded
                print(f"Error sending email: {e}")
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
