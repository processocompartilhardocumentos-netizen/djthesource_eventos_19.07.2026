import os
import shutil
import traceback

path = "C:/Users/andre/Documents/B - BACKUP - ENSINO/PROJETO PESSOAL - DjTheSource Eventos/Versões Oficiais/Versão GITPAGES/Versão 19.07.26/dj-the-source/server"
print("PATH:", path)
print("EXISTS:", os.path.exists(path), "ISDIR:", os.path.isdir(path))
try:
    shutil.rmtree(path)
    print("REMOVED")
except Exception as e:
    print("ERROR", type(e).__name__, e)
    traceback.print_exc()
