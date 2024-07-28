document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const emailContent = document.getElementById('emailContent').value;
    const summaryElement = document.getElementById('summary');
  
    if (emailContent.trim() === '') {
      summaryElement.textContent = 'Please enter some email content to summarize.';
      return;
    }
  
    summaryElement.textContent = 'Summarizing...';
  
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: `Summarize the following email:\n\n${emailContent}`,
          max_tokens: 150,
          temperature: 0.7
        })
      });
  
      const data = await response.json();
      const summary = data.choices[0].text.trim();
  
      summaryElement.textContent = summary || 'No summary was generated. Please try again.';
    } catch (error) {
      console.error('Error summarizing the email:', error);
      summaryElement.textContent = 'An error occurred while summarizing the email. Please try again.';
    }
  });
  