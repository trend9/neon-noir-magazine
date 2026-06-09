import os
import json
import re
import sys
import time
import base64
from datetime import datetime
import urllib.request
import urllib.error

# Hugging Face serverless inference API config
HF_API_TOKEN = os.environ.get("HF_API_TOKEN")
COLAB_API_URL = os.environ.get("COLAB_API_URL")

# We use Llama 3 8B Instruct as it is fast, free to use under Hugging Face Serverless, and highly creative.
LLM_MODEL = "meta-llama/Meta-Llama-3-8B-Instruct"
IMAGE_MODEL = "black-forest-labs/FLUX.1-schnell"

def get_headers():
    if not HF_API_TOKEN:
        print("Error: HF_API_TOKEN is not configured in environment variables.")
        print("Please add HF_API_TOKEN to your GitHub secrets or local .env file.")
        sys.exit(1)
    return {
        "Authorization": f"Bearer {HF_API_TOKEN}",
        "Content-Type": "application/json"
    }

def call_hf_api(url, payload, retries=5, delay=15):
    """
    Sends request to Hugging Face Inference API with aggressive retry mechanism logic.
    Handles 503 Service Unavailable (Model loading) gracefully.
    """
    headers = get_headers()
    data = json.dumps(payload).encode("utf-8")
    
    for attempt in range(1, retries + 1):
        try:
            req = urllib.request.Request(url, data=data, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=120) as response:
                return response.read()
        except urllib.error.HTTPError as e:
            error_msg = e.read().decode("utf-8")
            print(f"[Attempt {attempt}/{retries}] HTTP Error {e.code}: {e.reason}")
            print(f"Details: {error_msg}")
            
            # Gratefully handle Model Loading / Cold Start
            if e.code in [503, 429, 500]:
                if attempt == retries:
                    print("Max retries reached. Hugging Face endpoint is unavailable right now.")
                    raise e
                print(f"Model might be loading or rate-limited. Retrying in {delay} seconds...")
                time.sleep(delay)
                delay += 10 # exponential increase backoff
            else:
                raise e
        except Exception as e:
            print(f"[Attempt {attempt}/{retries}] Unexpected Connection Error: {e}")
            if attempt == retries:
                raise e
            time.sleep(delay)
            delay += 10

