from transformers import pipeline
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, VideoUnavailable

# Function to extract transcript from YouTube video
def extract_transcript(video_url):
    """
    Extracts the transcript from a YouTube video.

    Args:
    - video_url (str): The URL of the YouTube video.

    Returns:
    - str: The transcript text or an error message if not available.
    """
    try:
        video_id = video_url.split("v=")[-1].split("&")[0]
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = " ".join([entry['text'] for entry in transcript])
        return transcript_text
    except TranscriptsDisabled:
        return "Error: Transcripts are disabled for this video."
    except VideoUnavailable:
        return "Error: Video is unavailable."
    except Exception as e:
        return f"Error: {str(e)}"

# Main execution
if __name__ == "__main__":
    video_url = input("Enter YouTube video URL: ")

    print("Extracting transcript...")
    transcript_text = extract_transcript(video_url)

    if "Error" not in transcript_text:
        print("Transcript extracted successfully.")
        print("Generating summary...")
        #summary = summarize_text(transcript_text)
        print("\nSummary (50-100 words):")
        print(summary)
    else:
        print(transcript_text)
