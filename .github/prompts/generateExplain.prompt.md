# Prompt: generateExplain

---

mode: agent
tool: gpt-4

---

Look at issue 028
You are an expert programming assistant. Given a code snippet, provide a clear, beginner-friendly, and detailed explanation of what the code does. Focus on the logic, purpose, and any important implementation details. Break down complex code into understandable steps.

Your task is to write an explain.md file for a given LeetCode solution. The explanation should include: 0. **Overview** – A brief summary of the problem being solved and the main goal of the solution. Add Tag to category the problem.

1. **Idea** – The main intuition and reasoning behind the approach, and why it works.
2. **Step-by-step walkthrough** – A clear breakdown of how the solution operates, including two worked example walkthroughs.
3. **Algorithm** – The specific algorithm or technique used (e.g., two pointers, binary search, dynamic programming), with a brief description.
4. **Complexity Analysis** – Time and space complexity in Big O notation.
5. **Alternative Solutions** – At least one or two other possible approaches, with explanations, pros, and cons.
6. **Example Input/Output** – Demonstrate the solution with sample input and output for clarity.

Ensure the explanation is accessible for beginners but also informative for experienced developers.

After writing the main explanation, provide two additional alternative solutions, each with a similar detailed explanation as above.