def generate_story_text():
    print(f"Generating story text via LLM: {LLM_MODEL}...")
    
    # Elegant selection of dynamic Japanese locations to keep stories incredibly diverse
    locations = [
        "Mossy Zen garden of Kyoto in a thick autumn mist",
        "Rain-slicked neon alleys of Shinjuku Golden Gai in Tokyo at 3 AM",
        "Deep mountain hot-spring Onsen Ryokan in Hakone surrounded by howling wind",
        "Snow-buried traditional gassho-zukuri farmhouse in Shirakawa-go",
        "Ancient deer-filled pine forests of Nara underneath a blood-red moon",
        "A quiet traditional tea house in historic Kanazawa during an offseason blizzard",
        "An eerie isolated rocky shrine on the shores of Miyajima during high tide"
    ]
    # Pick a random location based on today's day of the year
    day_of_year = datetime.now().timetuple().tm_yday
    selected_locale = locations[day_of_year % len(locations)]
    print(f"Theme location selected: {selected_locale}")

    system_instruction = (
        "You are a world-acclaimed AI mystery novelist who writes exclusively in stunning, dark, satirical English. "
        "Your task is to generate a short, clever mystery story that is highly engaging. "
        "The story must capture the tranquil aesthetic, delicate textures, and fragile transience of traditional Japanese 'wabi-sabi' (the beautiful sadness of decay and simplicity). "
        "Simultaneously, weave in dry, razor-sharp 'American dark humor'—satirizing greed, technology, luxury entitlement, and naive corporate characters.\n\n"
        "Your output MUST be a single, strictly valid JSON object. Do NOT wrap the JSON inside markdown tags like ```json ... ```. "
        "Do NOT write any introduction or greetings before or after the JSON. "
        "Use exactly the following JSON keys:\n"
        "{\n"
        '  "title": "A witty, ironic, or elegant title.",\n'
        '  "location": "A brief beautiful name of the location.",\n'
        '  "excerpt": "A short, seductive 1-sentence hook of the mystery.",\n'
        '  "content": "The main mystery story. Must be 3 robust paragraphs. Set a vivid, tranquil Japanese scene, introduce a cynical protagonist, show their hubris, and lead to an intense cliffhanger right before the twist.",\n'
        '  "twist": "The shocking twisted ending. Must be 1 to 2 paragraphs revealing a dark, ironic, mind-bending resolution.",\n'
        '  "image_prompt": "A detailed 16:9 photo prompt for generating the illustration. Focus on rich traditional elements, eerie shadows, dramatic lighting, premium quality, no human text, suitable for FLUX.1 (e.g. \'A moody dark cinematic photograph of a snowy Kyoto temple gate at dusk and neon yellow lights, high contract, hyperrealistic 16:9\')"\n'
        "}"
    )

    user_prompt = f"Write an extraordinary mystery story set in: {selected_locale}. Follow all guidelines and output ONLY raw JSON."

    # Llama 3 Chat Prompt engineering template
    prompt_chat = (
        f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n"
        f"{system_instruction}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n"
        f"{user_prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"
    )

    payload = {
        "inputs": prompt_chat,
        "parameters": {
            "max_new_tokens": 1400,
            "temperature": 0.85,
            "top_p": 0.95,
            "return_full_text": False
        }
    }

    if COLAB_API_URL:
        colab_url = COLAB_API_URL.rstrip('/')
        url = f"{colab_url}/generate/text"
        payload = {
            "system_prompt": system_instruction,
            "user_prompt": user_prompt
        }
        print(f"Calling local API server for text generation: {url}...")
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=180) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                generated_text = res_data.get("result", "")
        except Exception as e:
            print(f"Error calling local API server for text: {e}")
            generated_text = ""
    else:
        url = f"https://api-inference.huggingface.co/models/{LLM_MODEL}"
        raw_response = call_hf_api(url, payload)
        
        # Hugging Face typically returns a list with a single dict
        response_json = json.loads(raw_response.decode("utf-8"))
        
        if isinstance(response_json, list) and len(response_json) > 0:
            generated_text = response_json[0].get("generated_text", "")
        elif isinstance(response_json, dict):
            generated_text = response_json.get("generated_text", "")
        else:
            generated_text = str(response_json)
        
    print("Raw LLM text response received. Parsing JSON...")

    # Robust regex/text parsing to find a nested JSON structure even if the LLM output was messy
    cleaned_text = generated_text.strip()
    
    # Try finding the outer-most curly braces to extract pure JSON
    match = re.search(r"({.*})", cleaned_text, re.DOTALL)
    if match:
        cleaned_text = match.group(1)
    
    # Replace common formatting errors / unescaped characters
    try:
        story_data = json.loads(cleaned_text)
        return story_data
    except Exception as e:
        print(f"Standard JSON parser failed on text: {cleaned_text[:300]}...")
        print("Attempting automatic string repair...")
        # Emergency recovery: Fallback to manual regex parsing in case Llama 3 wrote an invalid JSON format
        try:
            repaired_text = cleaned_text.replace('\n', ' ').replace('\r', '')
            # Try parsing with strict fixes, or construct a graceful fallback story
            story_data = json.loads(repaired_text)
            return story_data
        except Exception as repair_err:
            print("Failed to repair JSON automatically. Using high-quality pre-designed emergency mystery novel fallback.")
            return {
                "title": f"The Hollow Soughing of the Wind",
                "location": selected_locale,
                "excerpt": "A wealthy appraiser tries to purchase a legendary mountain ryokan's hot-spring, only to find the steam is alive.",
                "content": "William had survived Wall Street, but his throat was feeling the dry ash of age. He bought a flight to the legendary hot-springs of Hakone to clear his thoughts and buy out the old family ryokan that sat directly atop the sulfur vents. He offered the owner, an elder with hands like gnarled cedar root, an offensive amount of money. 'You get to retire, and I turn this foggy thermal paradise into a members-only digital nomad health fortress,' William sneered. The old man accepted the gold coins, packed a small satchel, and bowed. 'The water has been peaceful because we pay our respects. Now, the debt is yours, bold traveler.'\n\nWilliam laughed and stripped down, sinking into the scalding, pure-mineral outdoor bath as mountain fog flooded the pine forest. He breathed in the tranquility, enjoying the fact that he was now the sole owner of 400 years of quiet luxury. He closed his eyes under the warm drizzle.",
                "twist": "When he opened his eyes, the mountain mist was a wall of absolute crimson. The hot-spring water began to boil violently, yet he could not lift his limbs—they were entirely calcified into dense mountain stone, just like the ancient lanterns lining the rim. As he solidified into a silent lawn sculpture, the steam rose to whisper, 'The price has been settled.'",
                "image_prompt": "A modern highly-cinematic dark noir close-up photo of a boiling stone hot-spring bath in Hakone. Thick Japanese crimson mountain fog rising from the heated mineral water, traditional stone lanterns illuminated with a warm yellow light, dark moody pine silhouettes, photorealistic, 16:9 aspect ratio."
            }

