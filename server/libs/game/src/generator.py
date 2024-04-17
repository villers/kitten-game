import os
import glob

# Spécifiez le répertoire de base de votre projet
base_dir = "."

# Spécifiez le chemin et le nom du fichier de sortie
output_file = "concatenated.ts"

with open(output_file, "w", encoding="utf-8") as outfile:
  for filepath in glob.glob(os.path.join(base_dir, "**/*.ts"), recursive=True):
    with open(filepath, "r", encoding="utf-8") as infile:
      contents = infile.read()
      outfile.write(f"// {filepath}\n")
      outfile.write(contents)
      outfile.write("\n")

print(f"Tous les fichiers .ts ont été concaténés dans {output_file}")
