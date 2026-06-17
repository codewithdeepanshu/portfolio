import re

path = r'C:\Users\AC\.gemini\antigravity\brain\f01769eb-27b2-4327-b2e8-79088a06c76f\.system_generated\steps\166\content.md'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

clean_content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
clean_content = re.sub(r'<script.*?>.*?</script>', '', clean_content, flags=re.DOTALL)

text_only = re.sub(r'<[^>]+>', '\n', clean_content)
lines = [line.strip() for line in text_only.split('\n') if line.strip()]

filtered = []
for line in lines:
    # ignore css, comments, copyrights
    if any(x in line for x in ['{', '}', ';', ':', '/*', '*/', '--', 'Adobe', 'Copyright', 'All Rights Reserved', 'property of', 'intellectual', 'written permission', 'forbidden']):
        continue
    filtered.append(line)

print(f"Filtered count: {len(filtered)}")
for i, line in enumerate(filtered[:200]):
    print(f"{i}: {line}")