def generate_story_image(image_prompt, filename):
    if COLAB_API_URL:
        colab_url = COLAB_API_URL.rstrip('/')
        url = f"{colab_url}/generate/image"
        payload = {
            "prompt": f"{image_prompt}, cinematic atmosphere, gorgeous hyperdetailed 16:9 photograph, 8k, moody high contrast depth of field, traditional Japanese architecture motif, dark tones",
            "width": 1024,
            "height": 576
        }
        print(f"Calling local API server for image generation: {url}...")
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=180) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                image_base64 = res_data.get("image_base64")
                if image_base64:
                    img_data = base64.b64decode(image_base64)
                    os.makedirs("public/stories", exist_ok=True)
                    filepath = os.path.join("public/stories", filename)
                    with open(filepath, "wb") as f:
                        f.write(img_data)
                    print(f"Success! Image saved safely at: {filepath}")
                    return True
                else:
                    print("Error: No image_base64 returned from local API server.")
                    return False
        except Exception as e:
            print(f"Error calling local API server for image: {e}")
            return False
    else:
        print(f"Generating 16:9 illustration via Black Forest Labs: {IMAGE_MODEL}...")
        url = f"https://api-inference.huggingface.co/models/{IMAGE_MODEL}"
        
        # FLUX-schnell model expectations
        payload = {
            "inputs": f"{image_prompt}, cinematic atmosphere, gorgeous hyperdetailed 16:9 photograph, 8k, moody high contrast depth of field, traditional Japanese architecture motif, dark tones",
            "parameters": {
                "width": 1024,
                "height": 576
            }
        }
        
        try:
            img_data = call_hf_api(url, payload, retries=6, delay=20)
            # Verify that we actually got an image back (not a JSON error)
            if img_data.startswith(b"{"):
                res_json = json.loads(img_data.decode("utf-8"))
                if "error" in res_json:
                    print(f"HF Image API returned JSON error: {res_json['error']}")
                    return False
            
            # Save image physically
            os.makedirs("public/stories", exist_ok=True)
            filepath = os.path.join("public/stories", filename)
            with open(filepath, "wb") as f:
                f.write(img_data)
            print(f"Success! Image saved safely at: {filepath}")
            return True
        except Exception as e:
            print(f"Error generating visual illustration: {e}")
            print("Using standard fallback image for today's story.")
            return False

def main():
    current_date = datetime.now().strftime("%Y-%m-%d")
    print(f"====== STARTING DUAL-AI PIPELINE [DATE: {current_date}] ======")
    
    # 1. Run Text Generator LLM
    story_json = generate_story_text()
    
    # 2. Extract image prompt and trigger FLUX.1
    image_filename = f"{current_date}.png"
    prompt = story_json.get("image_prompt", "Moody dark atmospheric ancient Japan, misty night")
    
    image_success = generate_story_image(prompt, image_filename)
    
    # Setup image URL
    if image_success:
        # Relative URL for client-side loading
        story_json["image_url"] = f"stories/{image_filename}"
    else:
        # High quality royalty-free fallback images to make sure the app never looks broken
        fallbacks = [
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1024&h=576&q=80",
            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1024&h=576&q=80",
            "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1024&h=576&q=80"
        ]
        day_index = datetime.now().timetuple().tm_yday
        story_json["image_url"] = fallbacks[day_index % len(fallbacks)]
        print(f"Assigned high quality fallback image URL: {story_json['image_url']}")

    # 3. Read other stories and update stories.json database
    stories_filepath = "data/stories.json"
    stories_list = []
    
    if os.path.exists(stories_filepath):
        try:
            with open(stories_filepath, "r", encoding="utf-8") as f:
                stories_list = json.load(f)
        except Exception as e:
            print(f"Could not load existing stories database. Initializing empty. Error: {e}")
            stories_list = []
            
    # Remove older record with the same ID/Date to prevent duplicates on manual workflow re-runs
    story_id = f"story_{current_date.replace('-', '')}"
    stories_list = [s for s in stories_list if s.get("id") != story_id and s.get("date") != current_date]
    
    # Insert new story block at index 0 (pushing older tales down)
    new_story_record = {
        "id": story_id,
        "title": story_json.get("title", "Untitled Tale"),
        "date": current_date,
        "location": story_json.get("location", "Unknown Location"),
        "excerpt": story_json.get("excerpt", "An unspoken Japanese shroud closes in..."),
        "content": story_json.get("content", ""),
        "twist": story_json.get("twist", ""),
        "image_prompt": prompt,
        "image_url": story_json["image_url"]
    }
    
    stories_list.insert(0, new_story_record)
    
    # Write back beautifully
    os.makedirs(os.path.dirname(stories_filepath), exist_ok=True)
    with open(stories_filepath, "w", encoding="utf-8") as f:
        json.dump(stories_list, f, indent=2, ensure_ascii=False)
        
    print(f"====== PIPELINE COMPLETED SUCCESSFULLY [STORIES TOTAL: {len(stories_list)}] ======")

if __name__ == "__main__":
    main()
