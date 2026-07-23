import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client lazily or safely with User-Agent header
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'PakHSE Construction Safety AI Engine' });
  });

  // 1. AI HSE Safety Expert Assistant
  app.post('/api/hse-chat', async (req, res) => {
    try {
      const { prompt, language = 'en', history = [] } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      const ai = getAiClient();
      const languageInstruction =
        language === 'ur'
          ? 'Respond predominantly in clear Nastaliq Urdu script, accompanied by key English technical safety terms in brackets.'
          : language === 'roman_ur'
          ? 'Respond in clear Roman Urdu (Urdu written in Latin alphabet) so site supervisors and workers can easily read it on mobile devices.'
          : 'Respond in professional English, and provide brief Urdu translations for critical safety warnings.';

      const systemInstruction = `You are "PakHSE AI Safety Advisor", an expert Health, Safety & Environment (HSE/OSH) Consultant specializing in Pakistani construction projects.
Your authoritative knowledge base includes:
1. Punjab Occupational Safety and Health Act 2019 (POSHA)
2. Sindh Occupational Safety and Health Act 2017
3. PEC Building Code of Pakistan (Safety Provisions 2007/2021)
4. Pakistan Environmental Protection Act (PEPA 1997) & EPAs (NEQS standards for dust, noise, effluent)
5. West Pakistan Factories Rules 1962 / Factories Act 1934
6. Common Pakistani site hazards: Unbraced bamboo/steel scaffolding, monsoon electrical hazards & waterlogging, extreme heat stress (45°C+ in Multan/Jacobabad), deep basement trenching in clay/alluvial soils, silica dust inhalation in Lahore/Karachi.
7. Emergency response: Rescue 1122, Edhi 115, Sindh 1122.

Language Instruction: ${languageInstruction}

Provide practical, actionable, site-ready advice with relevant Pakistani statutory citations where appropriate. Be concise, structured, and easy to read. Use bullet points for steps.`;

      // Format conversation history
      const contents = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: prompt }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      res.json({ text: response.text || 'Unable to generate response.' });
    } catch (error: any) {
      console.error('Error in /api/hse-chat:', error);
      res.status(500).json({
        error: error.message || 'An error occurred while consulting the AI HSE Advisor.',
      });
    }
  });

  // 2. AI Job Safety Analysis (JSA) & Risk Matrix Generator
  app.post('/api/generate-jsa', async (req, res) => {
    try {
      const {
        projectType,
        locationCity,
        specificActivity,
        workingHeightOrDepth,
        weatherCondition,
        crewSize,
        equipmentUsed = [],
      } = req.body;

      if (!specificActivity) {
        return res.status(400).json({ error: 'Specific activity is required.' });
      }

      const ai = getAiClient();

      const userPrompt = `Generate a rigorous Job Safety Analysis (JSA) and Risk Matrix for a construction project in Pakistan with these parameters:
- Project Type: ${projectType || 'High-Rise Commercial Building'}
- Location: ${locationCity || 'Lahore, Pakistan'}
- Specific Activity: ${specificActivity}
- Height/Depth: ${workingHeightOrDepth || 'Above 3 meters'}
- Weather/Season: ${weatherCondition || 'Hot Summer (40°C+)'}
- Crew Size: ${crewSize || '15 workers'}
- Equipment: ${equipmentUsed.join(', ') || 'Scaffolding, Tower Crane, Power Tools'}

Ensure controls reflect Pakistani codes (POSHA 2019, Sindh OSH 2017, PEC Safety Codes, PEPA 1997).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction: 'You are an expert Pakistani HSE Risk Assessment Engineer. Generate a structured Job Safety Analysis (JSA) JSON for construction sites in Pakistan.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              projectType: { type: Type.STRING },
              location: { type: Type.STRING },
              dateGenerated: { type: Type.STRING },
              overallRiskLevel: { type: Type.STRING, description: 'Low, Medium, High, or Critical' },
              summaryEnglish: { type: Type.STRING },
              summaryUrdu: { type: Type.STRING, description: 'Summary translated into Urdu script' },
              hazardSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepDescription: { type: Type.STRING },
                    potentialHazards: { type: Type.ARRAY, items: { type: Type.STRING } },
                    initialRisk: { type: Type.STRING, description: 'Low, Medium, High, Critical' },
                    mitigationControls: { type: Type.ARRAY, items: { type: Type.STRING } },
                    residualRisk: { type: Type.STRING, description: 'Low, Medium' },
                    requiredPpe: { type: Type.ARRAY, items: { type: Type.STRING } },
                    pakistanStandardRef: { type: Type.STRING },
                  },
                  required: ['stepDescription', 'potentialHazards', 'initialRisk', 'mitigationControls', 'residualRisk', 'requiredPpe', 'pakistanStandardRef'],
                },
              },
              emergencyProtocol: { type: Type.STRING },
              siteSupervisorChecklist: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['title', 'projectType', 'location', 'dateGenerated', 'overallRiskLevel', 'summaryEnglish', 'summaryUrdu', 'hazardSteps', 'emergencyProtocol', 'siteSupervisorChecklist'],
          },
        },
      });

      const resultText = response.text || '{}';
      const parsed = JSON.parse(resultText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Error in /api/generate-jsa:', error);
      res.status(500).json({ error: error.message || 'Failed to generate Job Safety Analysis.' });
    }
  });

  // 3. AI Incident & Near-Miss Hazard Scanner
  app.post('/api/analyze-incident', async (req, res) => {
    try {
      const { description, imageBase64, mimeType = 'image/jpeg' } = req.body;
      if (!description && !imageBase64) {
        return res.status(400).json({ error: 'Please provide a description or image of the site hazard.' });
      }

      const ai = getAiClient();

      const parts: any[] = [];
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType,
            data: imageBase64,
          },
        });
      }

      const promptText = `Analyze this construction hazard/near-miss report from a Pakistani site:
${description ? `Reported Description: ${description}` : 'Analyze the attached site image for safety violations.'}

Identify hazards, assess severity, determine if immediate stop-work is required, state root causes, and list corrective actions in both English and Urdu script, citing relevant Pakistani laws (POSHA, Sindh OSH, PEC, PEPA).`;

      parts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: { parts },
        config: {
          systemInstruction: 'You are a Senior HSE Incident Investigator in Pakistan. Evaluate reported site hazards and generate a structured corrective action card.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              incidentType: { type: Type.STRING },
              severity: { type: Type.STRING, description: 'Near Miss, Minor Injury, Major Hazard, Critical Emergency' },
              detectedHazards: { type: Type.ARRAY, items: { type: Type.STRING } },
              immediateStopWorkRequired: { type: Type.BOOLEAN },
              rootCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctiveActionsEnglish: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctiveActionsUrdu: { type: Type.ARRAY, items: { type: Type.STRING } },
              relevantPakLaw: { type: Type.STRING },
              preventativeSop: { type: Type.STRING },
            },
            required: ['incidentType', 'severity', 'detectedHazards', 'immediateStopWorkRequired', 'rootCauses', 'correctiveActionsEnglish', 'correctiveActionsUrdu', 'relevantPakLaw', 'preventativeSop'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (error: any) {
      console.error('Error in /api/analyze-incident:', error);
      res.status(500).json({ error: error.message || 'Failed to analyze incident report.' });
    }
  });

  // 4. AI Custom Toolbox Talk Generator
  app.post('/api/generate-toolbox-talk', async (req, res) => {
    try {
      const { topic, siteActivity, targetAudience = 'Construction workers and tradesmen' } = req.body;
      if (!topic && !siteActivity) {
        return res.status(400).json({ error: 'Topic or site activity is required.' });
      }

      const ai = getAiClient();
      const prompt = `Create a 5-minute pre-shift Toolbox Talk (TBT) for Pakistani construction workers on the topic: "${topic || siteActivity}". Target Audience: ${targetAudience}. Include 4 high-impact talking points in English, 4 in Urdu script (Nastaliq), and 2 quick check questions for workers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a Pakistani Construction Safety Training Instructor. Create concise, clear, bilingual 5-minute pre-shift safety briefing cards.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              topic: { type: Type.STRING },
              topicUrdu: { type: Type.STRING },
              category: { type: Type.STRING },
              estimatedMinutes: { type: Type.NUMBER },
              keyTalkingPointsEnglish: { type: Type.ARRAY, items: { type: Type.STRING } },
              keyTalkingPointsUrdu: { type: Type.ARRAY, items: { type: Type.STRING } },
              interactiveQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              supervisorNote: { type: Type.STRING },
            },
            required: ['id', 'topic', 'topicUrdu', 'category', 'estimatedMinutes', 'keyTalkingPointsEnglish', 'keyTalkingPointsUrdu', 'interactiveQuestions', 'supervisorNote'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (error: any) {
      console.error('Error in /api/generate-toolbox-talk:', error);
      res.status(500).json({ error: error.message || 'Failed to generate Toolbox Talk.' });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PakHSE AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
