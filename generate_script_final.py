
import subprocess
import os
import sys

# Force UTF-8 encoding for standard I/O (even on Windows)
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

# PROMPT IN ENGLISH (Clear Instructions) but requesting VIETNAMESE OUTPUT
prompt = """
Act as an elite Video Content Strategist specialized in Affiliate Marketing (Julian Goldie style: High Energy, Results-Oriented, "No BS").

Based on the 100+ sources in this notebook (covering Seedance 2.0, DeepSeek R1 SEO, OpenClaw, F.Y.W.H.E.E.L strategy), create a detailed **10-MINUTE YOUTUBE VIDEO SCRIPT**.

*** CRITICAL REQUIREMENT ***
The entire script must be written in **VIETNAMESE** (Native Tone).
Use the natural, street-smart language of Vietnamese MMO/Affiliate marketers (e.g., "vít ads", "bơm traffic", "kèo ngon", "lụm lúa", "tự động hóa cơm gạo").

*** SCRIPT STRUCTURE (F.Y.W.H.E.E.L FRAMEWORK) ***

**0:00 - 1:30: THE BRUTAL HOOK**
*   Start with a shock: "Why 99% of you are failing at SEO in 2026."
*   Introduce the "Killer Stack": Seedance 2.0 + DeepSeek + OpenClaw.
*   Unique Selling Point: "How I rank #1 on Video Search in 24 hours with $0 ad spend."

**1:30 - 3:00: F (FIND) - DEEPSEEK R1 STRATEGY**
*   Why ChatGPT is outdated for keyword research.
*   How to use DeepSeek R1 to find "Blue Ocean" keywords (high ticket, low competition).
*   Actionable prompt example (in Vietnamese).

**3:00 - 5:00: Y (YIELD) - SEEDANCE 2.0 PRODUCTION**
*   Why Seedance 2.0 beats Sora/Kling for affiliate volume.
*   Director Mode tutorial: Controlling camera angles and lighting via prompts.
*   Multimodal Magic: Cloning top-performing content styles without copying.

**5:00 - 6:30: W (WIRE) - TRAFFIC AUTOMATION WITH OPENCLAW**
*   Don't just post links. Build a "Bridge Page" or funnel to Skool/Zalo.
*   Automate comment seeding and distribution using OpenClaw agent.
*   "Set it and forget it" mentality.

**6:30 - 8:00: H.E.E.L (HARVEST, EXPAND, ENGAGE, LEVEL UP)**
*   Reinvest profits into premium tools (VPS, proxies).
*   Expand to new niches (Crypto, Real Estate).
*   Build a community (Skool) as a long-term asset.

**8:00 - 9:00: RISK MANAGEMENT**
*   Avoid cheap tools and bad proxies.
*   Copyright/Strike warnings and how to bypass them legally.

**9:00 - 10:00: ULTIMATE CALL TO ACTION**
*   Urgency: "This window of opportunity closes in 6 months."
*   CTA: "Join the Skool community below to get the full Prompt Set & OpenClaw Config for free."
*   High-energy sign-off.

*** OUTPUT FORMAT ***
Provide the script in a clear markdown table or sections:
[TIME] | [VISUAL DESCRIPTION] | [VOICEOVER SCRIPT (VIETNAMESE)]

**WRITE THE FULL SCRIPT IN VIETNAMESE NOW.**
"""

print(f"Generating Vietnamese Script (via English Prompt) from Notebook {notebook_id}...")

# Set environment for Encoding
env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

try:
    # UPDATED Correct Syntax: nlm query notebook <NOTEBOOK_ID> "<PROMPT>"
    cmd = [nlm_path, "query", "notebook", notebook_id, prompt]
    
    # Run command
    # Redirect stderr to stdout to capture everything
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', env=env)
    
    if res.returncode == 0:
        print("\n--- SCRIPT GENERATED SUCCESSFULLY ---\n")
        # Save to file
        filename = "kich_ban_julian_vn_final.md"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(res.stdout)
        print(f"\n(Script saved to {filename})")
        
        # PREVIEW SNIPPET (First 600 chars)
        print("\n--- PREVIEW ---\n")
        print(res.stdout[:600] + "...")
            
    else:
        print(f"Error generating script: {res.stderr}")

except Exception as e:
    print(f"Execution Error: {e}")
