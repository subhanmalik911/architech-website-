import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", studio: "AURA Architecture & Design" });
});

// Gemini AI Spatial Consultation Endpoint
app.post("/api/ai-consultation", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { userPrompt, propertyType, sqft, style, materials, location } = req.body;

    if (!apiKey) {
      // Fallback response if GEMINI_API_KEY is not set yet
      return res.json({
        aiDesignAdvice: `For your ${sqft || 5000} sq.ft. ${propertyType || 'Villa'} in ${location || 'Coastal Location'}, an architectural scheme grounded in ${style || 'Organic Warm Modernism'} would optimize both spatial grandeur and natural illumination. We recommend featuring ${materials?.join(', ') || 'Travertine, Smoked Oak, and Brushed Brass'}.`,
        recommendedMaterials: materials || ['Roman Travertine', 'Smoked European Oak', 'Champagne Bronze', 'Low-E Thermal Glass'],
        lightingStrategy: 'Circadian recessed cove illumination with CRI 98 accent spotlights focused on stone textures.',
        keyArchitecturalFocus: 'Cantilevered shadow overhangs paired with double-height glass pavilions for seamless indoor-outdoor transition.',
        estimatedBudgetRange: `$${Math.round((sqft || 5000) * 1100 / 1000000)}M - $${Math.round((sqft || 5000) * 1600 / 1000000)}M USD (Turnkey Architectural & Interior Execution)`
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are a world-renowned principal architect at AURA Studio (a luxury architectural & interior design firm).
The client is asking for a custom architectural and spatial consultation for a luxury property.

Client Details:
- Property Type: ${propertyType || 'Custom Residence'}
- Square Footage: ${sqft || 6000} sq.ft.
- Preferred Style: ${style || 'Organic Warm Modernism'}
- Desired Materials: ${materials?.join(', ') || 'Travertine, Marble, Oak'}
- Location / Site Context: ${location || 'High-End Location'}
- Specific Notes / Client Wishlist: ${userPrompt || 'None specified'}

Provide a high-end, inspiring, professional architectural brief and response in valid JSON format with keys:
1. "aiDesignAdvice": A 2-3 paragraph sophisticated architectural concept breakdown detailing spatial flow, volumetric proportion, natural light orientation, and luxury indoor-outdoor synergy.
2. "recommendedMaterials": Array of 4-5 luxury material recommendations (e.g. "Roman Travertine", "Charred Yakisugi Cedar", "Brushed Champagne Bronze").
3. "lightingStrategy": A concise sentence describing the architectural lighting scheme.
4. "keyArchitecturalFocus": A concise sentence on the primary structural highlight.
5. "estimatedBudgetRange": An estimated budget string (e.g., "$8.5M - $12.0M USD").

Respond ONLY with valid raw JSON without markdown backticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    // Clean JSON string if enclosed in markdown blocks
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch {
      parsedData = {
        aiDesignAdvice: text,
        recommendedMaterials: materials || ['Roman Travertine', 'Brushed Bronze', 'Smoked Oak'],
        lightingStrategy: 'Architectural concealed linear cove lighting with dynamic color temperature control.',
        keyArchitecturalFocus: 'Volumetric double-height hall framed by floor-to-ceiling glass.',
        estimatedBudgetRange: '$10M - $15M USD'
      };
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error in AI Consultation:", error);
    return res.status(500).json({ 
      error: "Failed to generate AI consultation.",
      details: error.message 
    });
  }
});

// Start Express server with Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
