export async function translatePage(targetLang = "az") {
  const API_KEY = "YOUR_OPENAI_API_KEY"; 
  const elements = document.querySelectorAll("body *:not(script):not(style)");

  for (let el of elements) {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
      const text = el.innerText.trim();
      if (text.length > 0) {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: `You are a translator. Translate the following text into ${targetLang}.`,
              },
              { role: "user", content: text },
            ],
          }),
        });

        const data = await response.json();
        el.innerText = data.choices[0].message.content;
      }
    }
  }
}
