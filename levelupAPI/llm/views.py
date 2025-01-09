from django.shortcuts import HttpResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from io import BytesIO
import json
from PyPDF2 import PdfReader  
from .serializers import FileUploadSerializer
from .models import User

# Create your views here.
def home(request):
    return HttpResponse('hello world')


class UploadFileAPIView(APIView):
    serializer_class = FileUploadSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        request.user = User.objects.first()
        serializer = self.serializer_class(request.user, data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CreateQuestionsAPIView(APIView):

    serializer_class = FileUploadSerializer
    parser_classes = [MultiPartParser, FormParser]

    def extract_text_from_pdf(self, file):
        """Helper method to extract text from a PDF file."""
        pdf_reader = PdfReader(BytesIO(file.read()))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text

    def post(self, request):
        # Get the uploaded file from the request data
        uploaded_file = request.data.get("file")
        num_questions = request.data.get("num_questions") or 3
        
        if not uploaded_file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Step 1: Extract text from the uploaded file (assuming it's a PDF)
            extracted_text = self.extract_text_from_pdf(uploaded_file)

            # Step 2: Set up LangChain model
            template = """
                You are an assistant tasked with generating questions in a consistent format.
                The format should always be as follows:
                [
                    {{
                        "id": 1,
                        "question": "Question 1 text",
                        "options": [
                            {{ "id": "A", "text": "Option 1" }},
                            {{ "id": "B", "text": "Option 2" }},
                            {{ "id": "C", "text": "Option 3" }},
                            {{ "id": "D", "text": "Option 4" }}
                        ],
                        "difficulty": "easy",
                        "answer": "A",
                        "marks": 1
                    }},
                    {{
                        "id": 2,
                        "question": "Question 2 text",
                        "options": [
                            {{ "id": "A", "text": "Option 1" }},
                            {{ "id": "B", "text": "Option 2" }},
                            {{ "id": "C", "text": "Option 3" }},
                            {{ "id": "D", "text": "Option 4" }}
                        ],
                        "difficulty": "medium",
                        "answer": "B",
                        "marks": 1
                    }}
                ]
                Generate {num_questions} questions based on the following text:
                {text}
                Ensure the response strictly adheres to the format provided above, including the JSON structure and keys.
                Do not add any opening or trailing statements such as 'here are {num_questions} questions...' or 'let me know if ....', I want the JSON format strictly.
            """

            model = OllamaLLM(model="llama3")  # Assuming Llama model is installed
            prompt = ChatPromptTemplate.from_template(template)
            chain = prompt | model

            # Step 3: Generate questions
            question_type = "multiple choice"
            
            print("----starting----")
            
            response = chain.invoke({
                "num_questions": num_questions,
                "text": extracted_text,
                "question_type": question_type,
            })
            
            response = json.loads(response)
            print(json.dumps(response)) 
        
            # Step 4: Return the generated questions
            return Response({"questions": response}, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

class GenerateFeedbackAPIView(APIView):
    def post(self, request):
        # Extract data from the request
        questions = request.data.get("questions")
        user_responses = request.data.get("user_responses")

        if not questions or not user_responses:
            return Response(
                {"error": "Both 'questions' and 'user_responses' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Prepare input for the LLM
            # questions = [{"id": 1, "question": "What is the primary assumption in ray optics?", "options": [{"id": "A", "text": "Light travels in circular lines"}, {"id": "B", "text": "Light travels in straight lines and interacts with surfaces according to laws of reflection and refraction"}, {"id": "C", "text": "Light only bends when it enters a denser medium"}, {"id": "D", "text": "Ray optics is only applicable for very short distances"}], "difficulty": "easy", "answer": "B", "marks": 1}]
            # user_responses = [{"id": 1, "answer": "B"}]
            input_data = {
                "questions": questions,
                "user_responses": user_responses
            }
            input_text = json.dumps(input_data)

            # Define the prompt for the LLM
            template = """
            the questions and the answers of a user are given as {input_data}, please give the user feedback based on their performance and also recommend youtube videos in topics they are weak at.
            
            """
            prompt = ChatPromptTemplate.from_template(template)

            # Initialize the LLM model
            model = OllamaLLM(model="llama3")  # Ensure the model is properly configured
            
            chain = prompt | model

            # Generate feedback using the LLM
            print("---starting---")
            response = chain.invoke({
                "input_data": input_text 
            })
            print(response)

            # Parse the response if necessary
            feedback = response.strip()

            return Response({"feedback": feedback}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
