// // Function to submit quiz answers via API
const SubmitQuiz = async (answers: Record<number, string>) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

  const response = await fetch('/api/submit-quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify({ answers }), // Send the answers as the request body
  })

  if (!response.ok) {
    throw new Error('Failed to submit answers')
  }

  const result = await response.json()
  return result.score
}

export default SubmitQuiz;
