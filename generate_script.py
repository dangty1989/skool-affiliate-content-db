
import subprocess
import os

nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

# The Mega-Prompt
prompt = """
Act as an expert Video Script Writer specialized in High-Retention YouTube Content and AI Affiliate Marketing strategies (inspired by Julian Goldie's style).

Based on the 100+ sources provided in this notebook (covering Seedance 2.0, DeepSeek R1 SEO, OpenClaw, and Julian Goldie's 2026 Strategy), create a detailed 10-minute Video Overview Script.

The video must be structured for maximum engagement, targeting an audience of SEOs and AI enthusiasts.

*** FORMAT REQUIREMENTS ***
1. **Dual Language Output**: For every section, provide the script in ENGLISH first, followed immediately by a VIETNAMESE translation/adaptation that captures the same high energy (natural marketing tone, not robotic translation).
2. **Total Duration**: Aim for ~1500-1800 words total (approx. 10 minutes speaking time).
3. **Visual Cues**: Include [VISUAL: ...] notes describing what should be on screen.

*** SCRIPT STRUCTURE ***

**0:00 - 1:00: THE HOOK**
*   Start with a "Pattern Interrupt": Why traditional SEO is dead in 2026 and "AI Video SEO" takes over.
*   Mention the "Killer Tech Stack": Seedance 2.0 + DeepSeek R1 + OpenClaw.
*   Promise specific results (e.g., "How to rank #1 on Google Video Search").

**1:00 - 3:00: THE GAME CHANGER - SEEDANCE 2.0**
*   Deep dive into Seedance 2.0 features (Director Mode, Multimodal Inputs).
*   Compare it vs. Sora and Kling (Why Julian prefers Seedance/Kling for volume).
*   Showcase "Tips & Tricks" (e.g., controlling camera movement).

**3:00 - 5:00: THE BRAIN - DEEPSEEK R1 & OPENCLAW**
*   Explain how DeepSeek R1 is the "Brain" for SEO keyword research (finding untapped keywords).
*   Explain how OpenClaw is the "Hands" (automating the posting/commenting).
*   How to combine them for an "Autopilot SEO Machine."

**5:00 - 7:00: JULIAN GOLDIE'S 2026 STRATEGY**
*   Summarize Julian's latest strategy for 2026.
*   Focus on "Video First" indexing and Generative Engine Optimization (GEO).
*   The concept of "Parasite SEO" using high-authority video platforms.

**7:00 - 9:00: STEP-BY-STEP TUTORIAL (Quick Walkthrough)**
*   Step 1: Find topic with DeepSeek.
*   Step 2: Generate script with NotebookLM (recursion!).
*   Step 3: Create video with Seedance 2.0.
*   Step 4: Automate distribution with OpenClaw.

**9:00 - 10:00: CONCLUSION & CTA**
*   Recap the "Machine."
*   Call to Action: Join the Skool community to get the prompts.
*   Final "Punchy" closing statement.

*** TONE OF VOICE (ENGLISH) ***
*   High Energy, Authoritative, "No BS."
*   Phrases: "This is insane," "Stop doing this," "Here's the secret," "Money printer."

*** TONE OF VOICE (VIETNAMESE) ***
*   Gần gũi, dân dã nhưng chuyên nghiệp ("Anh em," "Kèo này ngon," "Bí mật động trời," "Tự động hóa hoàn toàn").

Generate the full script now.
"""

print(f"Generating Video Script from Notebook {notebook_id}...")

# Set environment for Encoding
env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

try:
    # Command: nlm query <NOTEBOOK_ID> "<PROMPT>"
    cmd = [nlm_path, "query", notebook_id, prompt]
    
    # Run command - Note: query might take Time.
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', env=env)
    
    if res.returncode == 0:
        print("\n--- SCRIPT GENERATED SUCCESSFULLY ---\n")
        print(res.stdout)
        
        # Save to file as well
        with open("video_script_overview.md", "w", encoding="utf-8") as f:
            f.write(res.stdout)
        print("\n(Script saved to video_script_overview.md)")
            
    else:
        print(f"Error generating script: {res.stderr}")

except Exception as e:
    print(f"Execution Error: {e}")
