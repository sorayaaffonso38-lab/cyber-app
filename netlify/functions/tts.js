exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { text } = JSON.parse(event.body);

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'nova',
        input: text,
        speed: 0.95,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: err?.error?.message ?? response.status }),
      };
    }

    const buffer = await response.arrayBuffer();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'audio/mpeg' },
      body: Buffer.from(buffer).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
