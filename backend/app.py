from flask import Flask, request, jsonify
from flask_cors import CORS
import deepseek
import json
import graphviz
from io import BytesIO
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
deepseek.api_key = DEEPSEEK_API_KEY

def generate_er_structure(prompt):
    """Generate ER diagram structure using DeepSeek"""
    try:
        response = deepseek.ChatCompletion.create(
            model="deepseek-coder",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert in database design and ER diagrams. Generate a structured JSON for an ER diagram based on the user's description. Include entities, attributes, and relationships."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
        )

        # Ensure response contains expected structure
        response_text = response.get("choices", [{}])[0].get("message", {}).get("content", "{}")
        structure = json.loads(response_text)

        if "entities" not in structure or "relationships" not in structure:
            raise ValueError("Invalid structure format returned by DeepSeek.")

        return structure

    except Exception as e:
        print(f"Error generating structure: {e}")
        return None

def create_graphviz_diagram(structure):
    """Convert the ER structure into a Graphviz diagram"""
    dot = graphviz.Digraph(format="svg")
    dot.attr(rankdir='LR')

    # Add entities
    for entity_data in structure.get('entities', []):
        entity_name = entity_data.get("name", "Unknown")
        attributes = entity_data.get("attributes", [])

        label = f"<<TABLE BORDER='1' CELLBORDER='1' CELLSPACING='0'><TR><TD><B>{entity_name}</B></TD></TR>"
        for attr in attributes:
            label += f"<TR><TD>{attr}</TD></TR>"
        label += "</TABLE>>"

        dot.node(entity_name, label=label, shape="plaintext")

    # Add relationships
    for rel in structure.get('relationships', []):
        entity1 = rel.get("from")
        entity2 = rel.get("to")
        relation_name = rel.get("type", "Relationship")

        if entity1 and entity2:
            rel_node = f"{entity1}_{entity2}_{relation_name}"
            dot.node(rel_node, relation_name, shape="diamond")
            dot.edge(entity1, rel_node)
            dot.edge(rel_node, entity2)

    return dot

def parse_uploaded_file(file):
    """Parse uploaded .txt file into JSON format"""
    try:
        content = file.read().decode("utf-8")
        structure = json.loads(content)
        return structure
    except Exception as e:
        print(f"Error parsing file: {e}")
        return None

@app.route('/generate', methods=['POST'])
def generate_diagram():
    try:
        if 'file' in request.files:
            file = request.files['file']
            structure = parse_uploaded_file(file)
        else:
            data = request.json
            prompt = data.get('prompt', '')
            structure = generate_er_structure(prompt)

        if not structure:
            return jsonify({'error': 'Failed to generate diagram structure'}), 500

        # Create Graphviz diagram
        dot = create_graphviz_diagram(structure)
        
        # Convert to SVG
        svg_output = dot.pipe(format='svg').decode('utf-8')

        return jsonify({
            'success': True,
            'diagram': svg_output,
            'structure': structure
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
