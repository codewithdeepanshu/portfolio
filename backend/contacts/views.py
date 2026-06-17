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


import os
try:
    import google.generativeai as genai
except ImportError:
    genai = None

# System prompt outlining Deepanshu's profile for the AI Agent
SYSTEM_PROMPT = """You are the AI Assistant for Deepanshu Gautam, a certified AI Agent Architect and Python/Django Developer.
Your goal is to answer queries from potential clients, recruiters, and website visitors.
Keep your responses professional, friendly, and concise (under 3-4 sentences if possible).

Deepanshu's Profile:
- Role: AI Agent Engineer, Python Developer, Certified AI Agent Architect.
- Location: Ghaziabad, Delhi NCR, India.
- Contact: Email: Deepanshugautam9899@gmail.com, Phone/WhatsApp: +91 8882440354.
- Education:
  - MCA (Master of Computer Applications) at Institute of Engineering and Technology, Lucknow (2024-2026), CGPA 8.43.
  - BCA at IME Ghaziabad (2020-2023), 69.56%.
- Key Projects:
  1. AI Twitter/X Sentiment Analyzer (Final Year Project): Fullstack web app using Flask and PyTorch (RoBERTa transformer) to classify live sentiment. Live demo on Hugging Face.
  2. Social Media Content Analyzer: Streamlit dashboard using Pandas/NumPy to analyze content performance.
  3. Portfolio Website: Premium glassmorphism React site with a Django REST CRM backend (this website!).
  4. Autonomous AI Agent Workflow Engine: Orchestrates LLM function calling, database schema generation, and tool usage (LangChain, Flask).
- Teammate Collaboration:
  - Zenos Bisht (Graphic & UI/UX Designer): They work together as a duo agency to deliver end-to-end design & code.
- Core Skills: Python, Java, C++, SQL, Django, Flask, Streamlit, React.js, NumPy, Pandas, Matplotlib, PyTorch, Hugging Face, Git, VS Code.
- Availability: Available for freelance contracts, junior/graduate developer positions, and AI integration projects.

Reply to the user's message appropriately. If asked questions unrelated to Deepanshu or software/tech, politely guide them back to his portfolio services."""

class ChatAgentView(APIView):
    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message', '').strip()
        if not user_message:
            return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        api_key = os.environ.get('GEMINI_API_KEY')
        if not api_key or genai is None:
            # Fallback response in case API key is not configured in the host environment yet
            return Response({
                'reply': "Hi! I am Deepanshu's AI Assistant. We haven't configured a live Gemini API key in the environment yet, but I can tell you that Deepanshu is an AI Agent Engineer & Python Developer specializing in Django, React, and Streamlit. You can reach out to him at Deepanshugautam9899@gmail.com!",
                'fallback': True
            }, status=status.HTTP_200_OK)

        try:
            genai.configure(api_key=api_key)
            # Use gemini-1.5-flash
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=SYSTEM_PROMPT
            )
            response = model.generate_content(user_message)
            return Response({'reply': response.text, 'fallback': False}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return Response({
                'reply': "Sorry, I encountered an issue connecting to my live LLM engine. You can reach Deepanshu directly at Deepanshugautam9899@gmail.com or via WhatsApp at +91 8882440354!",
                'fallback': True
            }, status=status.HTTP_200_OK)

