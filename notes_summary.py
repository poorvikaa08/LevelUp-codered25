import PyPDF2
from transformers import TFAutoModelForSeq2SeqLM, AutoTokenizer


def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file.

    Args:
    - pdf_path (str): Path to the PDF file.

    Returns:
    - str: Extracted text from the PDF.
    """
    extracted_text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            extracted_text += page.extract_text() + "\n"
    return extracted_text


def summarize_notes_tf(notes, max_length=50, min_length=20):
    """
    Summarizes the input notes into concise points using TensorFlow.

    Args:
    - notes (str): Detailed notes to summarize.
    - max_length (int): Maximum length of the summary.
    - min_length (int): Minimum length of the summary.

    Returns:
    - str: Summarized text.
    """
    # Load the pre-trained T5 model and tokenizer
    model_name = "t5-small"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = TFAutoModelForSeq2SeqLM.from_pretrained(model_name)

    # Tokenize the input
    inputs = tokenizer("summarize: " + notes, return_tensors="tf", max_length=512, truncation=True)

    # Generate summary using the model
    outputs = model.generate(
        inputs["input_ids"],
        max_length=max_length,
        min_length=min_length,
        length_penalty=2.0,
        num_beams=4,
        early_stopping=True,
    )

    # Decode the generated tokens into text
    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return summary


# Example usage
if __name__ == "__main__":
    # Path to the PDF file
    pdf_path = "sample.pdf"  # Replace with the actual path to your PDF

    # Extract text from the PDF
    extracted_text = extract_text_from_pdf(pdf_path)

    # Summarize the extracted text
    summary = summarize_notes_tf(extracted_text, max_length=100, min_length=50)

    # Print the summary
    print("Summary:")
    print(summary)
