#!/usr/bin/env python3
import re

# Read mockData.ts
with open(r"c:\Users\gkrav\OneDrive\Desktop\DSA Easy\frontend\src\data\mockData.ts", "r", encoding="utf-8") as f:
    mock_data = f.read()

# Read the three additional files
with open(r"c:\Users\gkrav\OneDrive\Desktop\DSA Easy\frontend\src\data\additionalProblems.ts", "r", encoding="utf-8") as f:
    ap1 = f.read()
with open(r"c:\Users\gkrav\OneDrive\Desktop\DSA Easy\frontend\src\data\additionalProblems2.ts", "r", encoding="utf-8") as f:
    ap2 = f.read()
with open(r"c:\Users\gkrav\OneDrive\Desktop\DSA Easy\frontend\src\data\additionalProblems3.ts", "r", encoding="utf-8") as f:
    ap3 = f.read()

# Extract array contents: find content between [ and ]
def extract_array_content(text):
    start = text.find('[')
    end = text.rfind(']')
    if start >= 0 and end > start:
        return text[start+1:end]
    return ""

# Extract problems
probs1 = extract_array_content(ap1).strip()
probs2 = extract_array_content(ap2).strip()
probs3 = extract_array_content(ap3).strip()

# Remove excessive blank lines (keep max 1 blank line)
def clean_whitespace(text):
    # Replace multiple newlines with double newline
    text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
    return text.strip()

probs1 = clean_whitespace(probs1)
probs2 = clean_whitespace(probs2)
probs3 = clean_whitespace(probs3)

# Combine with proper formatting
new_problems = "  " + probs1 + ",\n  " + probs2 + ",\n  " + probs3

# Find and replace the closing ];  of mockProblems
# Match the pattern:   }, followed by ]; on the next non-empty line
pattern = r'(\n  },\n\];)'
replacement = f',\n  {new_problems}\n];'

new_mock_data = re.sub(pattern, replacement, mock_data)

# Write back
with open(r"c:\Users\gkrav\OneDrive\Desktop\DSA Easy\frontend\src\data\mockData.ts", "w", encoding="utf-8") as f:
    f.write(new_mock_data)

print("✓ Merge complete!")

# Verify by counting problems
import subprocess
result = subprocess.run(["powershell", "-Command", "(Get-Content 'c:\\Users\\gkrav\\OneDrive\\Desktop\\DSA Easy\\frontend\\src\\data\\mockData.ts' | Select-String 'id:' | Measure-Object).Count"], capture_output=True, text=True)
total = result.stdout.strip()
print(f"✓ Total problems: {total}")
