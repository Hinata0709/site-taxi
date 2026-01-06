import os
import sys

try:
    import google.generativeai as genai
except ImportError:
    print("Error: 'google-generativeai' library not found.")
    print("Please run: pip install google-generativeai")
    sys.exit(1)

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("\033[91mError: GEMINI_API_KEY environment variable not set.\033[0m")
        print("Please set it by running:")
        print("  export GEMINI_API_KEY='your_api_key_here'")
        print("You can add this line to your ~/.zshrc file to make it permanent.")
        sys.exit(1)

    genai.configure(api_key=api_key)
    
    # Using the faster Gemini 1.5 Flash model, but 'gemini-pro' is also an option
    model = genai.GenerativeModel('gemini-1.5-flash')
    chat = model.start_chat(history=[])

    print("\033[94mWelcome to Gemini Terminal Chat!\033[0m")
    print("Type 'exit' or 'quit' to end the session.")
    print("-" * 40)

    while True:
        try:
            user_input = input("\033[92mYou:\033[0m ")
            if user_input.lower() in ['exit', 'quit']:
                print("Goodbye!")
                break
            
            if not user_input.strip():
                continue

            response = chat.send_message(user_input, stream=True)
            print("\033[96mGemini:\033[0m ", end="", flush=True)
            for chunk in response:
                print(chunk.text, end="", flush=True)
            print("\n")

        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"\n\033[91mAn error occurred: {e}\033[0m")

if __name__ == "__main__":
    main()
