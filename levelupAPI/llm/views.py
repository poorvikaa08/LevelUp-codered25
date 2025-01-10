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
    return HttpResponse("hello world")


from django.shortcuts import render
from django.http import HttpResponse

# Define execute_code at the top level
def execute_code(code):
    try:
        # Redirect stdout to capture print statements
        import io
        import contextlib
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            exec(code, {})
        return output.getvalue(), None
    except Exception as e:
        return None, str(e)

# Your view function
def python_playground(request):
    if request.method == 'POST':
        code = request.POST.get('code', '')
        output, error = execute_code(code)
        print("--------")
        print(output)
        return render(request, 'llm/playground.html', {'output': output, 'error': error})
    return render(request, 'llm/playground.html')



class UploadFileAPIView(APIView):
    serializer_class = FileUploadSerializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        request.user = User.objects.first()
        serializer = self.serializer_class(request.user, data=request.data)

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
            return Response(
                {"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST
            )

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
                Do not add any opening or trailing statements such as 'here are __ questions...' or 'let me know if ....', I want the JSON format strictly.
            """

            model = OllamaLLM(model="llama3")  # Assuming Llama model is installed
            prompt = ChatPromptTemplate.from_template(template)
            chain = prompt | model

            # Step 3: Generate questions

            print("----starting----")

            response = chain.invoke(
                {
                    "text": extracted_text,
                    "num_questions": num_questions,
                }
            )

            response = json.loads(response)
            print(json.dumps(response))

            # Step 4: Return the generated questions
            return Response({"questions": response}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


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
            input_data = {"questions": questions, "user_responses": user_responses}
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
            response = chain.invoke({"input_data": input_text})
            print(response)

            # Parse the response if necessary
            feedback = response.strip()

            return Response({"feedback": feedback}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from django.http import FileResponse

import json
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from django.http import FileResponse

class CreateSubjectiveQuestionsAPIView(APIView):

    serializer_class = FileUploadSerializer
    parser_classes = [MultiPartParser, FormParser]

    def extract_text_from_pdf(self, file):
        """Helper method to extract text from a PDF file."""
        pdf_reader = PdfReader(BytesIO(file.read()))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text

    def create_pdf(self, questions):
        """Helper method to create a PDF from the generated questions."""
        buffer = BytesIO()
        c = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter

        # Set up the document
        c.setFont("Helvetica", 12)
        c.drawString(72, height - 72, "Subjective Questions")
        
        y_position = height - 100  # Start position for questions
        for idx, question in enumerate(questions, 1):
            c.drawString(72, y_position, f"Question {idx}: {question['question']}")
            c.drawString(72, y_position - 20, f"Marks: {question['marks']}")
            y_position -= 40  # Move down for the next question

            # Check if we need to create a new page
            if y_position < 72:
                c.showPage()  # Add a new page
                c.setFont("Helvetica", 12)
                y_position = height - 72

        c.showPage()  # Finalize the document
        c.save()
        buffer.seek(0)
        return buffer

    def post(self, request):
        # Get the uploaded file from the request data
        uploaded_file = request.data.get("file")

        if not uploaded_file:
            return Response(
                {"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Step 1: Extract text from the uploaded file (assuming it's a PDF)
            extracted_text = self.extract_text_from_pdf(uploaded_file)

            # Step 2: Set up LangChain model for subjective questions
            template = """
                    You are an assistant tasked with generating subjective questions in a strict and consistent format. 
                    Please ensure that the response strictly follows this format:

                    [
                        {{
                            "id": 1,
                            "question": "Subjective Question 1 text",
                            "marks": 5
                        }},
                        {{
                            "id": 2,
                            "question": "Subjective Question 2 text",
                            "marks": 5
                        }}
                    ]

                    Generate exactly 6 subjective questions based on the following text:
                    {text}

                    Strictly adhere to the format provided above:
                    - Each question should be an object with exactly the following keys: "id", "question", and "marks".
                    - The "id" should be a unique integer starting from 1 and incrementing by 1.
                    - The "question" should be a string containing the full text of the question.
                    - The "marks" should be an integer indicating the number of marks for the question.
                    - Do not include any additional keys or fields in the output.
                    - The output should not contain any extra statements, explanations, or text outside the required JSON structure.

                    Ensure the response strictly follows the JSON format without any deviations or extra content.
                    """

            model = OllamaLLM(model="llama3")  # Assuming Llama model is installed
            prompt = ChatPromptTemplate.from_template(template)
            chain = prompt | model

            # Step 3: Generate subjective questions
            print("----starting----")

            response = chain.invoke(
                {
                    "text": extracted_text,
                }
            )

            # Step 4: Validate the response format
            try:
                response_data = json.loads(response)
                # Ensure it's a list of questions with the required keys
                if not isinstance(response_data, list):
                    raise ValueError("Response is not a list")
                for question in response_data:
                    if not all(key in question for key in ["id", "question", "marks"]):
                        raise ValueError("Missing required keys in question")
            except (json.JSONDecodeError, ValueError) as e:
                return Response(
                    {"error": f"Invalid JSON response: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST
                )

            # Step 5: Create a PDF from the generated questions
            pdf_buffer = self.create_pdf(response_data)

            # Step 6: Return the PDF as a downloadable file
            return FileResponse(pdf_buffer, as_attachment=True, filename=f"subjective_questions.pdf")

        except Exception as e:
            print(e)
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import extract_transcript

class YouTubeSummaryView(APIView):
    def post(self, request):
        youtube_url = request.data.get('youtube_url')
        
        if not youtube_url:
            return Response(
                {"error": "Please provide a YouTube URL"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Extract transcript
            transcript = extract_transcript(youtube_url)
            
            template =  """
                given the following youtube transcript, summarize it within 50 words and format it well {transcript}
                (Do not add any trailing or starting comments such as "here is a response ...." and "hopefully this was helpful...")
            """
            
            # Generate summary
            model = OllamaLLM(model="llama3")
            prompt = ChatPromptTemplate.from_template(template)
            chain = prompt | model
            
            response = chain.invoke({
                "transcript": transcript,
            })
            
            # Return the summary in a JSON object
            return Response({"summary": response})
            
        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
